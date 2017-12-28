import {formatMoney} from '../../libs/utils'

Page({
  data: {
    money: 0
  },
  onLoad(query) {
    console.log(query)
    let money = formatMoney(query.money)
    this.setData({
      money
    })
  },
  back(){
    my.redirectTo({
      url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
    });
  }
});
