const app = getApp()

Page({
  data: {
    showIndex: false
  },

  showIndex: function() {
    this.setData({
      showIndex: true
    })
  }
})
