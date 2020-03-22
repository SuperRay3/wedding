const { Publiser, Observer } = require('./observer')

class StayBttomP extends Publiser {
  lastcodeContentH = 0 // 代码区域上一次的高
  codeContentH = 0 // 代码区域最新的高

  constructor(context, scrollViewH, selector) {
    super()
    // // 引用的上下文，也就是组件
    this.context = context
    this.scrollViewH = scrollViewH
    this.selector = selector
  }

  checkScroll() {
    this.context.createSelectorQuery().select(this.selector).boundingClientRect(rect => {
      this.codeContentH = rect.height

      console.log({
        codeContentH: this.codeContentH,
        lastcodeContentH: this.lastcodeContentH,
        scrollViewH: this.scrollViewH
      })

      if (this.codeContentH > this.scrollViewH) {
        if (this.codeContentH > this.lastcodeContentH) {
          this.notify()
          this.lastcodeContentH = this.codeContentH
        }
      }
    }).exec()
  }

  resetScroll() {
    this.lastcodeContentH = 0
    this.codeContentH = 0
    this.scrollViewH = 0
  }
  
  notify() {
    this.observers.forEach(observer => {
      observer.update(this.codeContentH)
    })
  }
}

class StayBttomO extends Observer {
  constructor(context, scrollTopBind) {
    super()
    // 引用的上下文，也就是组件
    this.context = context
    this.scorllTopBind = scrollTopBind
  }

  update(scrollTop) {
    const newData = {}
    newData[this.scorllTopBind] = scrollTop
    setTimeout(() => {
      this.context.setData(newData)
    }, 0)
  }
}

module.exports = {
  StayBttomP,
  StayBttomO
}