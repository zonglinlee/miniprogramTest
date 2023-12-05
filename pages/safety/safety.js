const app = getApp()
Page({
    data: {},
    onLoad: function (options) {

    },
    goBack() {
        app.defaultCustomNavClick()
    },
    itemClick(e) {
        let imgurl = e.currentTarget.dataset.imgurl
        let title = e.currentTarget.dataset.title
        wx.navigateTo({url: `/pages/imagePage/imagePage?navTitle=${title}&imageUrl=${imgurl}`})
    }
});
