Page({
  data: {
    money: 0,
    date: '',
    orderSn: ''
  },
  onLoad(query) {
    if(query){
      console.log(query)
      this.setData({
        money: query.money,
        date: query.date,
        orderSn: query.orderSn
      })
      console.log(this.data.date)
    }else{
      my.redirectTo({
        url: '/pages/payRecord/payRecord', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
      })
    }
  },
});
