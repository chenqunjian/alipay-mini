App({
  onLaunch(){
    //客户编号
    let userCode = ''

    let data = my.getStorageSync({key: 'user_info'})
    if(data.data){
           
      this.globalData.userInfo = data.data.user_info
      console.log(this.globalData.userInfo)
      // my.alert({content: this.globalData.userInfo.cardNo});
      // my.alert({content: this.globalData.userInfo.customerNo});
    }
  },
  globalData: {
    userInfo: {
      customerNo: '',
      cardNo: ''
    },
    balance: 0,   //余额,
    cardReturning: false //正在退卡中
  }
});
