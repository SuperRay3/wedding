import { randomHexColor } from '../../utils/index'

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
      // 新发送的弹幕
      const newBarrage = {
        timestamp: +new Date(),
        color: randomHexColor(),
        content: this.data.wishContent,
        userInfo: this.data.userInfo
      }

      this.setData({
        sendBtnLoading: true
      })

      // 存入数据库
      db.collection('barrage').add({
        data: newBarrage
      })
        .then(res => {
          wx.showToast({
            icon: 'success',
            title: '发送成功！',
            duration: 1500
          })

          // 打包祝福
          this.setData({
            isInit: false,
            isOpen: false,
            isSend: true
          })

          // 将新增的弹幕通过事件传递给父组件
          this.triggerEvent('sendBarrage', newBarrage)
          
          // 重置弹幕数据存储对象
          this.resetBarrageBind()

          // 展示再写一封的按钮
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
