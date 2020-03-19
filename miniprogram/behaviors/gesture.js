module.exports = Behavior({
  data: {
    touchData: {
      start: 0,
      move: 0,
      direction: null
    }
  },
  methods: {
    touchStartFn(e) {
      this.setData({
        'touchData.start':e.touches[0]
      })
    },

    touchMoveFn(e) {
      // 移动过程中，修正index的位置
      // 获取起始点坐标 
      let startPoint = {
          x:this.data.touchData.start.pageX,
          y:this.data.touchData.start.pageY
      };
      // 获取移动时的坐标点
      let movePoint = {
          x:e.touches[0].pageX,
          y:e.touches[0].pageY
      }
      // 由于页面定位坐标系和指教坐标系有区别，故此y轴需要反过来减
      let _dx=movePoint.x - startPoint.x;
      let _dy=startPoint.y - movePoint.y;
      if( startPoint.x > 50 && _dx>0 ){
      }
      this.setData({
        'touchData.move':e.touches[0]
      })
    },

    touchEndFn(e) {
      // 获取移动数据，计算出手势结果
      let directData = this.handDirection(this.data.touchData);
      this.setData({
        'touchData.direction': directData
      })
    },

    handDirection(data) {
      // 手势识别
      if(!data.start){return false}
      if(!data.move){return false}
      // 获取起始点坐标 
      let startPoint = {
          x:data.start.pageX,
          y:data.start.pageY
      };
      // 获取结束点坐标
      let endPoint = {
          x:data.move.pageX,
          y:data.move.pageY
      };
      // 由于页面定位坐标系和直角坐标系有区别，故此y轴需要反过来减
      let _dx=endPoint.x - startPoint.x;
      let _dy=startPoint.y - endPoint.y;
  
      // 计算角度
      let directorDeg=(Math.atan2(_dx,_dy) / Math.PI) *180;
      let backData = {
          direct:'',
          dx:_dx,
          dy:_dy
      }
      // 对角度进行识别和处理
      if(Math.abs(directorDeg) <= 45){
          // 向上移动
          backData.direct = 'up';
      }else if(Math.abs(directorDeg) >= 135){
          // 向下移动
          backData.direct = 'down';         
      }else if(directorDeg < 135 && directorDeg > 45){
          // 向右移动
          backData.direct = 'right';          
      }else if(directorDeg > -135 && directorDeg < -45){
          // 向左移动
          backData.direct = 'left';       
      }
      return backData;
    }
  }
})