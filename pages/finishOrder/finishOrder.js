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
    },
    onLoad: function (options) {

    },
    onReady() {
        this.computeHeight()
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.selectAll('.c-height').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            console.log(res)
            const total = res[0].reduce((acc, nodeInfo) => acc + nodeInfo.height, 0)
            that.setData({
                contentHeight: res[1].height - res[0][0].height - safeBottom,
                cardHeight: res[1].height - total - 120 - safeBottom,
            })
        })
    }
});
