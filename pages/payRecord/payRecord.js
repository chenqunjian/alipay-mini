import {http} from '../../libs/http'
import {formatMoney} from '../../libs/utils'

Page({
  data: {
    page: 1,
    pageSize: 10,
    hasNextPage: true,
    isLoading: false, //正在请求接口
    recordList:[]
  },

  onLoad() {
    this.requestList()
  },
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
    let url = "/queryUserChargeRecordList"
    let data = {
      page
    }
    http(url, data, 'POST').then((res)=>{
      if(res.responseCode != "000000"){
        return
      }

      let recordList = res.resList

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
    let recordInfo = {},recordList = []
    this.data.recordList.forEach((element)=>{
      let money = formatMoney(element.transamt)
      recordInfo.money = money
      recordInfo.date = element.transtime
      recordInfo.orderSn = element.transseq //订单号

      recordList.push(recordInfo)
    })
    console.log(recordList)
    this.setData({
      recordList
    })
  },
  // formatRecord(){
  //   let recordList = [], record = []
  //   let month = ''
  //   let find = 0;

  //   this.data.recordList.forEach((element) => {
  //     month = element.date.substring(0, 2)
  //     console.log(month)
      
  //     find = 0;
  //     recordList.forEach((item, key)=>{
  //       if(item.month == month){
  //         recordList[key]['recordInfo'].push(element)
  //         find = 1;
  //       }
  //     })
  //     if(find == 0){
  //       recordList.push({
  //         'month': month,
  //         'recordInfo':[
  //           element
  //         ]
  //       })
  //     }
      
  //   })
  //   console.log(recordList)
  //   this.setData({
  //     recordList
  //   })
  // },
  sortRecord(){
    let recordList = this.data.recordList
    recordList.sort((a, b)=>{
      return a.date > b.date ? -1 : 1
    })
    this.setData({
      recordList
    })
  },
  showDetail(event){
    console.log(event)
    let recordInfo = event.target.dataset
    console.log(recordInfo)
    let url = `/pages/payRecordDetail/payRecordDetail?
              money=${recordInfo.money}&
              date=${recordInfo.date}&
              orderSn=${recordInfo.orderSn}`
    my.navigateTo({
      url
    });
  }
});
