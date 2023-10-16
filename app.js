const QQMapWX = require('./assets/js/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min');
let mapSdk;
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        //    地图
        // 实例化API核心类
        mapSdk = new QQMapWX({
            key: 'FRNBZ-L3ZWI-LBKGO-53YVV-MZS53-G4FJO'
        });
        this.globalData.mapSdk = mapSdk
    },
    globalData: {
        userInfo: null,
        mapSdk: null,
        currentOrder: {
            orderType:''
        },
        orderOngoing: false
    },
    defaultCustomNavClick() {
        wx.navigateBack({})
    },
    getImageInfo(src) {
        return wx.getImageInfo({src})
    },
    computeRec(selector, all = false) {
        const query = wx.createSelectorQuery()
        const s = all ? 'selectAll' : 'select'
        if (selector) {
            query[s](selector).boundingClientRect()
        } else {
            query.selectViewport().boundingClientRect()
        }
        return new Promise((resolve, reject) => {
            query.exec(function (res) {
                resolve(res)
            })
        })

    },
    navigate(e) {
        const url = e?.currentTarget?.dataset.url || e
        const isTab = e?.currentTarget?.dataset.tab || false
        if (isTab) {
            wx.switchTab({url})
        } else {
            if (url === '/pages/imagePage/imagePage') {
                const imgUrl = e?.currentTarget?.dataset.imgurl
                const title = e?.currentTarget?.dataset.title
                if (imgUrl) {
                    wx.navigateTo({url: `${url}?navTitle=${title}&imageUrl=${imgUrl}`})
                }
            } else {
                wx.navigateTo({url})
            }
        }
    }
})
