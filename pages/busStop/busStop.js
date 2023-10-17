const app = getApp()
import Toast from '@vant/weapp/toast/toast';

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
        showStop1: true,
        stop1: {},
        stop2: {},
        stop1List: [],
        stop2List: [],
        safeBottom: 0
    },
    onLoad: function (options) {
        // console.log(app.globalData.sysInfo)
        const {safeArea: {bottom}, windowHeight, screenHeight} = app.globalData.sysInfo
        this.setData({
            safeBottom: screenHeight - bottom
        })
    },
    onReady: function () {
        this.computeHeight()
        this.fakeData()
    },

    goBack() {
        app.defaultCustomNavClick()
    },
    fakeData() {
        let arr = []
        let arr2 = []
        const str = '法大师傅士大夫士大夫的答复是否发士大夫房贷首付'
        let len = str.length
        const randomStr = () => {
            const start = Math.floor(Math.random() * 10)
            return str.substring(start, Math.floor(Math.random() * len) + start)
        }
        for (let i = 0; i < 15; i++) {
            const obj = {}
            arr.push(obj)
            obj.title = `上车站点名称_${randomStr()}_${i}`
        }
        for (let i = 0; i < 14; i++) {
            const obj = {}
            arr2.push(obj)
            obj.title = `下车站点名称_${randomStr()}_${i}`
        }
        this.setData({
            stop1List: arr,
            stop2List: arr2,
        })
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.select('.custom-nav').boundingClientRect()
        query.select('.btn-wrapper').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            // debugger
            console.log(res)
            that.setData({
                mapHeight: res[2].height - res[0].height - that.data.safeBottom,
                cardHeight: res[1].top - res[0].height,
            })
        })
    },
    clickStop(e) {
        const stop = e.currentTarget.dataset.stop
        const isUp = e.currentTarget.dataset.up
        console.log(stop, isUp)
        if (isUp) {
            this.setData({stop1: stop})
        } else {
            this.setData({stop2: stop})
        }
    },
    confirmStop1() {
        const stopTitle = this.data.stop1.title
        if (stopTitle) {
            this.setData({
                showStop1: false
            })
        } else {
            Toast({duration: 2000, message: '请选择上车点'});
        }

    },
    gotoPage(e) {
        const stopTitle = this.data.stop2.title
        if (stopTitle) {
            app.navigate(e)
        } else {
            Toast({duration: 2000, message: '请选择下车点'});
        }
    }
});
