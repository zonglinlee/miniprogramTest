const app = getApp()
Page({
    data: {
        showPopup: false,
        agreement: true,
        passengerList: []
    },
    onLoad: function (options) {

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
    toggleAgreement(){
        const agreement = !this.data.agreement
        this.setData({agreement})
    }
});
