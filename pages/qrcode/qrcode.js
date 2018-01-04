
import {http} from '../../libs/http' 
// const reFreshTimeLimit = 50 //刷新间隔时间 秒
Page({
  data: {
    qrcodeStr: "",
    isQrShow: false,
    isPageShowing: true,
    reFresh: false,
    reFreshTime: 0,
    reFreshTimeLimit: 0,   //刷新间隔时间 秒 
    qrcodeExpired: false
  },
  onLoad() {
    // my.showLoading({
    //     content: '加载中...',
    //     delay: '100',
    //   });
    //显示二维码
    // this.showQrImg()
  },
  onShow(){
    //显示二维码
    this.showQrImg()
    
    //获取屏幕亮度
    if (my.canIUse('getScreenBrightness')) {
        my.getScreenBrightness({
            success: (res) => {
                // my.alert({
                //     title: '获取屏幕亮度成功',
                //     content: JSON.stringify(res)
                // })
            },
            fail: (res) => {
                // my.alert({
                //     title: '获取屏幕亮度错误',
                //     content: JSON.stringify(res)
                // })
            },
            complete:(res) =>{
                // my.alert({
                //     title: '获取屏幕亮度完成',
                //     content: JSON.stringify(res)
                // })
            }
        });
    } else {
        console.log("你的环境暂不支持此功能----my.getScreenBrightness")
    }
    //设置屏幕长亮
    this.setKeepScreen(true)

  },
  onReady() {
    if (my.canIUse('onUserCaptureScreen')) {
        my.onUserCaptureScreen(function () {
            my.alert({
                content: '分享乘车码给他人可能导致您的资金损失'
            });
        });
    } else {
        console.log("你的环境暂不支持此功能----my.onUserCaptureScreen")
    }
  },
  onUnload() {
      // Do something when page close.
      // this.setData({isPageShowing: false})
      this.data.isPageShowing = false;
    
    //关闭屏幕长亮
    this.setKeepScreen(false)
    //设置屏幕亮度
    this.setScreenBrightness(0.6)
    //取消监听截屏事件
    my.offUserCaptureScreen()
    my.hideToast()
  },

  onHide(){
      this.data.isPageShowing = false;
      // this.setData({isPageShowing: false})
    //关闭屏幕长亮
    this.setKeepScreen(false)
    //设置屏幕亮度
    this.setScreenBrightness(0.6)
    //取消监听截屏事件
    my.offUserCaptureScreen()
    my.hideToast()
  },
    
  setScreenBrightness(brightness = 0.7){
      if(my.canIUse('setScreenBrightness')){
        my.setScreenBrightness({
            brightness:0.7,
            success: (res) => {
                console.log(JSON.stringify(res))
            },
            fail: (res) => {
            },
        })
    }else{
        console.log("你的环境暂不支持此功能----my.setScreenBrightness")
    }
  },
  setKeepScreen(type = true){
    //设置屏幕常亮
    if (my.canIUse('setKeepScreenOn')) {
        my.setKeepScreenOn({
            keepScreenOn: type,
        })
    } else {
        console.log("你的环境暂不支持此功能----my.setKeepScreenOn")
    }
  },
  
  showQrImg(){
    //刷新时间
    let time = Math.round(new Date()/ 1000)
    let waitTime = time - this.data.reFreshTime
    if(waitTime <  this.data.reFreshTimeLimit){
        my.showToast({
          content: `请等待${reFreshTimeLimit - waitTime}秒后操作`,
          duration: 1000,
        })
        return
    }

      
      // my.hideLoading();
    //   this.setData({
    //       reFresh: true
    //   })
    http('/getUserQRCord').then((result)=>{
        // console.log(result)
        if(result.responseCode == "000130"){
            //余额不足，请先充值
            my.alert({
                content: '余额不足，请先充值',
                success: ()=>{
                    my.redirectTo({
                        url: '/pages/pay/pay'
                    });
                }
            }) 
            return
        }
        else if(result.responseCode == "100000"){
            // my.showToast({
            //   content: '卡号为空', // 文字内容              
            // })
            // setTimeout(() => {
            //     my.redirectTo({
            //         url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
            //     })
            // }, 1000);
            my.redirectTo({
                url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
            })
        }
        else if(result.responseCode !== "000000"){
            my.alert({content: result.responseDesc}) 
            return
        }

        let str = result.qrCode;
        let reFreshTimeLimit = result.timeout || 30
        // console.log(str)
        str = "data:image/jpg;base64," + str
        
        this.setData({
            qrcodeStr: str,
            reFresh: false,
            reFreshTime: time,
            qrcodeExpired: false,
            reFreshTimeLimit
        })

        setTimeout(() => {
            this.setData({
                qrcodeExpired: true
            })
        }, reFreshTimeLimit);        
    })
  },


  // 刷新二维码
//   reFreshQr(){
      
//       // clearInterval(qrRefreshIntervalId);
//       let qrRefreshIntervalId = undefined;
//       if (qrRefreshIntervalId != undefined) {
//           clearInterval(qrRefreshIntervalId);
//       }
//       qrRefreshIntervalId = setInterval(()=> {
//           var isPageShowing = this.data.isPageShowing;
//           console.log("isPageShowing:", isPageShowing);
//           //页面不显示时，清除定时器
//           if (!isPageShowing) {
//               clearInterval(qrRefreshIntervalId);
//               console.log("qrRefreshIntervalId:", qrRefreshIntervalId);
//               return;
//           }
//           this.showQrImg();
          
//       }, 60000);
//   }

});
