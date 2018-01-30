import { serverConfig } from './config';
import { getUserInfo } from './utils'

export function http(url, data, method, showLoading = true) {
    return new Promise((resolve, reject) => {
        if (showLoading) {
            my.showLoading({
                content: '加载中...',
                delay: 1000,
            });
        }
        let userInfo = getUserInfo()
        // userInfo = {
        //     cardNo: "7100400000000083",
        //     customerNo: "20171226000000020597"
        // }

        if (userInfo && userInfo.cardNo && userInfo.customerNo) {
            data = {
                ...userInfo,
                ...data
            }
        }
        console.log('userInfo:' + JSON.stringify(data))
        my.httpRequest({
            url: serverConfig.gatewayServer + url,
            method: 'POST',
            data: data,
            dataType: 'json',
            // timeout: 5000,
            success: (res) => {

                // console.log("http response:"+JSON.stringify(res.data))
                my.hideLoading();

                if (res.data.responseCode == '900000') {
                    //系统请求异常
                    my.navigateTo({
                        url: '/pages/errorPage/errorPage'
                    })
                    reject(res.data)
                }
                else if (res.data.responseCode == '800000') {
                    //请求访问过大
                    my.navigateTo({
                        url: '/pages/errorPage/errorPage'
                    })
                    reject(res.data)
                } else {
                    resolve(res.data)
                }

            },
            fail: (res) => {
                console.log(res)
                my.alert({
                    // title: '服务器繁忙',
                    content: '服务器繁忙',
                    //content: res.errorMessage
                });
                my.hideLoading();
                reject(res)
            }
        });
    })

}