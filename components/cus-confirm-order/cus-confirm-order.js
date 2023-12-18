import Toast from '@vant/weapp/toast/toast';

Component({
    externalClasses: ['custom-class'],
    properties: {
        orderInfo: {
            type: Object,
            required: true
        }
    },
    data: {
        check1: true,
        check2: false,
        showTip: false,
        showTransferInfo: false,
        transportation: '飞机',
        checkTransportation: true,
        showTimePicker: false,
        transferDepartureTime: '',
    },
    lifetimes: {
        ready() {

        }

    },
    methods: {
        onCloseTimePicker() {
            this.setData({
                showTimePicker: false
            })
        },
        onShowTimePicker() {
            this.setData({
                showTimePicker: true
            })
        },

        checkPrice1() {
            this.setData({
                check1: true,
                check2: false,
            })
        },
        checkPrice2() {
            this.setData({
                check1: false,
                check2: true,
            })
        },
        onCloseTip() {
            this.setData({
                showTip: false
            })
        },
        showTipDialog() {
            this.setData({
                showTip: true
            })
        },
        goPage() {
            wx.navigateTo({url: ''})
        },
        onCloseTransfer() {
            this.setData({
                showTransferInfo: false
            })
        },
        tapCheckTransportation(e) {
            const check = e.currentTarget.dataset.check
            if (check === '1') {
                this.setData({checkTransportation: true})
            }
            if (check === '0') {
                this.setData({checkTransportation: false})
            }
        },
        getTimeFormPicker(event) {
            // console.log(event.detail)
            this.setData({
                transferDepartureTime: event.detail,
                showTimePicker: false
            });
        },
        confirmSelect() {
            const {start, end} = this.data.orderInfo
            if (end.name === '河东国际机场') {
                this.setData({showTransferInfo: true})
                return
            }
            this.submit()
        },
        submit() {
            const {checkTransportation, transferDepartureTime, check1, check2} = this.data.orderInfo
            this.triggerEvent('confirm', {checkTransportation, transferDepartureTime, check1, check2})
        }

    },
    observers: {
        'dayIndex': function (dayIndex) {

        },
    }
});
