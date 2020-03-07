const computedBehavior = require('miniprogram-computed')
const Prism = require('prismjs')
const raf = require('../../utils/raf')
const mockcode = require('../../mock/code')

Component({
  behaviors: [computedBehavior],

  data: {
    startDate: (new Date()).toDateString(),
    code: mockcode.code,
    currentCode: '',
    isCursorVisible: 1,
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
    ready: function() {
      this.progressivelyTyping()
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
            this.setData({
              currentCode: this.data.code.substring(0, typingCount)
            })
            typingCount++
          }
          // 大约每 24 帧光标闪动一次
          if(count % 24 === 0){
            this.data.isCursorVisible = this.data.isCursorVisible === 0 ? 1 : 0
          }
          count++
          if (typingCount <= this.data.code.length) {
            typing = raf.requestAnimationFrame(step)
          } else {
            resolve()
            this.data.canExecute = true
            raf.cancelAnimationFrame(typing)
          }
        }
        typing = raf.requestAnimationFrame(step)
      })
    }
  }
})
