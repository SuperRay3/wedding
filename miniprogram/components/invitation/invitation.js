const app = getApp()

Component({
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
  }
})
