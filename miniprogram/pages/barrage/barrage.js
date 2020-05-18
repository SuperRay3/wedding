// 最新获取的弹幕，用于 addData 方法装填最新弹幕
let stepLastestBarrage = []
// 轮询弹幕配置
let loopBarrageConfig = {
  skip: 0,
  limit: 20
}
// 轮询弹幕间隔
let loopBarrageTick = 6000

Page({
  data: {
    barrage: null,
  },

  async onReady() {
    try {
      stepLastestBarrage = await this.getBarrage(loopBarrageConfig)
      loopBarrageConfig.skip += loopBarrageConfig.limit

      this.initBarrageComp()
    } catch(error) {
      loopBarrageConfig.skip -= loopBarrageConfig.limit
    }

    // 开启轮询弹幕
    // setTimeout(() => {
    //   this.loopBarrageData()
    // }, loopBarrageTick)
  },

  /**
   * 初始化弹幕组件
   */

  initBarrageComp() {
    const barrageComp = this.selectComponent('.barrage')
    this.barrage = barrageComp.getBarrageInstance({
      font: 'bold 18px sans-serif',
      duration: 40,
      lineHeight: 2,
      mode: 'separate',
      padding: [10, 0, 10, 0],
      maxLength: 50,
      safeGap: 4,
      tunnelShow: false,
    })
    this.barrage.open()
    this.barrage.addData([stepLastestBarrage])
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
        console.log(data)
        res(data)
      } catch (error) {
        console.error('祝福获取失败！')
        rej('error')
      }
    })
    
  },

  /**
   * 轮询弹幕数据
   */

  loopBarrageData() {
    this.getBarrage(loopBarrageConfig)
      .then(res => {
        stepLastestBarrage = res

        // 弹幕全部轮询完后，重置 skip 以达到循环播放的目的
        if (res.length === 0) {
          loopBarrageConfig.skip = 0
        } else {
          this.barrage.addData(stepLastestBarrage)
          loopBarrageConfig.skip += loopBarrageConfig.limit
        }

        setTimeout(() => {
          this.loopBarrageData()
        }, loopBarrageTick)
      }, rej => {
        loopBarrageConfig.skip -= loopBarrageConfig.limit
      })
  },

  /**
   * 监听 barrage-sender 组件成功发送弹幕
   */

  onSendBarrage(e) {
    if (e.detail) {
      this.barrage.addData([e.detail])
    }
  },
})
