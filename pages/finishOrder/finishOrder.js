const app = getApp()
Page({
    data: {
        contentHeight: 0,
        cardHeight: 0,
        markers: [
            {
                id: 200,
                latitude: 39.90,
                longitude: 116.40,
                // iconPath: '../../assets/images/select_position.svg',
                // iconPath: 'http://s2z4nayoc.hb-bkt.clouddn.com/select_position.png',
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
        winHeight: app.globalData.sysInfo.windowHeight,
        maHeight: 0,
        mvDistance: 0
    },
    onLoad: function (options) {

    },
    onReady() {
        setTimeout(() => {
            this.computeHeight()
        }, 500)
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    computeHeight() {
        // console.log()
        const that = this
        const query = wx.createSelectorQuery()
        query.select('.cards').boundingClientRect()
        query.selectAll('.c-height').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            console.log(res)
            const [cards, cHeight, viewPort] = res
            const total = res[1].reduce((acc, nodeInfo) => acc + nodeInfo.height, 0)
            const mvDistance = res[0].bottom - viewPort.height
            const winHeight = that.data.winHeight
            that.setData({
                // contentHeight: res[2].height - res[1][0].height - safeBottom,
                contentHeight: res[2].height/2,
                cardHeight: res[0].height,
                maHeight: res[0].height + mvDistance + winHeight * 0.48,
                mvDistance
            })
        })
    },
    noop() {
    },
    async moveCard(e) {
        // const res = await app.computeRec('.mv')
        // this.setData({
        //     mvOffsetTop: res[0].top,
        //     showBg: res[0].top <= 60
        // })
    },
    moveCardV(e) {
    },
    goEvaluate() {
        wx.navigateTo({url: '/pages/evaluateOrder/evaluateOrder'})
    }
});
