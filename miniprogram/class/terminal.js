class Terminal {
  constructor() {
    this.toggleHide()
    this.init()
  }
  
  history = [] // 当前输入的指令
  initDate = '' // 初始化时间
  isHide = true // 面板是否隐藏
  isExtand = false // 面板是否最大化
  userInfo = 'FaneverRay@❤️ ~ $ ' // 当前登录信息


  init() {
    this.initDate = (new Date()).toDateString()
  }

  toggleExtand(cb) {
    this.isExtand = !this.isExtand
    if (cb) cb(this.isExtand)
  }

  toggleHide(cb) {
    this.isHide = !this.isHide
    if (cb) cb(this.isHide)
  }
}

module.exports = Terminal