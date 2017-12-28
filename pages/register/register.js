import {checkIdcard, checkMobile, checkName, checkMobileCode} from '../../libs/utils' 

let app = getApp()
let verifyCodeTimer = 0
Page({
  data: {
      showCardLoading: false,
      openCardSuccess: false,
      userInfo: {
          name: '管**',
          id: '130432****',
          mobile: ''
        },
      registrable: false,
      errorMessage: "",
      sendCodeMessage: {
        disabled: false, 
        label: '发送验证码'
      },
      mobile:"",
      checkInfo:{
          name: false,
          idcard: false,
          mobile: false,
          mobileCode: false
      }
  },
  onLoad() {
    // my.getAuthCode({
    //   scopes: 'auth_user', // 主动授权：auth_user，静默授权：auth_base
    //   success: (res) => {
    //     console.log(res)
    //   },
    // })
    let url = "https://memberprod.alipay.com/account/openform/activecard.htm?app_id=2017080708077054&template_id=20171211000000000687259000300359&__webview_options__=canPullDown%3dNO%26transparentTitle%3dauto"
    //先判断当前环境是否能够使用
    if (my.canIUse('addCardAuth')) {
        my.addCardAuth({ url: url,
            success: (res) => {
                my.alert({content: '授权成功'})
                my.alert({content: JSON.stringify(res)})
                //上传auth_code
//                 {"result":{"app_id":"2017080708077054","auth_code":"90937a4fa28e4dde8ba99469228dOX94",
                // "request_id":"20171227015874817220904638943","scope":auth_base%2Cauth_user%2Cauth_ecard","state":
// "bWNhcmQ%3D","template_id":"20171211000000000687259000300359"},"resultStatus":"9000
// ","success":true}
                // if(res.resultStatus == "9000" && res.success){
                    
                // }
                
                my.redirectTo({
                  url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
                })
            },
            fail: (res) => {
                my.alert({content: '授权失败'}); my.alert({content: JSON.stringify(res)}); alertAndCopy(res);
            }, 
        });
    } else {
        my.alert({content: '当前 付宝钱包版本过低，需要升级后才可使 哦'});
    }
  },
  getInputName(e){
    let name = e.detail.value;
    console.log('name:' + name)

    if(!checkName(name)){
        this.setData({
            errorMessage: "请输入正确的姓名"
        })
        return;
    }

    this.setData({
        'userInfo.name': name,
        errorMessage: "",
        'checkInfo.name': true
    })
  },
  getInputID(e){
    let idcard = e.detail.value;
    console.log('idcard:' + idcard)

    if(!checkName(idcard)){
        this.setData({
            errorMessage: "请输入正确的身份证号"
        })
        return;
    }
    this.setData({
        'userInfo.idcard': idcard,
        errorMessage: "",
        'checkInfo.idcard': true
    })
  },
  getInputMobile(e){
    let mobile = e.detail.value;
    console.log('mobile:' + mobile)

    if(!checkMobile(mobile)){
        this.setData({
            errorMessage: "请输入正确的手机号"
        })
        return;
    }
    this.setData({
        mobile,
        errorMessage: "",
        'checkInfo.mobile': true
    })
  },
  getInputCode(e){
    let code = e.detail.value;
    console.log('code:' + code)
    if(!checkMobileCode(code)){
        this.setData({
            errorMessage: "请输入正确的验证码"
        })
        return
    }
    this.setData({
        registrable: false,
        errorMessage: "",
        'checkInfo.mobileCode': true
    })

  },
  getVerifyCode(){
    if(this.data.sendCodeMessage.disabled){
        return
    }  
    console.log(this.data.mobile)
    if(!checkMobile(this.data.mobile)){
        this.setData({
            errorMessage: "请输入正确的手机号"
        })
        return;
    }

    console.log("getVerifyCode");
    my.showToast({
      content: '验证码已发送', // 文字内容
    })
    
    let times = 60;
    this.setData({sendCodeMessage: {disabled: true, label: times + 's'}});

    verifyCodeTimer = setInterval(()=> {
        if (times <= 2) {
            clearInterval(verifyCodeTimer);
        }
        this.setData({
            sendCodeMessage: {
                disabled: true,
                label: (--times) + "s"
            }
        });

    }, 1000);
    setTimeout(()=> {
        this.setData({sendCodeMessage: {disabled: false, label: '发送验证码'}});
    }, times * 1000);
  },

  register(){
    this.setData({
        showCardLoading: true
    })
    //发送开卡请求
    setTimeout(() => {
        this.setData({
            showCardLoading: false,
            // openCardSuccess: true
        })
  
        my.redirectTo({
            url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        });
    }, 1000);
    //跳转

    let userInfo = {
        user_code: 'sdjlejflejfl',
        card_no: '201709203384848'
    }

    my.setStorage({
      key: 'user_info', // 缓存数据的 key
      data: userInfo, // 要缓存的数据
    })
    app.globalData.userCode = userInfo.user_code
    
  }
});
