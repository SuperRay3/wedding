class Loading {
  /**
   * config
   * isEase <boolean> 是否匀速 默认是
   * time <number> loading 加载共用都少秒 默认 4500
   */
  constructor(config) {
    this.config = Object.assign({
      isEase: true,
      step: 1,
      time: 4500
    }, config)
    this.tick = this.config.time / 100 * this.config.step
  }

  currVal = 0 // 当前已加载的进度值
  currTime = 0 // 当前加载所用的时间
  timer = null // 定时器

  start() {
    let step = () => {
      this.currVal = +(this.currVal + this.config.step).toFixed(2)
      this.currTime += this.tick
      
      // 每 tick 的自定义回调事件
      if (this.config.tickCB) this.config.tickCB({ currVal: this.currVal, currTime: this.currTime })
      
      if (this.currTime === this.config.time) {
        if (this.config.tickCB) this.config.finished()
        clearTimeout(this.timer)
      }
      else this.timer = setTimeout(() => { step() }, this.tick)
    }

    this.timer = setTimeout(() => { step() }, this.tick)
  }

  abort() {
    clearTimeout(this.timer)
    throw new Error('不要怕，只是手动终止了计时器')
  }

  restart() {
    this.setData({
      currVal: 0,
      currTime: 0,
      timer: null
    })
   
    this.start()
  }
}

module.exports = Loading