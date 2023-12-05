const app = getApp()
Page({
    data: {
        navTitle: "",
        imageUrl: "",
        textContent: "",
        cusNavHeight: 0,
        showImage: false,
    },

    onLoad(options) {
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
        const {navTitle, imageUrl} = options // 获取路由传参
        let showImage = false
        if (imageUrl !== 'undefined') {
            showImage = true
        }
        let textContent = ''
        switch (navTitle) {
            case '购票/退票规则':
                textContent = '而对于顺风车而言，市内订单在出发前10分钟取消会扣除不低于2元，不高于15元的取消费用。而跨市订单在出发前20分钟及之后取消会扣取订单金额10%的取消费。在出发前40-20分钟之内取消的，则会收取订单金额5%的取消费，但跨市订单取消费的金额最高不得超过25元。而对于顺风车而言，市内订单在出发前10分钟取消会扣除不低于2元，不高于15元的取消费用。而跨市订单在出发前20分钟及之后取消会扣取订单金额10%的取消费。在出发前40-20分钟之内取消的，则会收取订单金额5%的取消费，但跨市订单取消费的金额最高不得超过25元。'
                break
            case '温馨提示':
                textContent = '温馨提示占位'
                break
        }
        this.setData({showImage, navTitle, imageUrl, textContent})
    },
    goBack() {
        app.defaultCustomNavClick()
    },

})
