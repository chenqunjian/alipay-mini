import {serverConfig} from './config';

export function http(url, data, method) {

    return new Promise((resolve, reject)=>{
        // my.showLoading({
        //     content: '加载中...',
        //     delay: 500,
        // });
        my.httpRequest({
            url: serverConfig.gatewayServer + url,
            method: method,
            data: data,
            dataType: 'json',
            success: (res) => {
                // my.hideLoading();
   
                resolve(res.data.data)
            },
            fail: (res) => {
                console.log(res)
                my.alert({
                    title: '网络错误',
                    content: res
                });
                // my.hideLoading();
                reject(res)
            }
        });
    })
    
}