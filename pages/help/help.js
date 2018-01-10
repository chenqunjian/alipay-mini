const { globalData } = getApp()

Page({
    data: {
        helpData: null
    },
    onLoad () {
        globalData.helpData.panels.map((item) => {
            item.expanded = false
        })
        this.setData({
            helpData: globalData.helpData
        })
    },
    handleTitleTap (e) {
        const { index } = e.target.dataset;
        const panels = this.data.helpData.panels;
        // android does not supprt Array findIndex
        panels[index].expanded = !panels[index].expanded;
        this.setData({ helpData: {...this.data.helpData, panels: [...panels]} });
    }
})