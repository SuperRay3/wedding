const getstureBehavior = require('../../behaviors/gesture.js')
const computedBehavior = require('miniprogram-computed')

const app = getApp()

Component({
  behaviors: [getstureBehavior, computedBehavior],
  data: {
    canOpen: false,
    isOpening: false
  },

  watch: {
    'touchData.direction': function(newVal) {
      if (newVal) {
        if (newVal.direct === 'down') {
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
    }
  }
})
