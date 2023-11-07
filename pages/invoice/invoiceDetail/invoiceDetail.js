const app = getApp()
Page({
    data: {
        cusNavHeight: 0,
        invoiceList: [
            {title: '信息技术服务，信息技术服务增值', company: '杭州小木几软件科技有限公司', total: 55},
            {title: '信息技术服务，信息技术服务增值,信息技术服务增值信息技术服务增值', company: '杭州小木几软件科技有限公司-杭州小木几软件科技有限公司', total: 55},
        ]
    },
    onLoad: function (options) {
        this.setData({
            cusNavHeight: app.globalData.sysInfo.statusBarHeight + 46
        })
    },
    goBack() {
        app.defaultCustomNavClick()
    }
});
