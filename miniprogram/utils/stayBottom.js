const { Publiser, Observer } = require('../class/observer')

class StayBttomP extends Publiser {
  lastcodeContentH = 0 // 代码区域上一次的高
  codeContentH = 0 // 代码区域最新的高

  constructor(context, scrollViewH, selector) {
    super()
    // // 引用的上下文，也就是组件
    this.context = context
    this.scrollViewH = scrollViewH
    this.selector = selector
    this.s = this.context.createSelectorQuery()  
  }

  checkScroll() {
    this.s.select(this.selector).boundingClientRect(rect => {
      this.codeContentH = rect.height
    }).exec()

    if (this.codeContentH > this.scrollViewH) {
      if (this.codeContentH > this.lastcodeContentH) {
        this.notify()
        this.lastcodeContentH = this.codeContentH
      }
    }
  }
  
  notify() {
    this.observers.forEach(observer => {
      observer.update(this.codeContentH - this.scrollViewH)
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
    })
  }
}

module.exports = {
  StayBttomP,
  StayBttomO
}