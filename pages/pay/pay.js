import {http} from '../../libs/http'
import {getUserInfo} from '../../libs/utils'

const { globalData } = getApp()

Page({
  data: {
    cardNo:"",
    rechargeList: null,
    rechargeIndex: null,
    rechargeProtocol: null,
    protocolVisible: false,
  },
  onLoad() {
    let userInfo = getUserInfo()
    this.setData({
      cardNo: userInfo.cardNo,
      rechargeList: globalData.rechargeList,
      rechargeProtocol: globalData.rechargeProtocol
    })
  },
  pay({ target }){
      let index = target.dataset.index
      let amount = target.dataset.item.value
      console.log('select money:' + amount);
      this.setData({
          rechargeIndex: index
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
            this.setData({
              rechargeIndex: null
            })
            console.log("res:", res);
            if(res.resultCode == 9000){
                // my.showToast({
                //   content: '充值成功',
                //   duration: 1000
                // })
                //支付成功
                setTimeout(()=> {
                  my.redirectTo({
                    url: '/pages/payResult/payResult?money='+amount, // 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
                  });
                }, 1000);  
            }
            else if(res.resultCode == 8000){
              my.showLoading({
                delay: 1000
              })
              // my.alert({content: "订单处理中，请稍后查看"})
                // alert("订单处理中，请稍后查看");
            }
            else if(res.resultCode == 4000){
              // 订单支付失败
              my.showToast({
                content: '充值失败，请稍后重试',
                duration: 1000
              })
            }
            else if(res.resultCode == 6001){
              // my.alert({content: "您取消了支付"})
            }
            else if(res.resultCode == 6002){
              // 网络连接出错
              my.showToast({
                content: '系统繁忙，请稍后重试' ,
                duration: 1000
              })
            }
            else {
              my.showToast({
                content: '充值失败，请稍后重试',
                duration: 1000 
              })
            }
          },
        })
         
      })
      
    },
    toggleProtocol () {
        this.setData({
            protocolVisible: !this.data.protocolVisible
        })
    },
    linkRechargeLog () {
        my.navigateTo({
          url: '/pages/payRecord/payRecord'
        });
    }
});
