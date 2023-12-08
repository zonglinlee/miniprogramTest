const app = getApp()
Page({
    data: {
        lines: [],
        selectedLine: null,
        scrollViewHeight: 800
    },
    onLoad: function (options) {
        const lines = []
        for (let i = 0; i < 12; i++) {
            lines.push({
                label: '宁夏精细化工通勤车',
                No: 'TQC999',
                from: '银川火车站',
                to: '大武口城东长途汽车站',
                departureTime: '2023-03-02 16:25',
                price: '75.00',
                type: '豪华大巴'
            })
        }
        this.setData({lines})
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    onReady() {
        this.computeHeight()
    },
    gotoPage(e) {
        const selectedLine = e.currentTarget.dataset.item
        this.setData({selectedLine})
        app.globalData.currentOrder.orderType = 'dedicateLine'
        app.globalData.currentOrder.selectedLine = selectedLine
        app.globalData.orderOngoing = true
        app.navigate(e)
    }
    ,
    computeHeight() {
        setTimeout(() => {
            const that = this
            const query = wx.createSelectorQuery()
            query.select('.tab').boundingClientRect()
            query.select('.top').fields({
                computedStyle: ['padding-top', 'backgroundColor'],
            })
            query.selectViewport().boundingClientRect()
            query.exec(function (res) {
                const [tab, topFields, viewPort] = res
                const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
                const safeBottom = screenHeight - bottom
                let gap = 5
                const scrollViewHeight = viewPort.height - tab.bottom - safeBottom - gap
                that.setData({
                    scrollViewHeight,
                })
            })
        }, 500)
    }
});
