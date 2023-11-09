const app = getApp()
Page({
    data: {
        cusNavHeight: 0,
        listHeight: 0,
        showMore: false,
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
    showMoreClick() {
        this.setData({
            showMore: !this.data.showMore
        })
    },
    goInvoiceOrder() {
        wx.navigateTo({url: '/pages/invoice/invoiceOrder/invoiceOrder'})
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.select('.btn-wrapper').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            that.setData({
                listHeight: res[1].height - app.globalData.cusNavHeight - res[0].height - safeBottom,
            })
        })
    }
});
