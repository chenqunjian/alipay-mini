import {http} from '../../libs/http'
import {getUserInfo} from '../../libs/utils'

Page({
  data: {
    cardNo:"",
    payList: [
      {money: 10, checked: 1},
      {money: 20, checked: 0},
      {money: 30, checked: 0},
      {money: 50, checked: 0},
      {money: 100, checked: 0},
      {money: 200, checked: 0},
    ],
    // money: 10
  },
  onLoad() {
    let userInfo = getUserInfo()
    this.setData({
      cardNo: userInfo.cardNo
    })
  },
  pay(e){
      let amount = e.target.dataset.money;
      console.log('select money:' + amount);
      let payList = this.data.payList;
      for (let index = 0; index < payList.length; index++) {
          
          if(amount == payList[index]['money']){
              payList[index]['checked'] = 1;
          }else{
              payList[index]['checked'] = 0;
          }
      }
      this.setData({
          payList
      })
      // amount *= 100
      amount /= 10

      let url = "/chargeApply"
      let data = {
          amount
      }
      http(url, data, 'POST').then((result)=>{
        console.log(result)
        if(result.responseCode !== "000000"){
          my.alert({content: result.responseDesc}) 
          return
        }

        let orderStr = result.payOrderStr
        my.tradePay({
          orderStr: orderStr, // 完整的支付参数拼接成的字符串，从服务端获取
          success: (res) => {
            console.log("res:", res);
            if(res.resultCode == 9000){
                my.showToast({content: '支付成功'})
                //支付成功
                setTimeout(()=> {
                  my.redirectTo({
                    url: '/pages/payResult/payResult?money='+amount, // 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
                  });
                }, 1000);  
            }
            else if(res.resultCode == 8000){
              my.alert({content: "订单处理中，请稍后查看"})
                // alert("订单处理中，请稍后查看");
                // my.switchTab({
                //     url: '/page/qrshow/qrshow', // 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
                // });
            }
            else if(res.resultCode == 4000){
              my.alert({content: "订单处理中，请稍后查看"})
            }
            else if(res.resultCode == 6001){
              my.alert({content: "订单处理中，请稍后查看"})
            }
            else if(res.resultCode == 6002){
              my.alert({content: "网络连接出错"})
            }
            else {
              my.alert({content: "支付失败，请稍后重试"})
            }
          },
        })
         
      })
      
    }
});
