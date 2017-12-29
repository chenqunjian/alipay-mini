Page({
  data: {
    searchData: '',
    lineList:[
      {
        number: '907',
        start: '纺织城火车站',
        end: '新合',
      },
      {
        number: 'X101',
        start: '昆明路·富源二路口',
        end: '阿房宫高铁站',
      },
      {
        number: 'X102',
        start: '劳动路',
        end: '公园南路北口',
      },
      {
        number: '611',
        start: '火车站',
        end: '汉城路',
      }
      
    ]
  },
  onLoad() {

  },
  searchLine (e) {
    this.setData({ searchData: e.detail.value })
    
    const setData = this.setData
    const searchData = this.data.searchData
    const lineList = this.data.lineList
    const historyLineList = lineList
    let arr = []

    for (let i = 0; i < lineList.length; i++) {
       if (lineList[i].number.indexOf(searchData) === 0) {
            arr.push(lineList[i])
       }
    }
    
    setData({ searchLineData: arr })
    this.data.searchLineData.length === 0 ? setData({ isValue: true }) : setData({ isValue: false })
  }
});
