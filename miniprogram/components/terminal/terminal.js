const computedBehavior = require("miniprogram-computed");
const Terminal = require("../../class/terminal");
const { StayBttomP, StayBttomO } = require("../../class/stayBottom");
const cmds = require("./cmd");
const { formateDate, debounce } = require("../../utils/index");
const app = getApp()

let stayBtP = null
let stayBtO = null

Component({
  behaviors: [computedBehavior],
  data: {
    // 输入的指令
    cmdIpt: "",
    show: false,
    extand: false,
    // 指令容器需要滚动的高，用于实现一直滚动到底部
    codeContentScrollTop: 0
  },

  lifetimes: {
    created: function() {
      // 监听打开终端
      app.event.on("showTerminal", show => {
        this.setData({
          show
        })

        setTimeout(() => {
          this.setData({
            terminalObj: new Terminal()
          })
        }, 1200)

        setTimeout(() => {
          this.data.terminalObj.genNewCmd().then(rst => {
            this.setData({
              terminalObj: rst
            })
          })
        }, 1600)

        setTimeout(() => {
          // 初始化自动输入代码启动
          this.data.terminalObj.inputCmd("npm run start").then(rst => {
            this.setData({
              terminalObj: rst
            })

            // 运行指令
            this.data.terminalObj.exeLastCmd(cmds).then(rst => {
              this.setData({
                terminalObj: rst
              })
              const steps = rst.history.slice(-1)[0].rst.steps
              this.stepOutputRst(steps)
            })
          })
        }, 1900)
      })

      // 监听关闭信封
      app.event.on("closeInvitaion", () => {
        this.data.terminalObj.genNewCmd().then(res => {
          this.setData({
            "terminalObj.history": res.history
          })
        })
      })

      // 监听指令内容区满了自动滚动
      stayBtP = new StayBttomP(this, 0, "#terminal-content-p")
      stayBtO = new StayBttomO(this, "codeContentScrollTop")
      stayBtP.add(stayBtO)
    },
    ready: function() {
      this.createSelectorQuery()
        .select("#scroll-view")
        .boundingClientRect(function(rect) {
          stayBtP.scrollViewH = rect.height
        })
        .exec()
    }
  },

  methods: {
    /**
     * 输入指令
     */

    cmdInput: debounce(function(e) {
      // 保持视图更新
      this.setData({
        cmdIpt: e.detail.value
      })
      // 保持类实例同步
      this.data.terminalObj.inputCmd(e.detail.value)
    }, 500),

    /**
     * 点击发送键
     */

    sendCmd() {
      if (!this.data.cmdIpt) return

      this.data.terminalObj.exeLastCmd(cmds).then(rst => {
        this.setData({
          terminalObj: rst
        })

        // 重新生成一条
        const length = this.data.terminalObj.history.length
        if (
          length &&
          this.data.terminalObj.history[length - 1].rst.type !== "stepDebugging"
        ) {
          this.data.terminalObj.genNewCmd().then(res => {
            this.setData({
              "terminalObj.history": res.history,
              cmdIpt: ""
            })

            // 保持滚动在底部
            stayBtP.checkScroll()
          })
        }
      })
    },

    /**
     * 打开控制台
     */

    extandTerminal() {
      this.data.terminalObj.toggleHide(isExtand => {
        // 防止滚动距离不变导致的 scroll-view 不触发自动滚动
        const tmpScrollH = stayBtP.codeContentH + (isExtand ? 1 : -1)
        
        this.setData({
          extand: isExtand
        })

        setTimeout(() => {
          this.setData({
            codeContentScrollTop: tmpScrollH
          })
        }, 450)
      })
    },

    /**
     * 清空控制台
     */

    clearTerminal() {
      this.data.terminalObj.clear().then(rst => {
        this.setData({
          terminalObj: rst,
          codeContentScrollTop: 0
        })

        // 重置保持滚动底部功能的数据
        stayBtP.resetScroll()
      })
    },

    /**
     * 隐藏控制台
     */

    hideTerminal() {
      this.data.terminalObj.toggleExtand(isShow => {
        this.setData({
          show: !isShow
        })
      })
    },

    /**
     * 渐进式输出 step 类型的结果
     */

    async stepOutputRst(steps) {
      let finalRst = []
      const exeStep = step => {
        const duration = Math.random() * 50 + 250
        return new Promise(res => {
          setTimeout(() => {
            finalRst.push({
              time: formateDate(+new Date(), "hh:mm:ss"),
              duration: duration.toFixed(2),
              label: step.label
            })
            this.setData({
              stepCmd: finalRst
            })
            res()
          }, duration)
        })
      }

      for (const step of steps) {
        await exeStep(step)
      }

      app.event.emit("openInvitation")
    }
  }
})
