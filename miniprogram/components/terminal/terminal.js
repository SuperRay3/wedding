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
    showTerminalSwitch: false,
    extand: false,
    // 指令容器需要滚动的高，用于实现一直滚动到底部
    codeContentScrollTop: 0,
    // 指令区域是否平滑滚动
    terminalScrollSmooth: true,
    // 命令输入框的 placeholder
    placeholder: '输入 help 解锁更多玩法'
  },

  lifetimes: {
    created: function() {
      // 监听打开终端
      app.event.on("showTerminal", show => {
        this.setData({
          show,
          showTerminalSwitch: !show
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
          this.data.terminalObj.inputCmd("start").then(rst => {
            this.setData({
              terminalObj: rst
            })

            // 运行指令
            this.data.terminalObj.exeLastCmd(cmds).then(async rst => {
              this.setData({
                terminalObj: rst
              })

              this.matchExeRst(rst.history.slice(-1)[0].rst)
            })
          })
        }, 1900)
      })

      // 监听关闭信封
      app.event.on("closeInvitaion", async () => {
        await this.generBlankCommand()

        // 保持滚动在底部
        stayBtP.checkScroll()
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
    }, 200),

    /**
     * 点击发送键
     */

    async sendCmd() {
      if (!this.data.cmdIpt) return

      const rst = await this.data.terminalObj.exeLastCmd(cmds)
      
      this.setData({
        terminalObj: rst,
        cmdIpt: ""
      })

      await this.matchExeRst(rst.history.slice(-1)[0].rst)

      // 保持滚动在底部
      stayBtP.checkScroll()
    },

    /**
     * 匹配运行结果
     */

    async matchExeRst(rst) {
      const actMap = {
        start: async () => {
          await this.stepOutputRst(rst.steps)
          app.event.emit("openInvitation")
        },
        bless: async () => {
          await this.stepOutputRst(rst.steps)
          await this.generBlankCommand()
          wx.navigateTo({ url: '../../pages/barrage/barrage' })
        },
        reopen: async () => {
          await this.stepOutputRst(rst.steps)
          app.event.emit("openInvitation")
        },
        clear: async () => {
          this.clearTerminal()
        },
        help: async () => {
          await this.generBlankCommand()
        },
        default: async () => {
          await this.generBlankCommand()
        }
      }

      // 执行
      actMap[rst.detail] ? actMap[rst.detail]() : actMap['default']()
    },

    /**
     * 渐进式输出 step 类型的结果
     */

    async stepOutputRst(steps) {
      const exeStep = step => {
        const duration = Math.random() * 50 + 250
        return new Promise(res => {
          setTimeout(() => {
            step['time'] = formateDate(+new Date(), 'hh:mm:ss'),
            step['isExed'] = true
            step['stepStamp'] = +new Date()
            step['duration'] = duration.toFixed(2)

            this.setData({
              'terminalObj.history': this.data.terminalObj.history
            })
            res()
          }, duration)
        })
      }

      this.setData({
        terminalScrollSmooth: false
      })

      for (const step of steps) {
        await exeStep(step)
        // 保持滚动在底部
        wx.nextTick(() => {
          stayBtP.checkScroll()
        })
      }

      this.setData({
        terminalScrollSmooth: true
      })

    },

    /**
     * textListShow 类型的控制台内输出直接点击运行
     */

    directRunCmd(event) {
      this.setData({
        cmdIpt: event.currentTarget.dataset.cmd
      })
      // 保持类实例同步
      this.data.terminalObj.inputCmd(event.currentTarget.dataset.cmd)
      // 执行命令
      this.sendCmd()
    },
    
    /**
     * 生成一条空命令
     */

    async generBlankCommand() {
      const terminalObj = this.data.terminalObj
      const hisLen = terminalObj.history.length
      if (!hisLen || (hisLen && terminalObj.history[hisLen - 1].cmd)) {
        const res = await this.data.terminalObj.genNewCmd()
          this.setData({
          "terminalObj.history": res.history
        })
      }
    },

    /**
     * 拓展控制台
     */

    extandTerminal() {
      this.data.terminalObj.toggleExtand(isExtand => {
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
      this.data.terminalObj.clear().then(async rst => {
        this.setData({
          terminalObj: rst,
          codeContentScrollTop: 0
        })

        await this.generBlankCommand()

        // 重置保持滚动底部功能的数据
        stayBtP.resetScroll()
      })
    },

    /**
     * 隐藏控制台
     */

    hideTerminal() {
      this.data.terminalObj.toggleHide(isShow => {
        this.setData({
          show: !isShow,
          showTerminalSwitch: isShow
        })
      })
    }
  }
})
