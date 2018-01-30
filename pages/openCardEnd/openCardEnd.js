import {http} from '../../libs/http'
import {saveUserInfo} from '../../libs/utils'

Page({
  data: {
    error: false,
    tips: "系统繁忙"
  },
  onLoad(query) {
    let authCode, requestId
    console.log(query)
    if(query.authCode && query.requestId){
      this.openCard(query.authCode, query.requestId)
    }else{
      my.redirectTo({
        url: '/pages/introduce/introduce', 
      })
    }
  },
  openCard(authCode, requestId){
    let url = "/getUserInfo"
    let data = {
        authCode,
        requestId
    }
    let showLoading = false //显示加载中的loading  
    http(url, data, 'POST', showLoading).then((result)=>{ 

        // let userInfo = {}
        // userInfo.customerNo = '20180130000000252719'
        // userInfo.cardNo = '7100500000000181'
        // saveUserInfo(userInfo)

        // my.redirectTo({
        //     url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        // })
        // return
        if(result.responseCode !== "000000"){
            //my.alert({content: result.responseDesc}) 
            this.setData({
              error: true,
              tips: result.responseDesc
            })
            return
        }
        // this.setData({
        //     openCardSuccess: true
        // })
        // my.showToast({content: '开卡成功'});
        
        //保存用户信息
        let userInfo = {}
        userInfo.customerNo = result.customerNo
        userInfo.cardNo = result.cardNo
        
        saveUserInfo(userInfo)

        // my.redirectTo({
        //     url: '/pages/index/index?openCardSuccess=1', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        // })
        if(my.canIUse('reLaunch')){
          my.reLaunch({
            url: '/pages/index/index?openCardSuccess=1'
          })
        }else{
          my.redirectTo({
            url: '/pages/index/index?openCardSuccess=1', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
          });
        }
      })
  }
});
