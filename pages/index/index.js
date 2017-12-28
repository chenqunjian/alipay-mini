import {saveUserInfo, getUserInfo} from '../../libs/utils'
import {http} from '../../libs/http'

let app = getApp()
Page({
  data: {
    cardNo: "2017093009856",
    userCode: ""
  },
  onLoad() {

    let userInfo = getUserInfo()
    console.log(userInfo)
    // my.alert({content: JSON.stringify(userInfo)});
    if(userInfo == '' || userInfo.customerNo == '' || userInfo.customerNo == undefined || userInfo.customerNo == null){
      my.redirectTo({
        url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
      }) 
    }
    this.setData({
      cardNo: userInfo.cardNo
    })
    this.getCardStatus()
  },
  /**
   *  获取卡信息
   *  
   *  100000  卡信息不存在
   *  
   */
  getCardStatus(){
    http('/getBizTkCardStatus').then((result)=>{
      console.log(result)
      if(result.responseCode == "100000"){
        //卡信息不存在
        let userInfo = {
          customerNo: '',
          cardNo: ''
        }
        saveUserInfo(userInfo)

        my.redirectTo({
          url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        }) 
      }
 
    })
  },
  clearCache(){
    my.setStorage({
        key: 'user_info', // 缓存数据的 key
        data: '', // 要缓存的数据
    })
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
            my.navigateTo({
              url: '/pages/returnCard/returnCard'
            })

          })
        }
      },
    })
  }


});
