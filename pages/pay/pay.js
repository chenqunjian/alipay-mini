Page({
  data: {
    payList: [
      {money: 10, checked: 1},
      {money: 20, checked: 0},
      {money: 30, checked: 0},
      {money: 50, checked: 0},
      {money: 100, checked: 0},
      {money: 200, checked: 0},
    ],
    // money: 10
  },
  onLoad() {},
  pay(e){
      let money = e.target.dataset.money;
      console.log('select money:' + money);
      let payList = this.data.payList;
      for (let index = 0; index < payList.length; index++) {
          
          if(money == payList[index]['money']){
              payList[index]['checked'] = 1;
          }else{
              payList[index]['checked'] = 0;
          }
      }
      this.setData({
          payList
      })
      console.log(this.data.payList)
      my.redirectTo({
        url: '/pages/payResult/payResult?money='+money
      });
    }
});
