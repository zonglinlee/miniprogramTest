const app = getApp()
import Toast from '@vant/weapp/toast/toast';

const throttle = (fn, delay = 60) => {
    let timer = null
    const newFn = (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay)
        }
    }
    return newFn
}
let globalThat = null
Page({

    data: {
        cusNavHeight: 0,
        chatHeight: 0,
        flag: false
    },
    // 事件处理函数
    navigateTo(e) {
        let url = e.currentTarget.dataset.url
        wx.navigateTo({
            url
        })
    },

    async onLoad() {
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
        const that = this
        wx.login({
            success: (res) => {
                console.log("loginSuccess", res)
                // 通过code换取openid
                if (res.code) {
                    wx.request({
                        url: `https://e0e0-61-133-217-141.ngrok-free.app/wechat/getOpenid?code=${res.code}`,
                        method: "post",
                        data: {
                            code: res.code,
                        },
                        success: (res) => {
                            console.log(res.data.result.openid)
                            if (res.data && res.data.result.openid) {
                                // 获取的openid存入storage，方便之后使用
                                wx.setStorageSync("openId", res.data.result.openid);
                                console.log("openid:", res.data.result.openid)
                                that.initBot(res.data.result.openid)
                            }
                        },
                    });
                }
            },
            fail: (res) => {
                console.log("loginFail", res)
            },
            complete: (res) => {
                // console.log("loginComplete", res)
            },
        });

    },
    async onReady() {
        // console.log(1234567, app.globalData)
        setTimeout(() => {
            this.computeHeight()
        }, 0)

    },
    initBot(openid) {
        const that = this
        const plugin = requirePlugin("chatbot");
        console.log(2131231323, that.data.cusNavHeight)
        plugin.init({
            appid: "mfm3pnVW0kkFbnirSa4YKxsejYKD3G", //微信对话开放平台小程序插件appid
            openid, // 小程序用户的openid，必填项
            autoRecommendGuideList: true,
            success: () => {
                console.log("initBot success:")
                this.setData({
                    flag: true
                })
            },
            fail: (error) => {
                console.log("initBot fail:", error)
            },
            guideList: ["您好", "银川天气怎么样", "上海天气怎么样", "广州天气怎么样", "石头剪刀布", "庆阳天气怎么样", "吴忠天气怎么样"],
            textToSpeech: true, //默认为ture打开状态
            background: "rgba(247,251,252,1)",
            guideCardHeight: 40,
            operateCardHeight: 80,
            history: true,
            navHeight: that.data.cusNavHeight,
            noWaiterInfo: true,
            robotHeader: "https://e0e0-61-133-217-141.ngrok-free.app/images/bot.png?t=354",
            userHeader: "https://e0e0-61-133-217-141.ngrok-free.app/images/avatar.jpg?t=123",
            userName: "lee",
            anonymous: false, // 是否允许匿名用户登录，版本1.2.9后生效, 默认为false，设为ture时，未传递userName、userHeader两个字段时将弹出登录框
            hideMovableButton: false,
        });
    },
    getQueryCallback: function (e) {

    },
    openWebview(e) {
        let url = e.detail.weburl
        wx.navigateTo({
            url: `/pages/webview/webview?url=${url}`
        })
    },
    openMiniProgram() {
        // todo
    },
    moveCardThrottle: throttle(function (...arg) {
        // console.log(14321434, globalThat)
        app.computeRec('.mv').then(res => {
            globalThat.setData({
                showBg: res[0].top <= 60
            })
        })
    }, 80),
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const [viewPort] = res
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            that.setData({
                chatHeight: screenHeight - that.data.cusNavHeight - safeBottom
            })
        })
    },
    goBack() {
        app.defaultCustomNavClick()
    },
})
