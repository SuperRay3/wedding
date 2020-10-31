const loadingTxt = require('./loadingTxt')
const Loading = require('../../class/loading')
const computedBehavior = require('miniprogram-computed')
const app = getApp()

Component({
  behaviors: [computedBehavior],
  data: {
    loaded: false,
    showBtn: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingTxt: loadingTxt,
    currTimeInd: 0 // 当前时间走到的位置
  },

  computed: {
    currLoadingTxt(data) {
      return data.loadingTxt[data.currTimeInd]
    }
  },

  lifetimes: {
    ready: function() {
      const loading = new Loading({
        time: 6000,
        tickCB: (data) => {
          this.setData(data)
          this.getLoadingTxt(data.currTime)
        },
        finished: () => {
          this.setData({
            loaded: true
          })

          wx.getStorage({
            key: 'userInfo',
            success: (data) =>{
              if (data.data) app.event.emit('showIndex')
              else {
                this.setData({
                  showBtn: true
                })
              }
            },
            fail: () => {
              this.setData({
                showBtn: true
              })
            }
          })

          
        }
      })
      loading.start()
    }
  },

  methods: {
    getLoadingTxt(currTime) {
      const loadingTxt = this.data.loadingTxt
      let currTimeInd = this.data.currTimeInd

      if (currTimeInd < (loadingTxt.length - 1) && currTime > loadingTxt[currTimeInd].time) {
        this.setData({
          currTimeInd: ++currTimeInd
        })
      }
    },

    // 获取用户信息
    bindGetUserInfo (e) {
      // 缓存用户信息
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(e.detail.userInfo),
        success: () =>{
          if (e.detail.userInfo) {
            app.event.emit('showIndex')
          }
        }
      })
    }
  }
})
