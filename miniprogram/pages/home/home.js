const app = getApp()

Page({
  data: {
    showIndex: true,
    showTerminal: false
  },

  onLoad: function(){
    app.event.on('showIndex', () => {
      setTimeout(() => {
        this.setData({
          showIndex: true
        })
      }, 800)
    })
  },

  onUnload: function(){
    app.event.off('showIndex')
  }
})
