const app = getApp()
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
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
        okSubmit: false,
        showInvoicePopup: false,
        showSubmitPopup: false,
        companyList: [
            {
                companyName: '水水水水水水水水水水水水1',
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
                email: '123@qq.com',
            },
            {
                companyName: '水水水水水水水水水水水水2',
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
                email: '123@qq.com',
            },
            {
                companyName: '水水水水水水水水水水水水3',
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
                email: '123@qq.com',
            },
            {
                companyName: '水水水水水水水水水水水水4',
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
            },
            {
                companyName: '水水水水水水水水水水水水5',
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
            },
            {
                companyName: '水水水水水水水水水水水水6',
                taxNo: '9134 1721 7935 9747 5D',
                address: '犯得上反对',
                mobile: '17809527290',
            }
        ],
        selectedItem: null
    },
    onLoad: function (options) {
        this.setData({
            cusNavHeight: app.globalData.cusNavHeight
        })
    },
    onReady() {

    },
    goBack() {
        app.defaultCustomNavClick()
    }
    ,
    doSubmit() {
        wx.navigateTo({url: '/pages/invoice/invoiceSuccess/invoiceSuccess'})
    },
    closeSubmitPopup() {
        this.setData({
            showSubmitPopup: false
        })
    },
    showPopup() {
        this.setData({
            showInvoicePopup: true
        })
    },
    closePopup() {
        this.setData({
            showInvoicePopup: false
        })
    },
    onChangeType(e) {
        const detail = e.detail
        this.setData({invoiceInfo: {...this.data.invoiceInfo, invoiceType: detail}})
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
        if (invoiceType === '1' && companyName && taxNo && email) {
            this.setData({
                okSubmit: true
            })
        } else if (invoiceType === '2' && companyName && email) {
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
        if (!email) {
            Toast({duration: 2000, message: '请输入电子邮箱'});
            return
        }
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(email)) {
            Toast({duration: 2000, message: '电子邮箱格式有误'});
            return;
        }
        // dosubmit
        this.setData({
            showSubmitPopup: true
        })
    },
    checkInvoiceItem(e) {
        const item = e.currentTarget.dataset.item
        const obj = {...this.data.invoiceInfo, ...item}
        this.setData({
            selectedItem: item,
            showInvoicePopup: false,
            invoiceInfo: obj
        })
        this.setOkSubmit()
    },
    add() {
        wx.navigateTo({url: '/pages/invoice/invoiceDetail/invoiceDetail'})
    },
    addTT() {
        wx.navigateTo({url: '/pages/invoice/invoiceTT/invoiceTT'})
    },
    goDetail() {
        wx.navigateTo({url: '/pages/invoice/invoiceDetail/invoiceDetail'})
    }
});
