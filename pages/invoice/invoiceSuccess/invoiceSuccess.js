const app = getApp()
Page({
    data: {
        cusNavHeight: 0,
    },
    onLoad: function (options) {
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    invoiceHome() {
        wx.navigateTo({url: '/pages/invoice/invoiceIndex/invoiceIndex'})
    },
    invoiceHistory() {
        wx.navigateTo({url: '/pages/invoice/invoiceHistory/invoiceHistory'})
    }
});
