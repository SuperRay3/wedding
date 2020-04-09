const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],

  data: {
    isInit: true,
    isOpen: false,
    isSend: false
  },

  watch: {
  },

  lifetimes: {
    ready: function () {
    },
  },

  methods: {

    /**
     * 打开信封
     */
    openEnvelope() {
      if (!this.data.isOpen) {
        this.setData({
          isInit: false,
          isOpen: true
        })
      }
    },

    /**
     * 发送弹幕
     */
    send() {
      this.setData({
        isInit: false,
        isOpen: false,
        isSend: true
      })
    },

    oncMore() {
      this.setData({
        isInit: true,
        isOpen: false,
        isSend: false
      })
    }
  }
})
