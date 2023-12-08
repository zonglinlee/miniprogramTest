const app = getApp()
Page({
    data: {
        cusNavHeight: 0,
        minMapHeight: 240,
        overflow: false,
        markers: [
            {
                id: 200,
                latitude: 39.90,
                longitude: 116.40,
                width: 20,
                height: 20,
                customCallout: {
                    display: 'ALWAYS'
                }
            }
        ],
        destination: {
            latitude: 39.90,
            longitude: 116.40,
        },
    },
    onLoad: function (options) {
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
    },
    cancelOrder() {
    },
    onReady() {
        this.computeHeight()
    },
    doPay() {
        setTimeout(() => {
            app.navigate('/pages/paymentResult/paymentResult')
        }, 2000)
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    computeHeight() {
        setTimeout(() => {
            const that = this
            const query = wx.createSelectorQuery()
            query.select('.card').boundingClientRect()
            query.select('.btn-group').boundingClientRect()
            query.selectViewport().boundingClientRect()
            query.exec(function (res) {
                const [card, btns, viewPort] = res
                let {cusNavHeight, minMapHeight} = that.data
                const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
                const safeBottom = screenHeight - bottom
                const overflow = cusNavHeight + minMapHeight + card.height + btns.height > viewPort.height - safeBottom
                if (!overflow) {
                    minMapHeight = viewPort.height - cusNavHeight - card.height - btns.height - safeBottom
                }
                that.setData({
                    overflow,
                    minMapHeight
                })
            })
        }, 200)
    }
});
