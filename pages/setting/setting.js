const app = getApp()
Page({
    data: {
        show: false
    },
    onLoad: function (options) {

    },
    orderItemClick(e) {
        let item = e.currentTarget.dataset.item
        console.log(item)
        if (item.imgUrl) {
            wx.navigateTo({url: `/pages/imagePage/imagePage?navTitle=${item.label}&imageUrl=${item.imgUrl}`})
        }
        wx.showToast({
            title: item.label,
            icon: 'success',
            duration: 500
        })
    },
    gotoPage(e) {
        app.navigate(e)
    },
    cancel() {
        this.setData({
            show: false
        })
    },
    openPopup() {
        this.setData({
            show: true
        })
    },
    makePhoneCall(e) {
        const number = e.currentTarget.dataset.number
        wx.makePhoneCall({phoneNumber: number})
    }
});
