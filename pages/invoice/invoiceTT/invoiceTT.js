const app = getApp()
Page({
    data: {
        cusNavHeight: 0,
        ttList: [
            {
                companyName: '水水水水水水水水水水水水2',
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
                email: '123@qq.com',
            },
            {
                companyName: '水水水水水水水水水水水水3水水水水水水水水水水水水3水水水水水水水水水水水水3',
                default: true,
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
                email: '123@qq.com',
            },
        ],
        showDeleteDialog: false
    },
    goBack() {
        app.defaultCustomNavClick()
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
    closeDeleteDialog() {
        this.setData({
            showDeleteDialog: false
        })
    },
    doConfirm() {
        const index = this.deleteIndex
        this.data.ttList.splice(index, 1)
        const cell = this.selectComponent('.cell' + index);
        // console.log(cell, '.cell' + index)
        cell.close()
        this.setData({ttList: [...this.data.ttList]})
        this.closeDeleteDialog()
    },
    tapDel(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            showDeleteDialog: true
        })
        this.deleteIndex = index
    },
    setInvoice() {
        wx.navigateTo({url: '/pages/invoice/ttForm/ttForm'})
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
    },
    clickInvoiceItem(e) {
        const invoice = e.currentTarget.dataset.invoice
        wx.navigateTo({
            url: '/pages/invoice/ttForm/ttForm',
            events: {},
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', {invoice})
            }
        })
    }
});
