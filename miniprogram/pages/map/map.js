const plugin = requirePlugin('routePlan');

const key = 'LKUBZ-SXEL6-YWUSN-MYXBY-NLLQ2-AGB3U'
const referer = '婚礼请柬-小程序'
let endPoint = JSON.stringify({
    'name': '好运来（华林国际店）',
    'latitude': 38.073442,
    'longitude': 114.479038
})

Page({

  data: {
    // 地图 config
    setting: {
      longitude: 114.479038,
      latitude: 38.073442,
      scale: 14,
      showCompass: true,
      showScale: true,
      showLocation: true,
      enableTraffic: true,
      markers: [
        {
          id: 1,
          longitude: 114.479038,
          latitude: 38.073442,
          iconPath: '../../images/loc.png',
          callout: {
            content: '欢迎您来参加我们的婚礼！',
            padding: 8,
            fontSize: 18,
            bgColor: '#f6416c',
            color: '#ffde7d',
            textAlign: 'center',
            borderRadius: 4
          }
        }
      ]
    }
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  navTo() {
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
    })
  }
})