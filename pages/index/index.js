
let app = getApp()
Page({
  data: {
    cardNo: "2017093009856",
    userCode: ""
  },
  onLoad() {
    let userCode = app.globalData.userCode
    if(userCode == '' || userCode == undefined || userCode == null){
      my.redirectTo({
        url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
      })
    }


    this.setData({
      cardNo: app.globalData.cardNo
    })
  },
  use(){
    my.navigateTo({
      url: '/pages/qrcode/qrcode'
    });
  },
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
          my.navigateTo({
            url: '/pages/returnCard/returnCard'
          })
        }
      },
    })

    //退卡申请已经提交
    // my.confirm({
    //   content: '您的退卡申请正在审核中',
    //   confirmButtonText: '查看进度',
    //   cancelButtonText: '我知道了',
    //   success: (result) => {
    //     console.log(result)
    //     if(result.confirm == true){
    //       my.navigateTo({
    //         url: '/pages/returnCard/returnCard'
    //       })
    //     }
    //   },
    // })
  }


});
