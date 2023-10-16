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
        motto: 'canvas test',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
        swiperList: [{url: 'http://s1dkzsmpj.hb-bkt.clouddn.com/outer/swiper3.jpg'}],
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
        swiperHeight: 100,
        swiperLoaded: false,
        card1Height: 777,
        maHeight: 2000,
        cardTop: 0,
        showBg: false,
        hotBtn: [{
            label: '定制班线',
            key: 'dedicatedLine',
            src: '../../assets/images/red_car.png',
            pageUrl: '/pages/dedicatedLine/dedicatedLine'
        }, {
            label: '货物代送',
            key: 'goodsDelivery',
            src: '../../assets/images/red_car.png',
        }, {
            label: '我的订单',
            key: 'order',
            src: '../../assets/images/order.png',
            pageUrl: '/pages/order/order',
            isTabPage: true
        }, {
            label: '优惠券',
            key: 'coupons',
            src: '../../assets/images/coupons.png',
        }, {
            label: '常用乘车人',
            key: 'passenger',
            src: '../../assets/images/passenger.png',
            pageUrl: "/pages/addPassenger/addPassenger"
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
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        this.getCurrentPosition()
        this.setData({
            hotBtn: [...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn, ...this.data.hotBtn,]
        })
    },
    async onReady() {
        const sysInfo = wx.getSystemInfoSync()
        const menuBtnRec = wx.getMenuButtonBoundingClientRect()
        const platform = sysInfo.platform;
        let isPc = false
        if (platform === 'windows' || platform === 'mac') {
            isPc = true
        }
        // console.log('fixedHeight:', res);
        // console.log('sysInfo:', isPc, sysInfo);
        const query = wx.createSelectorQuery()
        query.select('.top').boundingClientRect()
        query.selectAll('.ch').boundingClientRect()
        query.select('.card1').boundingClientRect()
        query.select('.items-wrapper').boundingClientRect()
        query.selectViewport().boundingClientRect()
        const that = this
        query.exec(function (res) {
            console.log(res)
            const [top, cardRec, card1, itemsWrapper, viewPort] = res
            const ht = cardRec.reduce((acc, item) => acc + item.height, 0)
            console.log(1111, top, cardRec, ht, card1.bottom, itemsWrapper.bottom, viewPort.height)
            // const mvDistance = Math.max(card1.bottom, itemsWrapper.bottom) - viewPort.height
            const mvDistance = itemsWrapper.bottom - viewPort.height
            that.setData({
                card1Height: ht + 24,
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
        /*
        if (!this.data.swiperLoaded) {
            const query = wx.createSelectorQuery()
            query.select('.swiper-image').boundingClientRect()
            query.select('.top').boundingClientRect()
            query.selectAll('.ch').boundingClientRect()
            query.select('.card1').boundingClientRect()
            query.select('.items-wrapper').boundingClientRect()
            query.selectViewport().boundingClientRect()
            const that = this
            query.exec(function (res) {
                const [swiperImg, top, cardRec, card1, itemsWrapper, viewPort] = res
                const ht = cardRec.reduce((acc, item) => acc + item.height, 0)
                console.log(2222, top, cardRec, ht, card1.bottom, itemsWrapper.bottom, viewPort.height)
                // const mvDistance = Math.max(card1.bottom, itemsWrapper.bottom) - viewPort.height
                const mvDistance = itemsWrapper.bottom - viewPort.height
                that.setData({
                    card1Height: ht + 24,
                    maHeight: ht + mvDistance,
                    maTop: mvDistance,
                })
            })
        }
        */
    },

    async moveCard(e) {
        const res = await app.computeRec('.mv')
        // console.log('moveCard:', res[0].top, res[0].top <= 20, e.detail, res[0])
        // console.log(e.detail)
        this.setData({
            mvOffsetTop: res[0].top,
            showBg: res[0].top <= 60
        })
    },
    moveCardV(e) {
        // console.log('moveCardV:', e, e.detail)
    },
    onTouchStart(e) {
        // console.log(e)
        this.cardMoving = true
        const [touch1] = e.touches
        this.clientY = touch1.clientY
    },
    onTouchMove(e) {
        if (this.cardMoving) {
            const [touch1] = e.touches
            const diff = touch1.clientY - this.clientY + this.data.cardTop

            console.log(e, diff)
            if (diff <= -10000) {
                this.setData(
                    {cardTop: -10000}
                )
            } else if (diff >= 0) {
                this.setData(
                    {cardTop: 0}
                )
            } else {
                this.setData(
                    {cardTop: diff}
                )
            }
            this.clientY = touch1.clientY
        }
    },
    onTouchEnd(e) {
        this.cardMoving = false
    },
    testAPI() {
        // console.log(wx.getMenuButtonBoundingClientRect())
        // wx.hideTabBar({})
        // wx.showTabBarRedDot({index: 0})
        // wx.startPullDownRefresh()
        // wx.openSetting({})
        // wx.startSoterAuthentication({
        //     requestAuthModes: ['fingerPrint'],
        //     challenge: '123456',
        //     authContent: '请用指纹解锁',
        //     success(res) {
        //         console.log(res)
        //     }
        // })
        // wx.openBluetoothAdapter({})
        // wx.startWifi({})
        // setTimeout(() => {
        //     wx.stopWifi({
        //         success(res) {
        //             console.log(res.errMsg)
        //         },
        //         fail(res) {
        //             console.log(res)
        //         }
        //     })
        //     wx.closeBluetoothAdapter({})
        // }, 3000)
        // wx.makePhoneCall({
        //     phoneNumber: '67414' //仅为示例，并非真实的电话号码
        // })
        // wx.vibrateShort({
        //     style: 'light', success(res) {
        //         console.log(res)
        //     }, fail(err) {
        //         console.log(err)
        //     }
        // })

        console.log("wx.getWindowInfo():", wx.getWindowInfo());
        wx.getSystemInfo({
            success(res) {
                console.log(res)
            }
        })
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
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
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
                iconPath: 'http://s1dkzsmpj.hb-bkt.clouddn.com/start_position.png',
                width: 20,
                height: 20
            }, {
                id: 2,
                latitude: pl[pl.length - 1].latitude,
                longitude: pl[pl.length - 1].longitude,
                title: 'end',
                // iconPath: '../../assets/images/end_position.png',
                iconPath: 'http://s1dkzsmpj.hb-bkt.clouddn.com/end_position.png',
                width: 20,
                height: 20
            }]
        })
    },
    getClickPoint(res) {
        console.log("点击地图:", res)
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    confirmOrder() {
    },
    focusInput1() {
        console.log("focusInput1")
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
        // wx.nextTick(()=>{
        //
        // })
    },
    gotoPage(e) {
        app.navigate(e)
    },
    noop() {
    }
})
