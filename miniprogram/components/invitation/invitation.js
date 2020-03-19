const getstureBehavior = require('../../behaviors/gesture.js')

const app = getApp()

Component({
  behaviors: [getstureBehavior],
  data: {
    canOpen: false,
    isOpening: false
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
    }
  }
})
