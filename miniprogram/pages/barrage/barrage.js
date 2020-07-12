// 缓存弹幕，用于循环过一次后离线使用。因为微信云数据库有请求次数限制
let offlineBarrage = []
// 是否切换为离线弹幕数据
let isOffline = false
// 轮询弹幕配置
let loopBarrageConfig = {
  skip: 0,
  limit: 20
}
// 轮询弹幕间隔
let loopBarrageTick = 6000
// timer
let timer = null

Page({
  data: {
    barrage: null,
  },

  onReady() {
    this.initBarrageComp()
    console.log({ isOffline, skip: loopBarrageConfig.skip, timer })
    this.loopBarrageData()
  },

  onUnload() {
    this.resetGlobalParam()
    this.barrage.close()
    timer = clearTimeout(timer)
  },

  /**
   * 初始化弹幕组件
   */

  initBarrageComp() {
    const barrageComp = this.selectComponent('.barrage')
    this.barrage = barrageComp.getBarrageInstance({
      font: 'bold 18px sans-serif',
      duration: 50,
      lineHeight: 2,
      mode: 'separate',
      padding: [10, 0, 10, 0],
      maxLength: 70,
      safeGap: 4,
      tunnelShow: false,
    })
    this.barrage.open()
  },

  /**
   * 获取指定条件的弹幕数据
   * @param opts 条件配置
   */

  getBarrage(opts) {
    const defaultParam = { skip: 0, limit: 100 }
    const fullParam = { ...defaultParam, ...opts }
    return new Promise(async (res, rej) => {
      const db = wx.cloud.database()
      try {
        const { data } = await db
          .collection('barrage')
          .skip(fullParam.skip)
          .limit(fullParam.limit)
          .get()
        res(data)
      } catch (error) {
        console.error('祝福获取失败！')
        rej('error')
      }
    })
    
  },

  /**
   * 装填弹幕数据
   */

  async loopBarrageData() {
    let willLoadedBarrage = []
    // 当前游标底线
    const currIndL = loopBarrageConfig.skip
    // 当前游标上线
    const currIndU = loopBarrageConfig.skip + loopBarrageConfig.limit

    if (isOffline) {
      willLoadedBarrage = offlineBarrage.slice(currIndL, currIndU)
    } else {
      try {
        willLoadedBarrage = await this.getBarrage(loopBarrageConfig)
        if (willLoadedBarrage.length > 0) offlineBarrage = [...offlineBarrage, ...willLoadedBarrage]
      } catch(error) {
        console.error(`接口获取弹幕数据失败, 当前坐标 ${loopBarrageConfig}`)
        loopBarrageConfig.skip -= loopBarrageConfig.limit
      }
    }

    this.barrage.addData(willLoadedBarrage)

    if (willLoadedBarrage.length === 0) {
      // 循环过一边后，开启本地缓存弹幕
      if (offlineBarrage.length > 0) loopBarrageConfig.skip = 0
      isOffline = true
    } else {
      loopBarrageConfig.skip += loopBarrageConfig.limit
    }

    timer = setTimeout(() => {
      this.loopBarrageData()
    }, loopBarrageTick)
  },

  /**
   * 监听 barrage-sender 组件成功发送弹幕
   */

  onSendBarrage(e) {
    if (e.detail) {
      offlineBarrage.push(e.detail)
      this.barrage.addData([e.detail])
    }
  },

  /**
   * 重置全局缓存变量
   */

  resetGlobalParam() {
    offlineBarrage = []
    isOffline = false
    loopBarrageConfig = {
      skip: 0,
      limit: 20
    }
  }
})
