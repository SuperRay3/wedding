const cmds = {
  'start': {
    type: 'stepDebugging',
    detail: 'start',
    steps: [
      { label: '初始化', type: 'default' },
      { label: '模块收集中...', type: 'default' },
      { label: '编译中...', type: 'default' },
      { label: '压缩中...', type: 'default' },
      { label: '打包成功!', type: 'success' }
    ]
  },
  'reopen': {
    type: 'stepDebugging',
    detail: 'reopen',
    steps: [
      { label: '重启中...', type: 'default' },
      { label: '重启成功!', type: 'success' },
    ]
  },
  'bless': {
    type: 'stepDebugging',
    detail: 'bless',
    steps: [
      { label: '跳转准备中...', type: 'default' },
      { label: '跳转成功！', type: 'success' },
    ]
  },
  'help': {
    type: 'textListShow',
    detail: 'help',
    des: `这里包含了所有显示玩法，点击即可体验。`,
    additionDes: '更多隐式秘密等你探索～',
    listDetail: [
      { id: 1, icon: "😀", cmd: { name: 'start', des: '打开邀请函' } },
      { id: 2, icon: "😁", cmd: { name: 'reopen', des: '再看一遍邀请函' } },
      { id: 3, icon: "🖖", cmd: { name: 'bless', des: '送上祝福' } },
      { id: 4, icon: "😋", cmd: { name: 'clear', des: '清空控制台' } },
      { id: 5, icon: "🙃", cmd: { name: 'help', des: '帮助' } }
    ]
  },
  'clear': {
    type: 'none',
    detail: 'clear',
    text: ''
  }
}

module.exports = cmds
