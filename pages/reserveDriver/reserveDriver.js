const app = getApp()
const mapBehavior = require("../../assets/js/qqmap-wx-jssdk1.2/mapBehavior")
import Toast from '@vant/weapp/toast/toast';

Page({
    behaviors: [mapBehavior],
    data: {
        cusNavHeight: 0,
        mapScale: 10,
        orderInfo: {
            start: {
                name: '银川站',
                latitude: 38.492019,
                longitude: 106.174037,
            },
            end: {
                name: '河东国际机场',
                latitude: 38.322417,
                longitude: 106.39306,
            },
            departTime: '出行时间',
            passengerList: [],
            price1: 33,
            price2: 66,
        },
        reservationPopup: false,
        showPassengerPopup: true,
        confirmSubmit: false,
        mapCenter: {
            latitude: 38.492019,
            longitude: 106.174037,
        },
        mapHeight: 300,
        includePoints: [],
        polyline: [],
        markers: [],
    },
    onLoad: function (options) {
        this.setData({
            cusNavHeight: app.globalData.sysInfo.statusBarHeight + 46
        })
        this.drawDrivingLine(this.data.orderInfo.start, this.data.orderInfo.end)
    },
    onReady() {
        this.computeHeight()
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    swapPosition() {
        const {start, end} = this.data.orderInfo
        let orderInfo = Object.assign({...this.data.orderInfo}, {start: end, end: start})
        this.setData({orderInfo}, () => {
            this.drawDrivingLine(this.data.orderInfo.start, this.data.orderInfo.end)
        })
    },
    leaveAMessage() {
        // todo
        wx.navigateTo("")
    },
    async drawDrivingLine(from, to) {
        const pl = await this.getDrivingLine(from, to)
        const center = Math.round(pl.length / 2)
        this.setData({
            polyline: [{
                points: pl,
                color: '#FF0000DD',
                width: 3
            }],
            includePoints: pl,
            mapCenter: pl[center],
            markers: [{
                id: 1,
                latitude: pl[0].latitude,
                longitude: pl[0].longitude,
                title: '起点',
                width: 20,
                height: 20,
                callout: {
                    content: `起点: ${from.name}`,
                    display: 'ALWAYS',
                    textAlign: 'center',
                    color: '#ffffff',
                    bgColor: '#529b2e',
                    borderRadius: 6,
                    padding: 6,
                    fontSize: 14,
                }
            }, {
                id: 2,
                latitude: pl[pl.length - 1].latitude,
                longitude: pl[pl.length - 1].longitude,
                title: '终点',
                width: 20,
                height: 20,
                callout: {
                    content: `终点: ${to.name}`,
                    display: 'ALWAYS',
                    textAlign: 'center',
                    color: '#ffffff',
                    bgColor: '#529b2e',
                    borderRadius: 6,
                    padding: 6,
                    fontSize: 14,
                }
            }]
        }, () => {
            setTimeout(() => {
                this.setData({mapScale: 10})
            }, 200)

        })
    },
    pickTime() {
        this.setData(
            {reservationPopup: true}
        )
    },
    pickPassenger() {
        this.setData(
            {showPassengerPopup: true}
        )
    },
    showReservationPopup() {
        const {departTime, passengerList} = this.data.orderInfo
        if (passengerList.length === 0) {
            Toast({duration: 2000, message: '请添加出行人'});
            return
        }
        if (departTime === '出行时间') {
            Toast({duration: 2000, message: '请选择出行时间'});
            return
        }
        this.setData(
            {confirmSubmit: true}
        )
    },
    hideReservationPopup() {
        this.setData(
            {reservationPopup: false}
        )
    },
    hideConfirm() {
        this.setData(
            {confirmSubmit: false}
        )
    },
    doSubmit(e) {
        const {checkTransportation, transferDepartureTime, check1, check2} = e.detail
        this.setData({confirmSubmit: false})
        // dosubmit
    },
    getTimeRange(e) {
        console.log(e)
        const {currentSelectDate, timeRange} = e.detail
        this.setData(
            {
                reservationPopup: false,
                orderInfo: {...this.data.orderInfo, departTime: `${currentSelectDate}${timeRange}`,}
            }
        )
    },
    getSelectedPassenger(e) {
        this.setData(
            {
                reservationPopup: true,
                showPassengerPopup: false,
                orderInfo: {...this.data.orderInfo, passengerList: e.detail.selectedPassenger,}
            }
        )
    },
    computeHeight() {
        setTimeout(() => {
            const that = this
            const query = wx.createSelectorQuery()
            query.select('.top').boundingClientRect()
            query.select('.btn-wrapper').boundingClientRect()
            query.selectViewport().boundingClientRect()
            query.exec(function (res) {
                const [top, btns, viewPort] = res
                let {cusNavHeight} = that.data
                const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
                const safeBottom = screenHeight - bottom
                that.setData({
                    mapHeight: viewPort.height - cusNavHeight - top.height - btns.height - safeBottom
                })
            })
        }, 200)
    }
});
