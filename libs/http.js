import {serverConfig} from './config';
import {getUserInfo} from './utils'

export function http(url, data, method) {

    return new Promise((resolve, reject)=>{
        my.showLoading({
            content: '加载中...',
            delay: 10,
        });
        let userInfo = getUserInfo()
        // userInfo = {
        //     cardNo: "7100400000000083",
        //     customerNo: "20171226000000020597"
        // }

        if(userInfo && userInfo.cardNo && userInfo.customerNo){
            data = {
                ...userInfo,
                ...data
            }
        }
        console.log(data)
        my.httpRequest({
            url: serverConfig.gatewayServer + url,
            method: method,
            data: data,
            dataType: 'json',
            success: (res) => {
                my.hideLoading();
                
                resolve(res.data)
            },
            fail: (res) => {
                console.log(res)
                my.alert({
                    title: '网络错误',
                    content: res.errorMessage
                });
                my.hideLoading();
                reject(res)
            }
        });
    })
    
}