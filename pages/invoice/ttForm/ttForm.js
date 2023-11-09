const app = getApp()
Page({
    data: {
        formHeight: 0,
        cusNavHeight: 0,
        invoiceInfo: {
            mobile: '',
            invoiceType: '1',
            companyName: '',
            taxNo: '',
            address: '',
            bankName: '',
            bankNo: '',
            remark: '',
            email: ''
        },
        label: '公司',
        switchCheck: false,
        okSubmit: false,
    },
    onLoad: function (options) {
        const that = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            that.setData({
                invoiceInfo: {...that.data.invoiceInfo, ...data.invoice}
            })
            that.setOkSubmit()
        })
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
    },
    onReady() {
        setTimeout(() => {
            this.computeHeight()
        }, 500)
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    onChangeSwitch({detail}) {
        this.setData({switchCheck: detail});
    },
    onChangeType(e) {
        const detail = e.detail
        let label = ''
        if (detail === '1') {
            label = '公司'
        }
        if (detail === '2') {
            label = '抬头'
        }
        this.setData({invoiceInfo: {...this.data.invoiceInfo, invoiceType: detail}, label})
        this.setOkSubmit()
    },
    onChangeInput(e) {
        const field = e.currentTarget.dataset.field
        const detail = e.detail
        this.setData({invoiceInfo: {...this.data.invoiceInfo, [field]: detail}})
        this.setOkSubmit()
    },
    setOkSubmit() {
        const {invoiceType, companyName, taxNo, email} = this.data.invoiceInfo
        if (invoiceType === '1' && companyName && taxNo) {
            this.setData({
                okSubmit: true
            })
        } else if (invoiceType === '2' && companyName) {
            this.setData({
                okSubmit: true
            })
        } else {
            this.setData({
                okSubmit: false
            })
        }
    },
    submitInvoiceForm() {
        const {invoiceType, companyName, taxNo, email} = this.data.invoiceInfo
        if (!companyName) {
            Toast({duration: 2000, message: '请输入公司名称'});
            return
        }
        if (invoiceType === '1') {
            if (!taxNo) {
                Toast({duration: 2000, message: '请输入公司税号'});
                return
            }
        }
        /**
         if (!email) {
            Toast({duration: 2000, message: '请输入电子邮箱'});
            return
        }
         const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
         if (!reg.test(email)) {
            Toast({duration: 2000, message: '电子邮箱格式有误'});
            return;
        }
         */
        // dosubmit
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.select('.btn-wrapper').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            that.setData({
                formHeight: res[1].height - app.globalData.cusNavHeight - res[0].height - safeBottom,
            })
        })
    }
});
