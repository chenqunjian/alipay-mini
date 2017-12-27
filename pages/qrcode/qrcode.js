
import {http} from '../../libs/http' 

Page({
  data: {
    qrcodeStr: "",
    isQrShow: false,
    isPageShowing: true,
    reFresh: false
  },
  onLoad() {
    // my.showLoading({
    //     content: '加载中...',
    //     delay: '100',
    //   });
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
      
      // my.hideLoading();
      this.setData({
          reFresh: true
      })
      http('/qrcode').then((data)=>{
          let str = data.qrcode;
          console.log(str)
        //   str = "data:image/jpg;base64," + str
          this.setData({
              qrcodeStr: str,
              reFresh: false
            })
        })
  },


  // 刷新二维码
  reFreshQr(){
      
      // clearInterval(qrRefreshIntervalId);
      let qrRefreshIntervalId = undefined;
      if (qrRefreshIntervalId != undefined) {
          clearInterval(qrRefreshIntervalId);
      }
      qrRefreshIntervalId = setInterval(()=> {
          var isPageShowing = this.data.isPageShowing;
          console.log("isPageShowing:", isPageShowing);
          //页面不显示时，清除定时器
          if (!isPageShowing) {
              clearInterval(qrRefreshIntervalId);
              console.log("qrRefreshIntervalId:", qrRefreshIntervalId);
              return;
          }
          this.showQrImg();
          
      }, 60000);
  }

});
