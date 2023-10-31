const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        refresh: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const that = this
        const query1 = wx.createSelectorQuery()
        query1.select('.ss').boundingClientRect()
        // query1.select('.tab-wrapper .van-tabs__nav').boundingClientRect()
        query1.exec(function (res) {
            that.setData({
                navHeight: res[0].height
            })
        })


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.setData({refresh: true})
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onClickLeft() {
        wx.showToast({title: '点击返回', icon: 'none'});
    },
    onClickRight() {
        wx.showToast({title: '点击按钮', icon: 'none'});
    },
    orderListClick(e) {
        console.log(e.detail)
    },
    goBack() {
        app.defaultCustomNavClick()
    },
})
