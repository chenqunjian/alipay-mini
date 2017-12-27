Page({
  data: {
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
