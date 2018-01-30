import {http} from '../../libs/http'
import {formatMoney} from '../../libs/utils'

let app = getApp()
Page({
  data: {
    balance: 0,
    visible: false  //是否显示页面
  },
  onLoad() {
    this.getBalance()

  },
  pay(){
    if(app.globalData.cardReturning){
      my.showToast({
        content: '退卡申请审核中，无法使用该功能',
        duration: 1000
      })
      return
    }
    my.navigateTo({
      url:'/pages/pay/pay'
    });
  },
  getBalance(){
  
    http('/queryUserAmount').then((result)=>{
      console.log(result)
      this.setData({
        visible: true
      })
      if(result.responseCode !== "000000"){
          // my.alert({content: result.responseDesc}) 
          my.showToast({
            content: result.responseDesc,
            duration: 1000
          })
          return
      }
      let balance = formatMoney(result.amount)

      this.setData({
        balance: balance
      })
    })

  }
});
