const computedBehavior = require('miniprogram-computed')
const Prism = require('prismjs')
const mockcode = require('../../mock/code')

let scrollViewH = 0  // 滚动容器的高
let lastcodeContentH = 0 // 代码区域上一次的高
let codeContentH = 0 // 代码区域最新的高
let s = null         // 元素选择器

Component({
  behaviors: [computedBehavior],

  data: {
    startDate: (new Date()).toDateString(),
    code: mockcode.code,
    currentCode: '',
    isCursorVisible: 1,
    // 代码容器需要滚动的高，用于实现一直滚动到底部
    codeContentScrollTop: 0
  },

  computed: {
    highlightedCode (data) {
      const code = Prism.highlight(
        data.currentCode,
        Prism.languages.javascript
      )
      const codeWithCursor = `<pre></code>${code}<span style="opacity:${data.isCursorVisible}"> ▍</span></code></pre>`
      return codeWithCursor
    }
  },

  lifetimes: {
    created: function() {
      s = this.createSelectorQuery()
      this.progressivelyTyping()
    },
    ready: function() {
      s.select('#scroll-view').boundingClientRect(function(rect){
        scrollViewH = rect.height
      }).exec()
    }
  },

  methods: {
    // 代码输入
    // TODO:自动滚动到底部
    progressivelyTyping() {
      return new Promise((resolve) => {
        let count = 0, typingCount = 0, typing
        // 写代码每一帧的函数
        let step = () => {
          let randomNumber = Math.round(Math.random() * 6)
          // 模拟打字的随机速度
          if(count % 2 === 0 && randomNumber % 4 === 0){
            this.setData({ currentCode: this.data.code.substring(0, typingCount) })
            typingCount++

            s.select('#code-content').boundingClientRect(function(rect){
              codeContentH = rect.height
            }).exec()
            
            if (codeContentH > scrollViewH) {
              if (codeContentH > lastcodeContentH) {
                setTimeout(() => {
                  this.setData({
                    codeContentScrollTop: codeContentH - scrollViewH
                  })
                }, 0)
                lastcodeContentH = codeContentH
              }
              
            }
          }

          // 大约每 24 帧光标闪动一次
          if(count % 24 === 0){
            this.data.isCursorVisible = this.data.isCursorVisible === 0 ? 1 : 0
          }
          count++

          if (typingCount <= this.data.code.length) typing = setTimeout(() => { step() }, 0)
          else {
            resolve()
            // 隐藏光标
            this.setData({ isCursorVisible: 0 })
            clearTimeout(typing)
          }
        }

        typing = setTimeout(() => { step() }, 0)
      })
    }
  }
})
