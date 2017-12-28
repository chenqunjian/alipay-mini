import {http} from '../../libs/http'
import {formatMoney} from '../../libs/utils'

Page({
  data: {
    balance: 0
  },
  onLoad() {
    this.getBalance()

  },
  getBalance(){
  
    http('/queryUserAmount').then((result)=>{
      console.log(result)
      if(result.responseCode !== "000000"){
          my.alert({content: result.responseDesc}) 
          return
      }
      let balance = formatMoney(result.amount)

      this.setData({
        balance: balance
      })
    })

  }
});
