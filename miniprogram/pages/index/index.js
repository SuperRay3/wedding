const app = getApp()

Page({
  data: {
    showIndex: false
  },

  showIndex: function() {
    setTimeout(() => {
      this.setData({
        showIndex: true
      })
    }, 800)
  }
})
