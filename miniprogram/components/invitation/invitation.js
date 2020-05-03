const getstureBehavior = require('../../behaviors/gesture.js')
const computedBehavior = require('miniprogram-computed')
const { formateDate } = require("../../utils/index");

const app = getApp()

Component({
  behaviors: [getstureBehavior, computedBehavior],
  data: {
    canOpen: false,
    isOpening: false,
    date: formateDate(new Date(2020, 11, 5), 'yyyy 年 MM 月 dd 日'),
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  watch: {
    'touchData.direction': function(newVal) {
      if (newVal) {
        if (['left', 'right'].includes(newVal.direct)) {
          this.closeInvitation()
          app.event.emit('closeInvitaion')
        }
      }
    }
  },

  lifetimes: {
    created: function() {
      app.event.on('openInvitation', () => {
        this.setData({
          canOpen: true,
        })
      })
    }
  },

  methods: {
    // 打开邀请函
    openInvitation(){
      this.setData({
        isOpening: true
      })
    },

    // 收起邀请函
    closeInvitation() {
      this.setData({
        isOpening: false
      })

      setTimeout(() => {
        this.setData({
          canOpen: false
        })
      }, 660)
    },

    // 跳转地图页
    navToMapPage() {
      wx.navigateTo({ url: '../../pages/map/map' }) 
    },

    // 跳转弹幕页
    navToBarragePage() {
      wx.navigateTo({ url: '../../pages/barrage/barrage' }) 
    },

    // 获取用户信息
    bindGetUserInfo (e) {
      // 缓存用户信息
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(e.detail.userInfo),
        success: () =>{
          console.log(e.detail.userInfo)
          this.navToBarragePage()
        }
      })
    }
  }
})
