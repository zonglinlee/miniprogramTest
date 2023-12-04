const app = getApp()
Page({
    data: {},
    onLoad: function (options) {

    },
    gotoEvaluate() {
        const url = ""
        const id = ""
        wx.navigateTo({url: `${url}?id=${id}`})
    },
    goBack() {
        app.defaultCustomNavClick()
    },
});
