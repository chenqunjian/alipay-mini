
const { globalData } = getApp()

Page({
    data: {
        title: '退卡申请审核中',
        tip: null,
    },
    onLoad () {
        this.setData({
            tip: `我们将在${globalData.day}个工作日审核完毕后退款到您支付宝账户`
        })
    },
    back () { // 返回卡详情
        my.redirectTo({
          url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
        })
        // my.navigateBack({
        //   delta: 1
        // })
    }
})