const loadingTxt = require('./loadingTxt')
const Loading = require('../../class/loading')
const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  data: {
    loadingTxt: loadingTxt,
    currTimeInd: 0 // 当前时间走到的位置
  },

  computed: {
    currLoadingTxt(data) {
      return data.loadingTxt[data.currTimeInd]
    }
  },

  lifetimes: {
    ready: function() {
      const loading = new Loading({
        tickCB: (data) => {
          this.setData(data)
          this.getLoadingTxt(data.currTime)
        },
        finished: () => {
          this.setData({
            currTimeInd: 0
          })

          this.triggerEvent('customevent', {})
        }
      })
      loading.start()
    }
  },

  methods: {
    getLoadingTxt(currTime) {
      const loadingTxt = this.data.loadingTxt
      let currTimeInd = this.data.currTimeInd

      if (currTime > loadingTxt[currTimeInd].time) {
        this.setData({
          currTimeInd: ++currTimeInd
        })
      }
    }
  }
})
