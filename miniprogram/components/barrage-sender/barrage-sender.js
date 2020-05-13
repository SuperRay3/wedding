const computedBehavior = require('miniprogram-computed')
// 初始化数据库连接
const db = wx.cloud.database()


Component({
  behaviors: [computedBehavior],

  data: {
    isInit: true,
    isOpen: false,
    isSend: false,
    showOneMore: '',
    userInfo: {nickName: '', avatarUrl: ''},
    wishContent: '',
    sendBtnLoading: false,
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
        sendBtnLoading: true
      })
      db.collection('barrage').add({
        data: {
          timestamp: +new Date(),
          wishContent: this.data.wishContent,
          userInfo: this.data.userInfo
        }
      })
        .then(res => {
          wx.showToast({
            icon: 'success',
            title: '发送成功！',
            duration: 1500
          })
        }, rej => {
          wx.showToast({
            title: '发送失败！',
            duration: 1500
          })
        })
        .finally(() => {
          this.setData({
            sendBtnLoading: false
          })
        })

      // this.setData({
      //   isInit: false,
      //   isOpen: false,
      //   isSend: true
      // })

      // setTimeout(() => {
      //   this.setData({
      //     showOneMore: 'show'
      //   })
      // }, 4200)
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
