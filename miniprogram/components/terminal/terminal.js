const computedBehavior = require('miniprogram-computed')
const Terminal = require('../../class/terminal')
const cmds = require('./cmd')
const { formateDate } = require('../../utils/index')
const app = getApp()

Component({
  behaviors: [computedBehavior],
  data: {
    show: false,
    extand: false
  },

  lifetimes: {
    created: function() {
      app.event.on('showTerminal', (show) => {
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
          this.data.terminalObj.inputCmd('npm run dev').then(rst => {
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
    }
  },

  methods: {
    extandTerminal() {
      this.data.terminalObj.toggleHide((isExtand) => {
        this.setData({
          extand: isExtand
        })
      })
    },

    hideTerminal() {
      this.data.terminalObj.toggleExtand((isShow) => {
        this.setData({
          show: !isShow
        })
      })
    },

    // 渐进式输出 step 类型的结果
    async stepOutputRst(steps) {
      let finalRst = []
      const exeStep = (step) => {
        const duration = Math.random()*50+250
        return new Promise(res => {
          setTimeout(() => {
            finalRst.push({
              time: formateDate(+new Date(), 'hh:mm:ss'),
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

      app.event.emit('openInvitation')
    }
  }
})
