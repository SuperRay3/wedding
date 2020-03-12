const computedBehavior = require('miniprogram-computed')
const Prism = require('prismjs')
const mockcode = require('../../mock/code')
const { StayBttomP, StayBttomO } = require('../../utils/stayBottom')

let stayBtP = null
let stayBtO = null

Component({
  behaviors: [computedBehavior],

  data: {
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
      const codeWithCursor = `<pre><code>${code}<span style="opacity:${data.isCursorVisible}"> ▍</span></code></pre>`
      return codeWithCursor
    }
  },

  lifetimes: {
    created: function() {
      stayBtP = new StayBttomP(this, 0, '#code-content')
      stayBtO = new StayBttomO(this, 'codeContentScrollTop')
      stayBtP.add(stayBtO)
      this.progressivelyTyping()
    },
    ready: function() {
      stayBtP.s.select('#scroll-view').boundingClientRect(function(rect){
        stayBtP.scrollViewH = rect.height
      }).exec()
    }
  },

  methods: {
    // 代码输入
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

            stayBtP.checkScroll()
          }

          // 大约每 24 帧光标闪动一次
          if(count % 24 === 0){
            this.data.isCursorVisible = this.data.isCursorVisible === 0 ? 1 : 0
          }
          count++

          if (typingCount <= this.data.code.length) typing = setTimeout(() => { step() }, 16)
          else {
            resolve()
            // 隐藏光标
            this.setData({ isCursorVisible: 0 })
            clearTimeout(typing)
          }
        }

        typing = setTimeout(() => { step() }, 16)
      })
    }
  }
})
