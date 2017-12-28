import {http} from '../../libs/http'
import {formatMoney} from '../../libs/utils'

Page({
  data: {
    page: 1,
    pageSize: 10,
    hasNextPage: true,
    isLoading: false, //正在请求接口
    recordList:[
      // {
      //   money: 1.50,
      //   line: 506,
      //   date: '12-11 12:12'
      // },
      // {
      //   money: 1.50,
      //   line: 506,
      //   date: '12-12 12:12'
      // },

    ]
  },
  // onLoad() {
  //   this.sortRecord()
  //   this.formatRecord()
  // },
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
    let url = "/queryUserConsumeRecordList"
    let data = {
      page
    }
    http(url, data, 'POST').then((res)=>{

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
    let recordList = [], recordInfo = {}
    let month = ''
    let find = 0;

    this.data.recordList.forEach((element) => {
      let money = formatMoney(element.transamt)
      recordInfo.money = money
      recordInfo.date = element.transtime

      
      month = recordInfo.date.substring(0, 2)
      console.log(month)
      
      find = 0;
      recordList.forEach((item, key)=>{
        if(item.month == month){
          recordList[key]['recordInfo'].push(recordInfo)
          find = 1;
        }
      })
      if(find == 0){
        recordList.push({
          'month': month,
          'recordInfo':[
            recordInfo
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
