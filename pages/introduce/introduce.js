import {getCardUrl} from '../../libs/config';
import {http} from '../../libs/http'
import {saveUserInfo, getUserInfo} from '../../libs/utils'

const {globalData} = getApp();
Page({
    data: {
        showCardLoading: false,
        openCardSuccess: false
    },
    onLoad(){
        let userInfo = getUserInfo()
        console.log(userInfo)
        if(userInfo !== '' && userInfo.customerNo !== '' && userInfo.customerNo !== undefined && userInfo.customerNo !== null){
            my.redirectTo({
                url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
            }) 
        }
    },
    onShow(){
        console.log('introduce show')

    },
    agreement(){
        my.navigateTo({
            url:'/pages/agreement/agreement'
        });
    },
    register(){
        //保存用户信息
        let userInfo = {}
        userInfo.customerNo = '20171227000000020644'
        userInfo.cardNo = '7100400000000086'
        saveUserInfo(userInfo)

        my.redirectTo({
            url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        })
        return
        console.log({getCardUrl})
        // my.redirectTo({
        //     url: '/pages/register/register',
        // });

//         let res = `{
//     "result": {
//         "app_id": "2017080708077054",
//         "auth_code": "90937a4fa28e4dde8ba99469228dOX94",
//         "request_id": "20171227015874817220904638943",
//         "scope": "auth_base%2Cauth_user%2Cauth_ecard",
//         "state": "bWNhcmQ%3D",
//         "template_id": "20171211000000000687259000300359"
//     },
//     "resultStatus": "9000",
//     "success": true
// }`
//         res = JSON.parse(res)
//         console.log(res)
        // if(res.resultStatus == "9000" && res.success){

            // my.alert({content: JSON.stringify(res)}) 
        //     let authCode = '1'
        //     let requestId = '2'
        //     // let url = `/getUserInfo?authCode=${authCode}&requestId=${requestId}`
        //     let url = "/getUserInfo"
        //     let data = {
        //         authCode,
        //         requestId
        //     }

        //     http(url, data, 'POST').then((result)=>{
                
        //         console.log(result)
        //         if(result.responseCode !== "000000"){
        //             my.alert({content: result.responseDesc}) 
        //         }
        //         my.showToast({content: '开卡成功'});
                
        //         //保存用户信息
        //         let userInfo = {}
        //         userInfo.userCode = result.customerNo
        //         userInfo.cardNo = result.cardNo
        //         console.log(userInfo)
        //         saveUserInfo(userInfo)

        //         my.redirectTo({
        //             url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        //         })
        //     })
        // // }else if(res.resultStatus == "6001"){
        // //     my.alert({content: '您取消了'})
        // // }
        



        //先判断当前环境是否能够使用
    if (my.canIUse('addCardAuth')) {
        my.addCardAuth({ url: getCardUrl,
            success: (res) => {  
                // my.alert({content: JSON.stringify(res)})
                //上传auth_code
//                 {"result":{"app_id":"2017080708077054","auth_code":"90937a4fa28e4dde8ba99469228dOX94",
                // "request_id":"20171227015874817220904638943","scope":auth_base%2Cauth_user%2Cauth_ecard","state":
// "bWNhcmQ%3D","template_id":"20171211000000000687259000300359"},"resultStatus":"9000
// ","success":true}
                if(res.resultStatus == "9000" && res.success){

                    this.setData({
                        showCardLoading: true
                    })
                    // my.alert({content: JSON.stringify(res)}) 
                    let authCode = res.result.auth_code
                    let requestId = res.result.request_id
                    // let url = `/getUserInfo?authCode=${authCode}&requestId=${requestId}`
                    let url = "/getUserInfo"
                    let data = {
                        authCode,
                        requestId
                    }

                    http(url, data, 'POST').then((result)=>{
                        this.setData({
                            showCardLoading: false
                        })
                        console.log(result)
                        if(result.responseCode !== "000000"){
                            my.alert({content: result.responseDesc}) 
                            return
                        }
                        this.setData({
                            openCardSuccess: true
                        })
                        // my.showToast({content: '开卡成功'});
                        
                        //保存用户信息
                        let userInfo = {}
                        userInfo.customerNo = result.customerNo
                        userInfo.cardNo = result.cardNo
                        
                        saveUserInfo(userInfo)

                        // my.redirectTo({
                        //     url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
                        // })
                    })

                    

                }else if(res.resultStatus == "6001"){
                    my.alert({content: '您取消了'})
                }
                
            },
            fail: (res) => {
                my.alert({content: '授权失败'}); my.alert({content: JSON.stringify(res)}); alertAndCopy(res);
            }, 
        });
    } else {
        my.alert({content: '当前 付宝钱包版本过低，需要升级后才可使 哦'});
    }
 
    },


});
