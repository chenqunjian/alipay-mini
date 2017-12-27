Page({
  data: {
    money: 0
  },
  onLoad(query) {
    console.log(query)
    this.setData({
      money: query.money
    })
  },
});
