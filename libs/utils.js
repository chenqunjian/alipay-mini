let app = getApp()

/**
 * 格式化金额
*/
export function formatMoney(money) {
    return (money / 100).toFixed(2)
}


export function saveUserInfo(userInfo) {
    app.globalData.userInfo = userInfo
    my.setStorage({
        key: 'user_info', // 缓存数据的 key
        data: {user_info: userInfo}, // 要缓存的数据
    })
}

export function getUserInfo() {
    if(app.globalData.userInfo){
        return app.globalData.userInfo
    }
    // return my.getStorageSync('user_info');
}


export function checkMobile(mobile){
    if(!(/^1[0-9]{10}$/.test(mobile))){
        return false;
    }
    return true
}

export function checkName(name){
    if(name == '' || name.length < 1 || name.length >5){
        return false
    }
    return true
}

export function checkIdcard(idcard){
    if(idcard == '' || idcard.length != 15 || idcard.length != 18){
        return false
    }
    return true
}

export function checkMobileCode(code){
    if(code == '' || code.length != 4){
        return false
    }
    return true
}