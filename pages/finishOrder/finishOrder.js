const app = getApp()
Page({
    data: {
        cusNavHeight: 0,
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
        this.setData({
            cusNavHeight: app.globalData.sysInfo.statusBarHeight + 46
        })
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
        const that = this
        const query = wx.createSelectorQuery()
        query.select('.cards').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const [cardHeight, viewPort] = res
            const winHeight = that.data.winHeight
            const navHeight = that.data.cusNavHeight
            const mapHeight = viewPort.height/2
            const pageContentHeight = navHeight + mapHeight + cardHeight.height
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            // console.log(res)
            const mvDistance = pageContentHeight > viewPort.height ? pageContentHeight - viewPort.height : 0
            that.setData({
                // contentHeight: viewPort.height - res[1][0].height - safeBottom,
                contentHeight: mapHeight,
                cardHeight: cardHeight.height,
                maHeight: mvDistance > 0 ? cardHeight.height + mvDistance : cardHeight.height,
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
