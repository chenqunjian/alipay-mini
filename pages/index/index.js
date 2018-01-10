import {saveUserInfo, getUserInfo} from '../../libs/utils'
import {http} from '../../libs/http'

const { globalData } = getApp()
Page({
  data: {
    cardNo: "",
    cardReturning: 0,
    disableUse:{
      buttonText: '立即使用',
      disabledQrcode: false
    },
    openCardSuccess: false,
    cardImage: null,
    menuList: null,
  },
  onLoad(query) {
    console.log(query)
    let openCardSuccess = false
    if(query.openCardSuccess){
      // openCardSuccess = true
      my.showToast({
        content: '开通成功', // 文字内容,
        delay: 1000,
      })
    }
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
      cardNo: userInfo.cardNo,
      // openCardSuccess,
      cardImage: globalData.cardImage,
      menuList: globalData.menuList
    })

    this.getCardStatus()
  },
  onUnload(){
    this.setData({
      openCardSuccess: false
    })
    // my.hideToast()
  },
  onHide(){
    this.setData({
      openCardSuccess: false
    })
    // my.hideToast()
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
      console.log(JSON.stringify(result))
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
        globalData.cardReturning = true
        
        let disableUse = {
          buttonText: '退卡审核中',
          disabledQrcode: true
        }

        this.setData({
          cardReturning: 1,
          disableUse
        })
      }else if(result.responseCode == "000000"){
          //清除全局变量
          globalData.cardReturning = false
      }
    })
  },
  // clearCache(){
  //   let userInfo = {
  //     customerNo: '',
  //     cardNo: ''
  //   }
  //   saveUserInfo(userInfo)

  //   my.showToast({content: '清除成功'})
  //   my.navigateTo({
  //     url: '/pages/introduce/introduce'
  //   });
  // },
  
  pay(){
    if(globalData.cardReturning){
      my.showToast({
        content: '正在申请退款中',
        duration: 1000,
      })
      return
    }

    my.navigateTo({
      url: '/pages/pay/pay'
    })
  },
  linkTo ({ target }) { // 菜单的路由跳转
      const { label, path } = target.dataset.item
      // 充值跳转前需要做的拦截
      if (path === 'pay') {
          this.pay()
          return false
      }
      //账户余额
      if (path === 'account') {
          this.account()
          return false
      }  
      // 退卡跳转前需要做的拦截
      if (path === 'returnCard') {
          this.returnCard()
          return false
      }
      // 其他跳转
      my.navigateTo({
        url: `/pages/${path}/${path}`
      });
  },
  account(){
    if(globalData.cardReturning){
      my.showToast({
        content: '正在申请退款中',
        duration: 1000,
      })
      return
    }

    my.navigateTo({
      url: '/pages/account/account'
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
        content: '退卡后您将无法使用手机刷码乘车服务，7日后卡内余额将退还到您支付宝账户',
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
                globalData.cardReturning = true
        
                let disableUse = {
                  buttonText: '退卡审核中',
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
  },
  toggleSuccessAlert () {
      this.setData({
          openCardSuccess: false
      })
    },
  linkBusCode(){
    this.setData({
      openCardSuccess: false
    })
    my.navigateTo({
      url: '/pages/qrcode/qrcode'
    });  
  },
  /** 
   * 跳转到二维码界面
  */
  use(){
    my.navigateTo({
      url: '/pages/qrcode/qrcode'
    });
  },

});
