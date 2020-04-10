const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],

  data: {
    isInit: true,
    isOpen: false,
    isSend: false,
    showOneMore: ''
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

      setTimeout(() => {
        this.setData({
          showOneMore: 'show'
        })
      }, 4200)
    },

    oneMore() {
      this.setData({
        isInit: true,
        isOpen: false,
        isSend: false,
        showOneMore: 'hide'
      })
    }
  }
})
