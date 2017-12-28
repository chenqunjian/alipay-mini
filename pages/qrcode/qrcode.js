
import {http} from '../../libs/http' 
const reFreshTimeLimit = 50 //刷新间隔时间 秒
Page({
  data: {
    qrcodeStr: "",
    isQrShow: false,
    isPageShowing: true,
    reFresh: false,
    reFreshTime: 0
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
  },

  onHide(){
      this.data.isPageShowing = false;
      // this.setData({isPageShowing: false})
  },
  
  showQrImg(){
    //刷新时间
    let time = Math.round(new Date()/ 1000)
    let waitTime = time - this.data.reFreshTime
    if(waitTime <  reFreshTimeLimit){
        my.showToast({
          content: `请等待${reFreshTimeLimit - waitTime}秒后操作`
        })
        return
    }

      
      // my.hideLoading();
    //   this.setData({
    //       reFresh: true
    //   })
    http('/getUserQRCord').then((result)=>{
        console.log(result)
        if(result.responseCode == "000130"){
            //余额不足，请先充值
            my.alert({
                content: '余额不足，请先充值',
                success: ()=>{
                    my.navigateTo({
                        url: '/pages/pay/pay'
                    });
                }
            }) 
        }
        else if(result.responseCode !== "000000"){
            my.alert({content: result.responseDesc}) 
            return
        }

        let str = result.qrCode;
        console.log(str)
        str = "data:image/jpg;base64," + str
        
        this.setData({
            qrcodeStr: str,
            reFresh: false,
            reFreshTime: time
        })
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
