let initBarrageData = []

Page({
    data: {
        barrage: null
    },

    async onReady() {
        initBarrageData = await this.getBarrage()
        this.initBarrageComp()
    },

    /**
     * 初始化弹幕组件
     */

    initBarrageComp() {
        const barrageComp = this.selectComponent('.barrage')
        this.barrage = barrageComp.getBarrageInstance({
            font: 'bold 16px sans-serif',
            duration: 10,
            lineHeight: 2,
            mode: 'separate',
            padding: [10, 0, 10, 0],
            tunnelShow: false
          })
        this.barrage.open()
        this.barrage.addData(initBarrageData)
    },

    /**
     * 获取指定条件的弹幕数据
     * @param opts 条件配置
     */

    async getBarrage(opts) {
        const defaultParam = { skip: 0, limit: 100 }
        const fullParam = { ...defaultParam, ...opts }
        const db = wx.cloud.database()
        try {
            const { data } = await db.collection('barrage').skip(fullParam.skip).limit(fullParam.limit).get()
            console.log(data)
            return data
        } catch(error) {
            wx.showToast({
                title: '祝福获取失败！',
                duration: 1500
            })
            return []
        }
    }
})