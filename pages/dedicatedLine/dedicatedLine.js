const app = getApp()
Page({
    data: {},
    onLoad: function (options) {

    },
    goBack() {
        app.defaultCustomNavClick()
    },
    gotoPage(e) {
        app.navigate(e)
    }
});
