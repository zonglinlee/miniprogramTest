const app = getApp()
Page({
    data: {
        coupons: [{
            title: '8.5折优惠券',
            discount: '8.5',
            maxDiscount: 20,
            tags: ['舒适型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型'],
            expires: '2023/10/11-2023/11/25',
            timeRange: '全国 全时段通用',
        }, {
            title: '5折优惠券',
            discount: '5',
            maxDiscount: 20,
            tags: ['舒适型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型'],
            expires: '2023/10/11-2023/11/25',
            timeRange: '全国 全时段通用',
        }],
        coupons1: [],
        coupons2: [{
            title: '8.5折优惠券',
            discount: '8.5',
            maxDiscount: 20,
            tags: ['舒适型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型', '商务型'],
            expires: '2023/10/11-2023/11/25',
            timeRange: '全国 全时段通用',
        }],
        show: false,
        show1: false,
        infoHeight: 0,
        screenHeight: 0,
        tabHeight: 0,
        couponsType: '2',// 1 为未使用，2为已使用或者已过期
    },
    onLoad: function (options) {

    },
    goBack() {
        app.defaultCustomNavClick()
    },
    onClose() {
        if (this.data.couponsType === '1') {
            this.setData({
                show: false
            })
        }
        if (this.data.couponsType === '2') {
            this.setData({
                show: false,
                show1: true
            })
        }
    },
    onClose1() {
        this.setData({show1: false})
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.selectAll('.c-height').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            const total = res[0].reduce((acc, nodeInfo) => acc + nodeInfo.height, 0)
            console.log(res)
            that.setData({screenHeight: res[1].height, infoHeight: res[1].height - total - safeBottom})
        })
    },
    computeHeight1() {
        const that = this
        const query = wx.createSelectorQuery()
        query.selectAll('.c-height1').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            console.log(res)
            const total = res[0].reduce((acc, nodeInfo) => acc + nodeInfo.height, 0)
            that.setData({screenHeight: res[1].height, tabHeight: res[1].height - total - 44 - safeBottom})
        })
    },
    showDetail(e) {
        const item = e.currentTarget.dataset.item
        console.log(item)
        this.setData({
            show: true,
            show1: false,
            couponsType: '1'
        })
        wx.nextTick(() => {
            setTimeout(() => {
                this.computeHeight()
            }, 200)
        })
    },
    showDetail1(e) {
        const item = e.currentTarget.dataset.item
        console.log(item)
        this.setData({
            show: true,
            show1: false,
            couponsType: '2'
        })
        wx.nextTick(() => {
            setTimeout(() => {
                this.computeHeight()
            }, 200)
        })
    },
    useCoupons() {
    },
    checkExpires() {
        this.setData({
            show1: true
        })
        if (this.data.tabHeight === 0) {
            wx.nextTick(() => {
                setTimeout(() => {
                    this.computeHeight1()
                }, 200)
            })
        }
    }
});
