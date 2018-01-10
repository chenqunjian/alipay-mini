const { globalData } = getApp()
Page({
  data: {
    searchData: '',
    searchLineList: [],
    isNull: false,
    nullTip: '该线路未开通手机支付,敬请期待',
    lineList:[]
  },
  onLoad () {
      this.setData({
          lineList: globalData.lineList
      })
  },
  handleSearch ({ detail }) {
      this.setData({ searchData: detail.value }) 

      const { searchData, lineList } = this.data
      const arr = []
      
      lineList.map((item) => {
          if (item.name.indexOf(searchData) === 0) arr.push(item)
      })

      this.setData({ searchLineList: arr })
      this.data.searchLineList.length === 0 ? this.setData({ isNull: true }) : this.setData({ isNull: false })
      console.log(this.data.isNull)
  },
  clearSearch () {
      this.setData({ searchData: '', isNull: false })
  }
});
