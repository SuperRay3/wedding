const loadingTxt = require('./loadingTxt')
const Loading = require('../../class/loading')
// const dom = require('./carDom')
const computedBehavior = require('miniprogram-computed')
const app = getApp()

Component({
  behaviors: [computedBehavior],
  data: {
    loadingTxt: loadingTxt,
    currTimeInd: 0 // 当前时间走到的位置
    // domStr: dom
  },

  computed: {
    currLoadingTxt(data) {
      return data.loadingTxt[data.currTimeInd]
    }
  },

  lifetimes: {
    ready: function() {
      const loading = new Loading({
        time: 10000,
        tickCB: (data) => {
          this.setData(data)
          this.getLoadingTxt(data.currTime)
        },
        finished: () => {
          app.event.emit('showIndex')
        }
      })
      loading.start()
    }
  },

  methods: {
    getLoadingTxt(currTime) {
      const loadingTxt = this.data.loadingTxt
      let currTimeInd = this.data.currTimeInd

      if (currTimeInd < (loadingTxt.length - 1) && currTime > loadingTxt[currTimeInd].time) {
        this.setData({
          currTimeInd: ++currTimeInd
        })
      }
    }
  }
})
