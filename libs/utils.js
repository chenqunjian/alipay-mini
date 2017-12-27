
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