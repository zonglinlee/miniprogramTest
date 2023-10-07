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
        swiperList: [{url: 'http://s1dkzsmpj.hb-bkt.clouddn.com/outer/swiper1.png'}, {url: 'http://s1dkzsmpj.hb-bkt.clouddn.com/outer/swiper2.jpg'}],
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
    },
    // 事件处理函数
    navigateTo(e) {
        let url = e.currentTarget.dataset.url
        wx.navigateTo({
            url
        })
    },

    onLoad() {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        this.getCurrentPosition()
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
    async getDrivingLine2(from, to) {
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
    getDrivingLine1(e) {
        //调用距离计算接口
        const mapSdk = app.globalData.mapSdk
        const _this = this
        mapSdk.direction({
            mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
            //from参数不填默认当前地址
            // from: e.detail.value.start,
            to: "38.495004711800874,106.24666087190383",
            success: function (res) {
                console.log(res);
                const ret = res;
                let coors = ret.result.routes[0].polyline, pl = [];
                //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                let kr = 1000000;
                for (let i = 2; i < coors.length; i++) {
                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                }
                //将解压后的坐标放入点串数组pl中
                for (let i = 0; i < coors.length; i += 2) {
                    pl.push({latitude: coors[i], longitude: coors[i + 1]})
                }
                console.log(231313, pl)
                //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
                _this.setData({
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
                        iconPath: '../../assets/images/start_position.svg',
                    }, {
                        id: 2,
                        latitude: pl[pl.length - 1].latitude,
                        longitude: pl[pl.length - 1].longitude,
                        title: 'end',
                        // iconPath: '../../assets/images/end_position.png',
                        iconPath: '../../assets/images/end_position.svg',
                    }]
                })
            },
            fail: function (error) {
                console.error(error);
            },
            complete: function (res) {
                console.log(res);
            }
        });
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
                this.getDrivingLine2(currentPositionStart, currentPositionEnd)
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
