const app = getApp()
Component({
    properties: {
        linePoints: {
            type: Array
        },
        carInfo: {
            type: Object
        },
        runningCarInfo: {
            type: Array
        }
    },
    data: {
        mapHeight: 0,
        mt: 0,
        showMap: false,
        includePoints: [],
        polyline: [],
        markers: [],
        markerInfo: {
            title: "4 分钟抵达",
            subtitle: "宁安大街"
        },
        mapContext: null,
        mapCenter: {latitude: '', longitude: ''}
    },
    observers: {
        'linePoints': function (points) {
            let len = points.length
            let {latitude, longitude} = points[0]
            let {latitude: latitudeEnd, longitude: longitudeEnd} = points[len - 1]
            let markers = []
            markers[0] = {
                id: 1,
                latitude,
                longitude,
                title: '起点',
                width: 20,
                height: 20,
                callout: {
                    content: `起`,
                    display: 'ALWAYS',
                    textAlign: 'center',
                    color: '#ffffff',
                    bgColor: '#529b2e',
                    borderRadius: 6,
                    padding: 6,
                    fontSize: 12,
                }
            }
            markers[1] = {
                id: 2,
                latitude: latitudeEnd,
                longitude: longitudeEnd,
                title: '终点',
                width: 20,
                height: 20,
                callout: {
                    content: `终`,
                    display: 'ALWAYS',
                    textAlign: 'center',
                    color: '#ffffff',
                    bgColor: '#529b2e',
                    borderRadius: 6,
                    padding: 6,
                    fontSize: 12,
                }
            }
            const commonInfo = {
                iconPath: "./bus-top-view-icon.png",
                width: 10,
                height: 28,
            }
            for (let i = 0; i < this.data.runningCarInfo.length; i++) {
                const {latitude, longitude, closest, time} = this.data.runningCarInfo[i]
                const rotate = this.computeDiff(latitude, longitude)
                // console.log("rotate:", rotate)
                if (closest) {
                    this.setData({
                        markerInfo: {
                            title: `${time} 分钟抵达`,
                            subtitle: "站点名称"
                        }
                    })
                    markers.push({
                        ...commonInfo, rotate, latitude, longitude, id: 99, zIndex: 9999999,
                        callout: {
                            content: `${time} 分钟抵达/银川火车站`,
                            display: 'ALWAYS',
                            textAlign: 'center',
                            color: '#ff0000',
                            bgColor: '#ffffff',
                            borderRadius: 20,
                            padding: 6,
                            fontSize: 12,
                        },
                        // customCallout: {
                        //     display: 'ALWAYS'
                        // }
                    })
                } else {
                    markers.push({...commonInfo, rotate, latitude, longitude, id: i + 3})
                }

            }
            // console.log(points)
            this.setData({
                includePoints: points,
                polyline: [{
                    points: points,
                    color: '#FF0000DD',
                    width: 3
                }],
                markers
            })
        },
    },
    lifetimes: {
        ready() {
            const {safeArea: {bottom, top}, windowHeight, screenHeight} = app.globalData.sysInfo
            this.setData({
                mapHeight: bottom,
                mt: top
            })
        }
    },
    methods: {
        clickMap() {
            this.setData({
                showMap: true,
            }, () => {
                this.setData({
                    mapContext: wx.createMapContext('mymap', this)
                }, () => {
                    this.computeDiff()
                    this.toggleRouteView()
                })
            })
        },
        computeDiff(latitude, longitude, reverse = false) {
            const line = this.data.linePoints
            for (let i = 0; i < line.length; i++) {
                const {
                    latitude: latitude1, longitude: longitude1
                } = line[i]
                let diff = 0.0005
                if (Math.abs(latitude1 - latitude) <= diff && Math.abs(longitude1 - longitude) <= diff) {
                    // console.log(latitude1, latitude, longitude1, longitude)
                    // 计算两点间角度，改变图标方向
                    let y = Math.sin(longitude1 - longitude) * Math.cos(latitude1);
                    let x = Math.cos(latitude) * Math.sin(latitude1) - Math.sin(latitude) * Math.cos(latitude1) * Math.cos(longitude1 - longitude);
                    let angle = Math.atan2(y, x);
                    angle = (180 * angle) / Math.PI;
                    return angle;
                }
            }
        },
        hideMap() {
            this.setData({
                showMap: false
            })
        },
        refreshStops() {
            this.triggerEvent('refresh')
        },
        toggleRouteView() {
            this.data.mapContext.includePoints({
                points: this.data.linePoints,
                padding: [50],
                success: res => {
                    console.log(res)
                },
                fail: res => {
                    console.log(res)
                }
            })
        }
        ,
        positioning() {
            wx.getLocation({type: 'gcj02'}).then(res => {
                const {latitude, longitude} = res
                this.setData({
                    mapCenter: {latitude, longitude},
                })
            })
        }
        ,
        refreshRoute() {
            this.triggerEvent('refresh')
        }
    }
});
