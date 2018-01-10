import {http} from '../../libs/http'
import {formatMoney} from '../../libs/utils'

Page({
  data: {
    page: 1,
    pageSize: 10,
    hasNextPage: true,
    isLoading: false, //正在请求接口
    loading: false, // 实现显示加载中
    recordList:[],
    visible: false  //是否显示页面
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
      isLoading: true,
      loading: true
    })
    if (this.data.hasNextPage) {
      my.showToast({
        content: '加载下一页...',
        duration: 1000
      })
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
      this.setData({
        visible: true
      })
      if(res.responseCode != "000000"){
        return
      }

      let recordList = this.data.recordList

      let resList = this.formatRecord(res.resList)
      console.log(resList)
      if(page == 1){
        recordList = resList
      }
      else {
      
        recordList.push(...resList);
      }
      
      let hasNextPage = true
      if(res.page == page){
        //最后一页
        hasNextPage = false        
      }

      page++
      this.setData({
        isLoading: false,
        page,
        recordList,
        hasNextPage,
      })

      this.sortRecord()
      // this.formatRecord()

    })
  },
  // mergeRecord(record1, record2){
  //   let recordList = []
  //   record1.forEach((element)=>{
  //     record2.forEach((item)=>{
  //       if(item.month == element.month){
          
  //       }
  //     })
  //   })

  // },
  // formatRecord(recordListIn){
  //   let recordList = [], recordListOut=[], recordInfo = {}
  //   let month = ''
  //   let find = 0;

  //   recordListIn.forEach((element) => {
  //     let transamt = formatMoney(element.transamt)
  //     recordInfo = {}
  //     recordInfo.transamt = transamt  //金额
  //     recordInfo.transtime = element.transtime  //日期

  //     month = recordInfo.transtime.substring(5, 7)
  //     console.log(month)
      
  //     find = 0;
  //     recordListOut.forEach((item, key)=>{
  //       if(item.month == month){
  //         recordListOut[key]['recordInfo'].push(recordInfo)
  //         find = 1;
  //       }
  //     })
  //     if(find == 0){
  //       recordListOut.push({
  //         'month': month,
  //         'recordInfo':[
  //           recordInfo
  //         ]
  //       })
  //     }
      
  //   })
  //   console.log(recordListOut)
  //   return recordListOut

  // },
  formatRecord(recordListIn){
    let recordInfo = {},recordListOut = []
    recordListIn.forEach((element)=>{
      recordInfo = {}
      let transamt = formatMoney(element.transamt)
      recordInfo.transamt = transamt    //金额
      recordInfo.transtime = element.transtime //交易时间
      recordInfo.transseq = element.transseq //订单号

      recordListOut.push(recordInfo)

    })
    return recordListOut
  },
  sortRecord(){
    let recordList = this.data.recordList
    recordList.sort((a, b)=>{
      // return a.date > b.date ? -1 : 1
      let aDate = new Date(a.transtime),
        bDate = new Date(b.transtime)
      return aDate.getTime() > bDate.getTime() ? -1 : 1

    })
    this.setData({
      recordList
    })
  }
});
