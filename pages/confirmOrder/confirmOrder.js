const app = getApp()
Page({
    data: {
        showPopup: false,
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
    }
});
