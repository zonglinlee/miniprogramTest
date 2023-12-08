const app = getApp()
Page({
    data: {
        showPopup: false,
        agreement: true,
        passengerList: [],
        cusNavHeight: 0,
    },
    onLoad: function (options) {
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
    },
    openPopup() {
        this.setData({
            showPopup: true
        })
    },
    gotoPage(e) {
        app.navigate(e)
    },
    getSelectedPassenger(e) {
        console.log(e)
        const selectedPassenger = e.detail.selectedPassenger
        this.setData({
            showPopup: false,
            passengerList: selectedPassenger
        })
    },
    toggleAgreement() {
        const agreement = !this.data.agreement
        this.setData({agreement})
    },
    deletePassenger(e) {
        const item = e.currentTarget.dataset.item
        const passengerList = this.data.passengerList.filter(_item => item.idCard !== _item.idCard)
        this.setData({
            passengerList
        })
    }
});
