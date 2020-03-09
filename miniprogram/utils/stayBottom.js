const { Publiser, Observer } = require('../class/observer')

class StayBttomP extends Publiser {
  lastcodeContentH = 0 // 代码区域上一次的高
  codeContentH = 0 // 代码区域最新的高

  constructor(context, scrollViewH) {
    super()
    // // 引用的上下文，也就是组件
    this.context = context
    this.scrollViewH = scrollViewH
    this.s = this.context.createSelectorQuery()  
  }

  checkScroll() {
    this.s.select('#code-content').boundingClientRect(rect => {
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
  constructor(context) {
    super()
    // 引用的上下文，也就是组件
    this.context = context
  }

  update(scrollTop) {
    setTimeout(() => {
      this.context.setData({
        codeContentScrollTop: scrollTop
      })
    })
  }
}

module.exports = {
  StayBttomP,
  StayBttomO
}