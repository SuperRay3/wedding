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
          color: '#fff',
          content: this.data.wishContent,
          image: {
            head: { src: `${this.data.userInfo.avatarUrl}`},
            gap: 2
          }
        }
      })
        .then(res => {
          wx.showToast({
            icon: 'success',
            title: '发送成功！',
            duration: 1500
          })

          this.setData({
            isInit: false,
            isOpen: false,
            isSend: true
          })

          this.resetBarrageBind()

          setTimeout(() => {
            this.setData({
              showOneMore: 'show'
            })
          }, 4200)
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
    },

    /**
     * 重置弹幕容器数据
     */

    resetBarrageBind() {
      this.setData({
        wishContent: ''
      })
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
