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
  '邀请函': {
    type: 'stepDebugging',
    detail: 'reopen',
    steps: [
      { label: '重启中...', type: 'default' },
      { label: '重启成功!', type: 'success' },
    ]
  },
  '送祝福': {
    type: 'stepDebugging',
    detail: 'bless',
    steps: [
      { label: '跳转准备中...', type: 'default' },
      { label: '跳转成功！', type: 'success' },
    ]
  },
  '帮助': {
    type: 'textListShow',
    detail: 'help',
    des: `这里展示了所有交互。`,
    additionDes: '点击蓝色链接直接查看，或者在下方输入框输入相关指令查看。',
    listDetail: [
      { id: 1, icon: "😀", cmd: { name: 'start', des: '初始化' } },
      { id: 2, icon: "😁", cmd: { name: '邀请函', des: '重启邀请函' } },
      { id: 3, icon: "🖖", cmd: { name: '送祝福', des: '为新人送上真挚的祝福' } },
      { id: 4, icon: "😋", cmd: { name: '清屏', des: '清空控制台当前内容' } },
      { id: 5, icon: "🙃", cmd: { name: '帮助', des: '帮助' } }
    ]
  },
  '清屏': {
    type: 'none',
    detail: 'clear',
    text: ''
  }
}

const randomNoneMatch = [
  '你笑起来真好看！',
  '恋爱是确定喜欢好的那一半，结婚是愿意接受坏的那一半。',
  '知非诗诗，未为奇奇。',
  '阅读是一座随身携带的避难所。',
  '爱是一件非专业的事情...... 一定要，爱着点什么，它让我们变得坚韧、宽容、充盈。业余的，爱着。',
  '白茶清欢无别事，我在等风也在等你。',
  '有思想的人到哪都不合群。',
  '有一种人是永远不会嫉妒的，因为他太骄傲。',
  '从来如此，便对吗？',
  '这个世界上只有一种英雄主义，就是认清了生活的真相后，还依然热爱它。',
  '永老无别离，万古常完聚。愿天下有情的都成了眷属。',
  '人类靠着聪明分割出很多疆界，最后又用爱把它们全部推到。',
  '人活一生，值得爱的东西很多。不要因为一个不满意，就灰心。',
  '虚能引和，静能生悟。',
  '居敬行简，修己安人。',
]

module.exports = { randomNoneMatch, cmds }
