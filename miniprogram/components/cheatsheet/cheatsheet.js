// components/cheatsheet.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    contentRow: [
      { id: 1, icon: "😀", cmd: { name: 'start', des: '打开邀请函' } },
      { id: 2, icon: "😁", cmd: { name: 'reopen', des: '再看一遍邀请函' } },
      { id: 3, icon: "🙃", cmd: { name: 'help', des: '帮助' } },
      { id: 3, icon: "😋", cmd: { name: 'clear', des: '指令输的太多，清一下' } }
    ]
  },

  /**
   * Component methods
   */
  methods: {

  }
})
