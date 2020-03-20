const cmds = {
  'npm run start': {
    type: 'stepDebugging',
    steps: [
      { label: '初始化', type: 'default' },
      { label: '模块收集中...', type: 'default' },
      { label: '编译中...', type: 'default' },
      { label: '压缩中...', type: 'default' },
      { label: '打包成功!', type: 'success' },
    ]
  }
}

module.exports = cmds
