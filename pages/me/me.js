// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [{
            label: '全部订单',
            key: 'order',
            src: '../../assets/images/order.png',
        }, {
            label: '待支付',
            key: 'wait_pay',
            src: '../../assets/images/wait_pay.png',
        }, {
            label: '待出行',
            key: 'red_car',
            src: '../../assets/images/red_car.png',
        }, {
            label: '待评价',
            key: 'wait_evaluate',
            src: '../../assets/images/wait_evaluate.png',
        }, {
            label: '退货/售后',
            key: 'refund',
            src: '../../assets/images/refund.png',
        }],
        tools: [{
            label: '活动',
            key: 'activity',
            src: '../../assets/images/activity.png',
        }, {
            label: '发票中心',
            key: 'invoice',
            src: '../../assets/images/invoice.png',
        }, {
            label: '优惠券',
            key: 'coupons',
            src: '../../assets/images/coupons.png',
        }, {
            label: '常用乘车人',
            key: 'passenger',
            src: '../../assets/images/passenger.png',
        }, {
            label: '紧急联系人',
            key: 'emergency',
            src: '../../assets/images/emergency.png',
        }, {
            label: '意见反馈',
            key: 'feedback',
            src: '../../assets/images/feedback.png',
        }, {
            label: '约车规则',
            key: 'rule',
            src: '../../assets/images/rule.png',
            imgUrl: "http://s1dkzsmpj.hb-bkt.clouddn.com/temp/test.png",
        }, {
            label: '联系客服',
            key: 'customer_service',
            src: '../../assets/images/customer_service.png',
        }]
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

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
    }
})
