const cmds = {
  'npm run start': {
    type: 'stepDebugging',
    detail: 'start',
    steps: [
      { label: '初始化', type: 'default' },
      { label: '模块收集中...', type: 'default' },
      { label: '编译中...', type: 'default' },
      { label: '压缩中...', type: 'default' },
      { label: '打包成功!', type: 'success' },
      { label: '初始化', type: 'default' },
      { label: '模块收集中...', type: 'default' },
      { label: '编译中...', type: 'default' },
      { label: '压缩中...', type: 'default' },
      { label: '打包成功!', type: 'success' },
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
  'clear': {
    type: 'none',
    detail: 'clear',
    text: ''
  }
}

module.exports = cmds
