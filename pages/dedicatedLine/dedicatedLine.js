const app = getApp()
Page({
    data: {
        lines: [],
        selectedLine: null
    },
    onLoad: function (options) {
        const lines = []
        for (let i = 0; i < 12; i++) {
            lines.push({
                from: '大武口城东长途汽车站',
                to: '大武口城东长途汽车站',
                departureTime: '2023-03-02 16:25',
                price: '75.00',
            })
        }
        this.setData({lines})
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    gotoPage(e) {
        const selectedLine = e.currentTarget.dataset.item
        this.setData({selectedLine})
        app.globalData.currentOrder.orderType = 'dedicateLine'
        app.globalData.currentOrder.selectedLine = selectedLine
        app.globalData.orderOngoing = true
        app.navigate(e)
    }
});
