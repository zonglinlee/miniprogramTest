const app = getApp()
Page({
    data: {
        cardHeight: 300,
        mapHeight: 300,
        markers: [
            {
                id: 300,
                latitude: 39.90,
                longitude: 116.40,
                // iconPath: '../../assets/images/select_position.svg',
                // iconPath: 'http://s1dkzsmpj.hb-bkt.clouddn.com/select_position.png',
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
    onReady: function () {
        this.computeHeight()
    },

    goBack() {
        app.defaultCustomNavClick()
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.select('.custom-nav').boundingClientRect()
        query.select('.btn-wrapper').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const sysInfo = wx.getSystemInfoSync()
            // debugger
            console.log(res)
            that.setData({
                mapHeight: res[2].height - res[0].height,
                cardHeight: res[1].top - res[0].height,
            })
        })
    }
});
