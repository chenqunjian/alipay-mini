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
});
