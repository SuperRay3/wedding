const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],

  data: {
    isInit: true,
    isOpen: false,
    isSend: false,
    showOneMore: '',
    userInfo: {nickName: '', avatarUrl: ''},
    wishContent: ''
  },
  
  computed: {

  },

  lifetimes: {
    ready: function () {
      wx.getStorage({
        key: 'userInfo',
        success: (data) => {
          this.setData({
            userInfo: JSON.parse(data.data)
          })
        },
        fail: () => {
          wx.navigateBack()
        }
      })
    }
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
     * 填写祝福
     */

    typeWish(e) {
      this.setData({
        wishContent: e.detail.value
      })
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
