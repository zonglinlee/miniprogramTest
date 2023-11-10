const app = getApp()
import Toast from '@vant/weapp/toast/toast';

const mapBehavior = require("../../assets/js/qqmap-wx-jssdk1.2/mapBehavior")


Page({
    behaviors: [mapBehavior],
    data: {
        sysInfo: {statusBarHeight: 20},
        fixedHeight: 56,
        isPc: false,
        showSelectPositionPopup: false,
        swiperList: [{url: 'http://s2z4nayoc.hb-bkt.clouddn.com/outer/swiper3.jpg'}],
        currentPositionStart: {
            latitude: 39.90,
            longitude: 116.40,
        },
        currentPositionEnd: {
            latitude: null,
            longitude: null,
        },
        locationAddStart: "正在获取当前位置中...",
        currentCity: "",
        locationAddEnd: "",
        polyline: [],
        includePoints: [],
        markers: [],
        selectStart: false,
        swiperHeight: 111,
        swiperLoaded: false,
        card1Height: 777,
        maHeight: 2000,
        showBg: false,
        hotBtn: [{
            label: '定制班线',
            key: 'dedicatedLine',
            src: '../../assets/images/index/dedicatedLine.png',
            pageUrl: '/pages/dedicatedLine/dedicatedLine'
        }, {
            label: '货物代送',
            key: 'goodsDelivery',
            src: '../../assets/images/index/goodsDelivery.png',
        }, {
            label: '我的订单',
            key: 'order',
            src: '../../assets/images/index/order.png',
            pageUrl: '/pages/order/order',
            isTabPage: false
        }, {
            label: '发票中心',
            key: 'invoice',
            pageUrl: '/pages/invoice/invoiceIndex/invoiceIndex',
            src: '../../assets/images/index/invoice.png',
        }, {
            label: '意见反馈',
            key: 'feedback',
            pageUrl: '/pages/feedback/feedback',
            src: '../../assets/images/index/feedback.png',
        }, {
            label: '常用乘车人',
            key: 'passenger',
            src: '../../assets/images/index/passenger.png',
            pageUrl: "/pages/addPassenger/addPassenger"
        }, {
            label: '优惠券',
            key: 'coupons',
            pageUrl: '/pages/coupons/coupons',
            src: '../../assets/images/index/coupons.png',
        }, {
            label: '联系客服',
            key: 'customer_service',
            src: '../../assets/images/index/customer_service.png',
        }],
    },
    // 事件处理函数
    navigateTo(e) {
        let url = e.currentTarget.dataset.url
        wx.navigateTo({
            url
        })
    },

    async onLoad() {
        this.getCurrentPosition()
    },
    async onReady() {
        setTimeout(() => {
            this.computeHeight()
        }, 500)

    },
    computeHeight() {
        const menuBtnRec = wx.getMenuButtonBoundingClientRect()
        const sysInfo = app.globalData.sysInfo
        const platform = sysInfo.platform;
        let isPc = false
        if (platform === 'windows' || platform === 'mac') {
            isPc = true
        }
        const query = wx.createSelectorQuery()
        query.select('.card1').boundingClientRect()
        query.selectViewport().boundingClientRect()
        const that = this
        query.exec(function (res) {
            const [card1, viewPort] = res
            const ht = card1.height
            const mvDistance = card1.bottom - viewPort.height
            that.setData({
                card1Height: ht,
                maHeight: ht + mvDistance,
                maTop: mvDistance,
                fixedHeight: menuBtnRec.bottom,
                sysInfo,
                isPc
            })
        })
    },
    async loadSwiperImage(e) {
        const detail = e.detail
        if (!this.data.swiperLoaded) {
            const query = wx.createSelectorQuery()
            query.select('.swiper-image').boundingClientRect()
            const that = this
            query.exec(function (res) {
                const [swiperImg, top, cardRec, card1, itemsWrapper, viewPort] = res
                that.setData({
                    swiperHeight: swiperImg.height
                })
            })
        }
    },

    async moveCard(e) {
        const res = await app.computeRec('.mv')
        this.setData({
            mvOffsetTop: res[0].top,
            showBg: res[0].top <= 60
        })
    },
    moveCardV(e) {
    },
    hotBtnClick(e) {
        let item = e.currentTarget.dataset.item
        const {imgUrl, pageUrl, label, isTabPage} = item
        if (pageUrl) {
            if (isTabPage) {
                wx.switchTab({url: pageUrl})
            } else {
                wx.navigateTo({url: pageUrl})
            }
        } else if (imgUrl) {
            wx.navigateTo({url: `/pages/imagePage/imagePage?navTitle=${label}&imageUrl=${imgUrl}`})
        } else {
            wx.showToast({
                title: item.label,
                icon: 'success',
                duration: 500
            })
        }
    },
    async getCurrentPosition() {
        try {
            this.setData({locationAdd: '正在获取当前位置中...'})
            const res = await wx.getLocation({type: 'gcj02'})
            await this.getAddress(res)
        } catch (e) {
            Toast({duration: 2000, message: '位置获取失败，请重新获取'});
            console.error(e)
        }
    },
    async getAddress({latitude, longitude}) {
        const res = await this.latToAddress({latitude, longitude})
        // console.log(4234234234, res)
        if (res.status === 0) {
            const {location: {lat, lng}, formatted_addresses: {recommend}, address, ad_info: {city}} = res.result
            this.setData({
                currentPositionStart: {latitude: lat, longitude: lng},
                locationAddStart: recommend,
                currentCity: city
            })
        } else {
            Toast.fail('位置获取失败，请重新获取位置');
        }
    },
    async drawDrivingLine(from, to) {
        const pl = await this.getDrivingLine(from, to)
        this.setData({
            latitude: pl[0].latitude,
            longitude: pl[0].longitude,
            polyline: [{
                points: pl,
                color: '#FF0000DD',
                width: 3
            }],
            includePoints: pl,
            markers: [{
                id: 1,
                latitude: pl[0].latitude,
                longitude: pl[0].longitude,
                title: 'start',
                // iconPath: '../../assets/images/start_position.png',
                iconPath: 'http://s2z4nayoc.hb-bkt.clouddn.com/start_position.png',
                width: 20,
                height: 20
            }, {
                id: 2,
                latitude: pl[pl.length - 1].latitude,
                longitude: pl[pl.length - 1].longitude,
                title: 'end',
                // iconPath: '../../assets/images/end_position.png',
                iconPath: 'http://s2z4nayoc.hb-bkt.clouddn.com/end_position.png',
                width: 20,
                height: 20
            }]
        })
    },
    getClickPoint(res) {
        console.log("点击地图:", res)
    },
    confirmOrder() {
    },
    focusInput1() {
        this.setData({selectStart: false, showSelectPositionPopup: true})
    },
    closeSelectPositionPopup(event) {
        // console.log(event)
        if (event.detail) {
            const {latitude, longitude, markerAdd, isStart, locationAddEnd} = event.detail
            if (isStart) {
                this.setData({
                    currentPositionStart: {latitude, longitude},
                    locationAddStart: markerAdd,
                    showSelectPositionPopup: false
                })
            } else {
                this.setData({
                    currentPositionEnd: {latitude, longitude},
                    locationAddEnd,
                    showSelectPositionPopup: false
                })
            }
            const {currentPositionStart, currentPositionEnd} = this.data
            if (currentPositionEnd.latitude) {
                this.drawDrivingLine(currentPositionStart, currentPositionEnd)
            }
        } else {
            this.setData({
                showSelectPositionPopup: false
            })
        }
    },
    selectStartPos() {
        this.setData({selectStart: true, showSelectPositionPopup: true})
    },
    gotoPage(e) {
        app.navigate(e)
    },
    noop() {
    }
})
