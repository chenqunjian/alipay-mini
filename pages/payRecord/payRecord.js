import {http} from '../../libs/http'
import {formatMoney} from '../../libs/utils'

Page({
  data: {
    page: 1,
    pageSize: 10,
    hasNextPage: true,
    isLoading: false, //正在请求接口
    recordList:[
      
    ],
    loading: false, // 实现显示加载中
    visible: false  //是否显示页面
  },

  onLoad() {
    // console.log(this.data.recordList.length)
    this.requestList()
  },
  onReachBottom(){
    console.log("onReachBottom" + this.data.page)
    if(this.data.isLoading){
      return
    }
    // this.setData({
    //   isLoading: true
    // })
    if (this.data.hasNextPage) {
      this.setData({
        loading: true
      })
      // my.showToast({content: '加载下一页...'})
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
      this.setData({
        visible: true
      })

      if(res.responseCode != "000000"){
        return
      }

      let recordList = this.data.recordList
      let showEmpty = res.resList.length

      let resList = this.formatRecord(res.resList)
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
      console.log(this.data.hasNextPage)
      console.log(this.data.page)

      this.sortRecord()


    })
  },
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
      // return a.date > b.date ? -1 : 1
      let aDate = new Date(a.transtime),
        bDate = new Date(b.transtime)
      return aDate.getTime() > bDate.getTime() ? -1 : 1

    })
    this.setData({
      recordList
    })
  },
  showDetail(event){
    console.log(event)
    let recordInfo = event.target.dataset.record
    console.log(recordInfo)
    let url = `/pages/payRecordDetail/payRecordDetail?money=${recordInfo.transamt}&date=${recordInfo.transtime}&orderSn=${recordInfo.transseq}`
    my.navigateTo({
      url
    });
  }
});
