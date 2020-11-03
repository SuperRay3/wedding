module.exports = {
  getCode() {
    const value = wx.getStorageSync('userInfo')
    let guest = ''
    try {
      if (value) guest = JSON.parse(value).nickName
    } catch (e) {
      console.error('拼接自动输入内容失败！')
    }
    return `饭饭：“婚礼需要的准备的怎么样了？”
雷雷雷： “我看一下啊～”
// TODO
1. 酒店、婚庆 ✅
2. 摄影、摄像、化妆、司仪 ✅
3. 喜字、胸花、礼炮 ✅
4. 少少少量气球 ✅
5. 挑一款喜庆且内敛的糖盒 ✅
6. 选糖盒要装的糖：
   软、硬、酥、巧克力，棉花糖？ ✅
7. 婚礼当天的服装 ✅
8. 伴手礼（不太常见的那种 ✅

雷雷雷：“都准备好了。”
饭：“你确定？”
雷雷雷：“确定！”
饭：“最重要的${guest}你邀请了吗？”
雷雷雷：“嘿！还是你细心！”
雷雷雷：“我现在就去写邀请函。”
.... TWO HOURS LATER ...
雷雷雷：“写好了！我运行一下～”




`
  }
}
