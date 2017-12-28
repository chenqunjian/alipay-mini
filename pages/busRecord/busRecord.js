Page({
  data: {
    page: 1,
    pageSize: 10,
    hasNextPage: true,
    isLoading: false, //正在请求接口
    recordList:[
      {
        money: 1.50,
        line: 506,
        date: '12-11 12:12'
      },
      {
        money: 1.50,
        line: 506,
        date: '12-12 12:12'
      },
      {
        money: 1.50,
        line: 506,
        date: '12-12 12:12'
      },
      {
        money: 1.50,
        line: 506,
        date: '11-12 12:12'
      },
      // {
      //   month: '12',
      //   recordInfo: [
      //     {
      //       money: 1.50,
      //       line: 506,
      //       date: '12-12 12:12'
      //     },
      //     {
      //       money: 1.50,
      //       line: 506,
      //       date: '12-12 12:12'
      //     },
      //     {
      //       money: 1.50,
      //       line: 506,
      //       date: '12-12 12:12'
      //     }
      //   ]
      // }
      
    ]
  },
  onLoad() {
    this.sortRecord()
    this.formatRecord()
  },
  // onLoad() {
  //   this.requestList()
  // },
  onReachBottom(){
    console.log("onReachBottom" + this.data.page)
    if(this.isLoading){
      return
    }
    this.setData({
      isLoading: true
    })
    if (this.data.hasNextPage) {
      my.showToast({content: '加载下一页...'})
      this.requestList();
    }
  },
  requestList(){
    let page = this.data.page
    let url = "/payRecord"
    let data = {
      page
    }
    http(url, data, 'POST').then((res)=>{

      let recordList = res.recordList

      this.setData({
        isLoading: false,
        page: page++,
        recordList
      })

      this.sortRecord()
      this.formatRecord()

    })


  },
  formatRecord(){
    let recordList = [], record = []
    let month = ''
    let find = 0;

    this.data.recordList.forEach((element) => {
      month = element.date.substring(0, 2)
      console.log(month)
      
      find = 0;
      recordList.forEach((item, key)=>{
        if(item.month == month){
          recordList[key]['recordInfo'].push(element)
          find = 1;
        }
      })
      if(find == 0){
        recordList.push({
          'month': month,
          'recordInfo':[
            element
          ]
        })
      }
      
    })
    console.log(recordList)
    this.setData({
      recordList
    })
  },
  sortRecord(){
    let recordList = this.data.recordList
    recordList.sort((a, b)=>{
      return a.date > b.date ? -1 : 1
    })
    this.setData({
      recordList
    })
  }
});
