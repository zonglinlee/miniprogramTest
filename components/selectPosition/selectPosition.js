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
                // iconPath: '../../assets/images/start_position.png',
                // iconPath: '../../assets/images/select_position.svg',
                iconPath: 'http://s1dkzsmpj.hb-bkt.clouddn.com/select_position.png',
                width: 20,
                height: 20,
                customCallout: {
                    display: 'ALWAYS'
                }
            }
        ],
        currentPosition: {
            latitude: 39.90,
            longitude: 116.40,
            locationAdd: '获取位置中...',
            markerAdd: '获取位置中...'
        },
        mapHeight: 200,
        suggestList: [],
        currentCity: '银川市',
        searchKeyword: '银川市',
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
        'show': function (show) {
            if (show) {
                this.computeHeight()
                wx.nextTick(async () => {
                    if (this.data.isStart) {
                        const pos = await wx.getLocation({type: 'gcj02'})
                        const res = await this.latToAddress(pos)
                        if (res.status === 0) {
                            const {location: {lat, lng}, formatted_addresses: {recommend}, address} = res.result
                            const marker = this.data.markers[0]
                            marker.latitude = lat
                            marker.longitude = lng
                            this.setData({
                                currentPosition: {
                                    latitude: lat,
                                    longitude: lng,
                                    locationAdd: recommend,
                                    markerAdd: recommend
                                },
                                markers: [marker]
                            })
                        }
                    } else {
                        const res = await this.suggest(this.data.currentCity, this.data.currentCity)
                        this.setData({suggestList: res})
                    }
                })
            }
        }
    },
    methods: {
        goBack() {
            this.setData({suggestList: [], searchKeyword: ''})
            this.triggerEvent('closeSelectPositionPopup')
        },
        confirmStartPosition() {
            const {latitude, longitude} = this.data.markers[0]
            const detail = {
                latitude,
                longitude,
                markerAdd: this.data.currentPosition.markerAdd,
                isStart: this.data.isStart
            }
            this.setData({suggestList: []})
            this.triggerEvent('closeSelectPositionPopup', detail)
        },
        async getClickPoint(pos) {
            console.log("点击地图:", pos)
            try {
                const res = await this.latToAddress(pos.detail)
                if (res.status === 0) {
                    const {location: {lat, lng}, formatted_addresses: {recommend}, address} = res.result
                    const marker = this.data.markers[0]
                    marker.latitude = lat
                    marker.longitude = lng
                    this.setData({
                        markers: [marker],
                        currentPosition: Object.assign({}, this.data.currentPosition, {markerAdd: recommend})
                    })
                }
            } catch (e) {
                console.error(e)
            }
        },
        async bindKeyInput(e) {
            const val = e.detail.value
            try {
                if (val) {
                    const res = await this.suggest(val, this.data.currentCity)
                    console.log(res)
                    this.setData({suggestList: res})
                } else {
                    this.setData({suggestList: []})
                }
            } catch (e) {
                console.error(e)
            }

        },
        chooseRecommendPosition(e) {
            const pos = e.currentTarget.dataset.pos
            const {latitude, longitude, title, addr, city} = pos
            const detail = {
                latitude,
                longitude,
                isStart: this.data.isStart
            }
            if (this.data.isStart) {
                detail.markerAdd = title
            } else {
                detail.locationAddEnd = title
            }
            this.triggerEvent('closeSelectPositionPopup', detail)
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
