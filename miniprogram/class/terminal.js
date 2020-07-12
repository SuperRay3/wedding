const { deepClone } = require("../utils/index");

class Terminal {
  constructor() {
    this.toggleHide()
    this.init()
  }
  
  history = [] // 当前输入的指令
  initDate = '' // 初始化时间
  isHide = true // 面板是否隐藏
  isExtand = false // 面板是否最大化
  userInfo = 'FaneverRay@fl ~ $ ' // 当前登录信息


  init() {
    this.initDate = `Last login: ${(new Date()).toDateString()} on ttys001`
  }

  toggleExtand(cb) {
    this.isExtand = !this.isExtand
    if (cb) cb(this.isExtand)
  }

  toggleHide(cb) {
    this.isHide = !this.isHide
    if (cb) cb(this.isHide)
  }

  getHistory() {
    return this.history
  }

  // 新生成一条指令
  async genNewCmd() {
    return new Promise(res => {
      this.history.push({
        cmd: '',
        rst: {},
        stamp: +new Date(),
        isExed: false
      })
      res(this)
    })
  }

  // 输入指令内容
  inputCmd(cmd) {
    return new Promise(res => {
      const length = this.history.length

      this.history[length - 1].cmd = cmd

      res(this)
    })
  }

  // exec lastest cmd
  async exeLastCmd(cmds) {
    return new Promise(res => {
      if (this.history.length === 0) {
        res(this)
        return
      }
      
      const length = this.history.length
      const lastCmd = this.history[length - 1]

      const rst = deepClone(cmds[lastCmd.cmd])

      this.history[length - 1].rst = rst ? rst : { type: 'none', text: '没有找到相应的命令' }
      this.history[length - 1].isExed = true

      res(this)
    })
  }

  // 清空历史记录
  clear() {
    return new Promise(res => {
      this.history.length = 0
      res(this)
    })
  }

}

module.exports = Terminal