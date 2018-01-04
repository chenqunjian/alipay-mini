import {saveUserInfo, getUserInfo} from '../../libs/utils'
import {http} from '../../libs/http'

let app = getApp()
Page({
  data: {
    cardNo: "",
    cardReturning: 0,
    disableUse:{
      buttonText: '立即使用',
      disabledQrcode: false
    }

  },
  onLoad() {

    let userInfo = getUserInfo()
    console.log(userInfo)
    // my.alert({content: JSON.stringify(userInfo)});
    if(userInfo == undefined || userInfo == null || userInfo == '' || userInfo.customerNo == '' || userInfo.customerNo == undefined || userInfo.customerNo == null){
      my.redirectTo({
        url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
      })
      return 
    }
    this.setData({
      cardNo: userInfo.cardNo
    })
    this.getCardStatus()
  },
  onUnload(){
    my.hideToast()
  },
  onHide(){
    my.hideToast()
  },
  /**
   *  获取卡信息
   *  000000  卡正常
   *  100000  卡信息不存在
   *  200000  卡注销未退款
   *  300000  卡注销已退款
   *  400000  参数错误
   */
  getCardStatus(){
    http('/getBizTkCardStatus').then((result)=>{
      console.log(result)
      if(result.responseCode == "100000" || result.responseCode == "300000"){
        //卡信息不存在或卡注销已退款
        let userInfo = {
          customerNo: '',
          cardNo: ''
        }
        saveUserInfo(userInfo)

        my.redirectTo({
          url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        }) 
      }else if(result.responseCode == "200000"){
        //卡注销未退款
        app.globalData.cardReturning = true
        
        let disableUse = {
          buttonText: '正在退款中',
          disabledQrcode: true
        }

        this.setData({
          cardReturning: 1,
          disableUse
        })
      }
 
    })
  },
  clearCache(){
    let userInfo = {
      customerNo: '',
      cardNo: ''
    }
    saveUserInfo(userInfo)

    my.showToast({content: '清除成功'})
    my.navigateTo({
      url: '/pages/introduce/introduce'
    });
  },
  develop(){
    my.showToast({content: '建设中'})
  },
  /** 
   * 跳转到二维码界面
  */
  use(){
    my.navigateTo({
      url: '/pages/qrcode/qrcode'
    });
  },
   /** 
   * 账户
  */
  account(){
    my.navigateTo({
      url: '/pages/account/account'
    })
  },
  pay(){
    if(app.globalData.cardReturning){
      my.showToast({content: '正在申请退款中'})
      return
    }

    my.navigateTo({
      url: '/pages/pay/pay'
    })
  },
  busRecord(){
    my.navigateTo({
      url: '/pages/busRecord/busRecord'
    })
  },
  returnCard(){
    if(this.data.cardReturning){
      my.confirm({
        content: '您的退卡申请已提交，正在审核中',
        confirmButtonText: '查看进度',
        cancelButtonText: '我知道了',
        success: (res) => {
          if(res.confirm == true){
            my.navigateTo({
              url: '/pages/returnCard/returnCard'
            })
          }
        },
      });
    }
    else{
    //退卡
      my.confirm({
        content: '退卡后您将不能再享受手机乘公交的便捷服务',
        confirmButtonText: '残忍退卡',
        cancelButtonText: '我再想想',
        success: (result) => {
          console.log(result)
          if(result.confirm == true){
            http('/refundApply').then((result)=>{
              console.log(result)
              if(result.responseCode !== "000000"){
                  my.alert({content: result.responseDesc}) 
                  return
                }
                app.globalData.cardReturning = true
        
                let disableUse = {
                  buttonText: '正在退款中',
                  disabledQrcode: true
                }

                this.setData({
                  cardReturning: 1,
                  disableUse
                })
              my.navigateTo({
                url: '/pages/returnCard/returnCard'
              })

            })
          }
        },
      })
    }
  }


});
