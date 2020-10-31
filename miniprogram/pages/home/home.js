const app = getApp()

Page({
  data: {
    showIndex: false,
    showTerminal: false
  },

  onLoad: function(){
    app.event.on('showIndex', () => {
      setTimeout(() => {
        this.setData({
          showIndex: true
        })
      })
    })
  },

  onUnload: function(){
    app.event.off('showIndex')
  }
})
