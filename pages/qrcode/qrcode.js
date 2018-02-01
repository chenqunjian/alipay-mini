import { http } from '../../libs/http'

const QR = require('../../libs/qrcodes')
// const reFreshTimeLimit = 50 //刷新间隔时间 秒
Page({
    data: {
        qrcodeStr: "",
        isQrShow: false,
        isPageShowing: true,
        reFresh: false,
        reFreshTime: 0,
        reFreshTimeLimit: 0,   //刷新间隔时间 秒
        qrcodeExpired: false,
        brightness: 0.6,        //屏幕亮度
        errorInfo: {
            errorShow: false,
            errorMsg: '',
            button: '返回',
            url: '',
        }
    },
    onLoad() {
        // my.showLoading({
        //     content: '加载中...',
        //     delay: '100',
        //   });
        //显示二维码
        // this.showQrImg()
    },
    onShow() {

        //显示二维码
        this.showQrImg()

        //获取屏幕亮度
        if (my.canIUse('getScreenBrightness')) {
            my.getScreenBrightness({
                success: (res) => {
                    console.log('getScreenBrightness:'+ JSON.stringify(res))
                    if(res.success){
                        this.data.brightness = res.brightness
                    }
                },
                fail: (res) => {
                    this.data.brightness = 0.6
                }
            });
        } else {
            console.log("你的环境暂不支持此功能----my.getScreenBrightness")
        }
        //设置屏幕长亮
        this.setKeepScreen(true)
        //调整屏幕亮度
        this.setScreenBrightness(0.7)
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
        console.log('on unload')
        // Do something when page close.
        // this.setData({isPageShowing: false})
        this.data.isPageShowing = false;

        //关闭屏幕长亮
        this.setKeepScreen(false)
        //设置屏幕亮度
        this.setScreenBrightness(this.data.brightness)
        //取消监听截屏事件
        my.offUserCaptureScreen()
        my.hideToast()
    },

    onHide() {
        console.log('on hide')
        this.data.isPageShowing = false;
        // this.setData({isPageShowing: false})
        //关闭屏幕长亮
        this.setKeepScreen(false)
        //设置屏幕亮度
        this.setScreenBrightness(this.data.brightness)
        //取消监听截屏事件
        my.offUserCaptureScreen()
        my.hideToast()
    },

    setScreenBrightness(brightness = 0.7) {
        console.log('set Brightness: '+ brightness)
        if (my.canIUse('setScreenBrightness')) {
            my.setScreenBrightness({
                brightness: 0.7,
                success: (res) => {
                    console.log(JSON.stringify(res))
                },
                fail: (res) => {
                },
            })
        } else {
            console.log("你的环境暂不支持此功能----my.setScreenBrightness")
        }
    },
    setKeepScreen(type = true) {
        //设置屏幕常亮
        if (my.canIUse('setKeepScreenOn')) {
            my.setKeepScreenOn({
                keepScreenOn: type,
            })
        } else {
            console.log("你的环境暂不支持此功能----my.setKeepScreenOn")
        }
    },

    showQrImg() {
        //刷新时间
        let time = Math.round(new Date() / 1000)
        let waitTime = time - this.data.reFreshTime
        if (waitTime < this.data.reFreshTimeLimit) {
            my.showToast({
                content: `请等待${this.data.reFreshTimeLimit - waitTime}秒后操作`,
                duration: 1000,
            })
            return
        }


        // my.hideLoading();
        //   this.setData({
        //       reFresh: true
        //   })
        http('/getUserQRCord').then((result) => {
            // console.log(result)
            if (result.responseCode == "000130") {
                //余额不足，请先充值
                // my.alert({
                //     content: '余额不足，请先充值',
                //     success: ()=>{
                //         my.redirectTo({
                //             url: '/pages/pay/pay'
                //         });
                //     }
                // })
                this.setData({
                    errorInfo: {
                        errorShow: true,
                        errorMsg: '余额不足，请先充值',
                        button: '去充值',
                        url: '/pages/pay/pay'
                    }
                })
                return
            }
            // else if (result.responseCode == "100000") {
            //     // this.setData({
            //     //     errorInfo: {
            //     //         errorShow: true,
            //     //         errorMsg: result.responseDesc,
            //     //         button: '返回',
            //     //         url: '/pages/index/index'
            //     //     }
            //     // })
            //     // setTimeout(() => {
            //     //     my.redirectTo({
            //     //         url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
            //     //     })
            //     // }, 1000);
            //     // my.redirectTo({
            //     //     url: '/pages/introduce/introduce', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
            //     // })
            //     return
            // }
            else if (result.responseCode !== "000000") {
                // my.alert({content: result.responseDesc})
                this.setData({
                    errorInfo: {
                        errorShow: true,
                        errorMsg: result.responseDesc,
                        button: '返回'
                    }
                })
                return
            }

            // let qrcodeStr = result.qrCode;
            let reFreshTimeLimit = result.timeout - 5 || 10
            console.log({reFreshTimeLimit})
            // console.log(str)
            // qrcodeStr = "data:image/jpg;base64," + qrcodeStr
            // console.time('qrcode')
            let qrcodeStr = QR.createQrCodeImg(result.qrCode, {errorCorrectLevel: "L", typeNumber: 2})
            // console.timeEnd('qrcode')
            this.setData({
                qrcodeStr,
                reFresh: false,
                reFreshTime: time,
                qrcodeExpired: false,
                reFreshTimeLimit
            })
            setTimeout(() => {
                this.setData({
                    qrcodeExpired: true
                })
            }, this.data.reFreshTimeLimit * 1000);
        }).catch(() => {
            this.setData({
                qrcodeExpired: true
            })
        })
    },
    errorHandle() {
        let url = this.data.errorInfo.url || '/pages/index/index'
        my.redirectTo({
            url
        })
    }

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
