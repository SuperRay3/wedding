const computedBehavior = require('miniprogram-computed')
const Terminal = require('../../class/terminal')
const app = getApp()

Component({
  behaviors: [computedBehavior],
  data: {
    show: false,
    extand: false
  },

  computed: {

  },

  lifetimes: {
    created: function() {
      app.event.on('showTerminal', (show) => {
        this.setData({
          show,
          terminalObj: new Terminal()
        })
      }, 400)
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
    }
  }
})
