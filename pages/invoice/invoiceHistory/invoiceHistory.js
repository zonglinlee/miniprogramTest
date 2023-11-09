const app = getApp()
Page({
    data: {
        cusNavHeight: 0,
        listHeight: 0,
        invoiceHistory: [
            {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区宁夏迪安乐嘉医学检验中心有限责任公司（五里台路口）',
                to: '银川科技厅1',
                price: 45.00
            }, {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }, {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }, {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }, {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }, {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }, {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }, {
                type: '定制班线',
                createTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }
        ]
    },
    onLoad: function (options) {
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
    },
    onReady() {
        setTimeout(() => {
            this.computeHeight()
        }, 500)
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        // query.select('.btn-wrapper').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            that.setData({
                listHeight: res[0].height - app.globalData.cusNavHeight - safeBottom,
            })
        })
    },
    checkDetail(e) {
        wx.navigateTo({url: "/pages/invoice/invoiceHistoryDetail/invoiceHistoryDetail"})
    }
});
