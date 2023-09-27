const mapBehavior = require("../../assets/js/qqmap-wx-jssdk1.2/mapBehavior")
Component({
    properties: {
        show: Boolean,
        isStart: Boolean
    },
    behaviors: [mapBehavior],
    data: {
        polyline: [],
        includePoints: [],
        markers: [
            {
                id: 100,
                latitude: 39.90,
                longitude: 116.40,
                title: '上车点',
                // iconPath: '../../assets/images/start_position.png',
                iconPath: '../../assets/images/select_position.svg',
                callout: {
                    content: "上车点",
                    bgColor: "#ffffff",
                    textAlign: 'center',
                    borderRadius: '4rpx',
                    padding: '4rpx'
                }
            }
        ],
        currentPosition: {
            latitude: 39.90,
            longitude: 116.40,
        },
        mapHeight: 200,
        suggestList: [],
        currentCity: '银川市',
    },
    lifetimes: {
        async created() {
            // const res = await this.getCityList()
            // console.log(res)
        },
        attached() {
            // this.computeHeight()
        }
    },
    pageLifetimes: {
        show() {

        }
    },
    observers: {
        'show': async function (show) {
            if (show) {
                this.computeHeight()
                if (this.data.isStart) {
                    const res = await wx.getLocation({type: 'gcj02'})
                    this.setData({currentPosition: res})
                    const marker = this.data.markers[0]
                    marker.latitude = res.latitude
                    marker.longitude = res.longitude
                    this.setData({markers: [marker]})
                }
            }
        }
    },
    methods: {
        onClose() {
            this.triggerEvent('closeSelectPositionPopup', {})
        },
        goBack() {
            this.triggerEvent('closeSelectPositionPopup', {})
        },
        getClickPoint(res) {
            console.log("点击地图:", res)
            const marker = this.data.markers[0]
            marker.latitude = res.detail.latitude
            marker.longitude = res.detail.longitude
            this.setData({markers: [marker]})
        },
        async bindKeyInput(e) {
            const val = e.detail.value
            if (val) {
                const res = await this.suggest(val, this.data.currentCity)
                console.log(res)
                this.setData({suggestList: res})
            } else {
                this.setData({suggestList: []})
            }
        },
        computeHeight() {
            // const query = wx.createSelectorQuery()
            const that = this
            const query = wx.createSelectorQuery().in(this)
            query.select('.container').boundingClientRect()
            query.selectAll('.c-height').boundingClientRect()
            query.selectViewport().boundingClientRect()
            query.exec(function (res) {
                const sysInfo = wx.getSystemInfoSync()
                // debugger
                const total = res[1].reduce((acc, nodeInfo) => acc + nodeInfo.height, 0)
                console.log(res, sysInfo, res[2].height - total)
                that.setData({mapHeight: res[2].height - total})
            })
        }
    }
});
