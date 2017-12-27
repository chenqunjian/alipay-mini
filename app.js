App({
  onLaunch(){
    //客户编号
    let userCode = ''
    my.getStorage({
      key: 'user_info', // 缓存数据的 key
      success: (res) => {
        let data = res.data
        if(data){
          this.globalData.userCode = data.user_code
          this.globalData.cardNo = data.card_no
        }
      },
    })

  },
  userInfo: null,
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);

      my.getAuthCode({
        scopes: ['auth_user'],
        success: (authcode) => {
          console.info(authcode);

          my.getAuthUserInfo({
            success: (res) => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
  globalData: {
    userInfo: {
      status: ''
    },
    userCode: '',
    cardNo: '',

  }
});
