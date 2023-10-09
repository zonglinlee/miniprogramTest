const app = getApp()
import Toast from '@vant/weapp/toast/toast';

const mapBehavior = require("../../assets/js/qqmap-wx-jssdk1.2/mapBehavior")


Page({
    behaviors: [mapBehavior],
    data: {
        showPopup: false,
        showSelectPositionPopup: false,
        motto: 'canvas test',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
        swiperList: [{url: 'http://s1dkzsmpj.hb-bkt.clouddn.com/outer/swiper1.jpg'}],
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
        swiperHeight: 75,
        swiperLoaded: false,
        hotBtn: [{
            label: '定制班线',
            key: 'order',
            src: '../../assets/images/order.png',
        }, {
            label: '货物代送',
            key: 'order',
            src: '../../assets/images/order.png',
        }, {
            label: '全部订单',
            key: 'order',
            src: '../../assets/images/order.png',
        }, {
            label: '待支付',
            key: 'wait_pay',
            src: '../../assets/images/wait_pay.png',
        }, {
            label: '待出行',
            key: 'red_car',
            src: '../../assets/images/red_car.png',
        }, {
            label: '待评价',
            key: 'wait_evaluate',
            src: '../../assets/images/wait_evaluate.png',
        }, {
            label: '退货/售后',
            key: 'refund',
            src: '../../assets/images/refund.png',
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
    },
    async onReady() {
    },
    async loadSwiperImage(e) {
        const detail = e.detail
        // console.log('loadSwiperImage:', detail.height)
        if (!this.data.swiperLoaded) {
            const res = await app.computeRec('.swiper-image')
            this.setData({
                swiperHeight: res.height || res[0].height || 75,
            })
        }
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
    openPopup() {
        this.setData({
            showPopup: true
        })
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
        // wx.nextTick(()=>{
        //
        // })
    }
})
