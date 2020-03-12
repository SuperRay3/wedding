const app = getApp()

Page({
  data: {
    showIndex: true
  },

  showIndex: function() {
    setTimeout(() => {
      this.setData({
        showIndex: true
      })
    }, 800)
  }
})
