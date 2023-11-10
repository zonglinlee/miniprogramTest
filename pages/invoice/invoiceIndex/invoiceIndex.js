const app = getApp()
const dayjs = require('dayjs')
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
        show: false,
        showTimePicker: false,
        startTime: '起始日期',
        endTime: '终止日期',
        dateTitle: '',
        minDate: dayjs().subtract(10, 'year').valueOf(),
        maxDate: new Date().getTime(),
        currentDate: new Date().getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            }
            if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
        isStart: false,
        checkPage: false,
        checkAll: false,
        value1: '',
        value2: '',
        tagNumber: 0,
        filterTabIndex: 0,
        filterTop: 120,
        selectedCheckbox: false,
        tips: '订单为个人信息，受法律保护，请勿冒用账号',
        listHeight: 0,
        selectedOrderLen: 0,
        totalPrice: '0.00',
        showNextStepTipDialog: false,
        orderList: [
            {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区宁夏迪安乐嘉医学检验中心有限责任公司（五里台路口）',
                to: '银川科技厅1',
                price: 45.00
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心2',
                price: 15.00
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心3',
                price: 15.00
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心4',
                price: 15.00
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心5',
                price: 15.00
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心5',
                price: 15.00
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心5',
                price: 15.00
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心5',
                price: 15.00
            }
        ],
        total: 12
    },
    onReachBottom() {
        console.log('onReachBottom')
        const temp = [...this.data.orderList, {
            type: '定制班线',
            departureTime: '2023-10-11 16:30',
            from: '金凤区宁夏迪安乐嘉医学检验中心有限责任公司（五里台路口）',
            to: '银川科技厅11',
            price: 88.00
        }, {
            type: '定制班线',
            departureTime: '2023-10-11 16:30',
            from: '金凤区中海国际社区龙湾南门',
            to: '育成中心12',
            price: 99.00
        }]

        setTimeout(() => {
            this.setData(
                {orderList: temp, refresh: false}
            )
        }, 1200)

    },
    scrollToLower() {
        console.log('scrollToLower')
        this.setData(
            {refresh: true}
        )
        if (this.data.orderList.length < this.data.total) {
            this.onReachBottom()
        }

    },
    onLoad: function (options) {
        setInterval(() => {
            if (this.data.tips === '未经本人同意不得转发') {
                this.setData({tips: '订单为个人信息，受法律保护，请勿冒用账号'})
            } else {
                this.setData({tips: '未经本人同意不得转发'})
            }
        }, 3000)
    },
    clickFilterTab(e) {
        this.setData({
            filterTabIndex: e.currentTarget.dataset.index
        })
        if (e.currentTarget.dataset.index === 1) {
            this.setData({orderList: []})
        } else {
            this.setData({
                orderList: [
                    {
                        type: '定制班线',
                        departureTime: '2023-10-11 16:30',
                        from: '金凤区宁夏迪安乐嘉医学检验中心有限责任公司（五里台路口）',
                        to: '银川科技厅1',
                        price: '45.00'
                    }, {
                        type: '定制班线',
                        departureTime: '2023-10-11 16:30',
                        from: '金凤区中海国际社区龙湾南门',
                        to: '育成中心2',
                        price: '15.00'
                    }, {
                        type: '定制班线',
                        departureTime: '2023-10-11 16:30',
                        from: '金凤区中海国际社区龙湾南门',
                        to: '育成中心3',
                        price: '15.00'
                    }, {
                        type: '定制班线',
                        departureTime: '2023-10-11 16:30',
                        from: '金凤区中海国际社区龙湾南门',
                        to: '育成中心4',
                        price: '15.00'
                    }, {
                        type: '定制班线',
                        departureTime: '2023-10-11 16:30',
                        from: '金凤区中海国际社区龙湾南门',
                        to: '育成中心5',
                        price: '15.00'
                    }
                ]
            })
        }
        setTimeout(() => {
            this.computeHeight()
        }, 200)
    },
    onSelectOrder(e) {
        const order = e.currentTarget.dataset.order
        const orderIndex = e.currentTarget.dataset.orderindex
        const orderList = this.data.orderList.map((item, index) => {
            if (index === orderIndex) {
                item.checked = !item.checked
            }
            return item
        })
        const arr = orderList.filter(item => item.checked)
        if (arr.length > 0) {
            this.setData({selectedCheckbox: true})
        } else {
            this.setData({selectedCheckbox: false})
        }
        this.setData({orderList})
        this.setSelectedOrder()
    },
    goBack() {
        app.defaultCustomNavClick()
    }
    ,
    cancel() {
        this.setData({show: false})
        this.setTagNumber()
    }
    ,
    onChangeCheckbox(event) {
        const field = event.currentTarget.dataset.field
        this.setData({
            [field]: event.detail,
        });

        if (field === 'checkPage') {
            const orderList = this.data.orderList.map((item, index) => {
                item.checked = event.detail
                return item
            })
            this.setData({orderList})
        }
        // checkAll todo
        if (field === 'checkAll') {
            const orderList = this.data.orderList.map((item, index) => {
                item.checked = event.detail
                return item
            })
            this.setData({orderList})
        }
        if (this.data.checkPage || this.data.checkAll) {
            this.setData({
                selectedCheckbox: true,
            });
        } else {
            this.setData({
                selectedCheckbox: false,
            });
        }
        this.setSelectedOrder()
    }
    ,
    openFilter() {
        this.setData({show: true})
    }
    ,
    onReady() {
        setTimeout(() => {
            this.computeHeight()
        }, 200)
    }
    ,
    selectTime(e) {
        const isStart = e.currentTarget.dataset.start
        this.setData({
            showTimePicker: true,
            isStart,
            dateTitle: isStart ? '选择起始日期' : '选择截至日期',
        })
    }
    ,
    confirmTime() {
        const dayObj = dayjs(this.data.currentDate)
        if (this.data.isStart) this.setData({
            startTime: dayObj.format('YYYY-MM-DD'),
        })
        if (!this.data.isStart) this.setData({
            endTime: dayObj.format('YYYY-MM-DD'),
        })
        this.setData({
            showTimePicker: false
        })
        if (dayjs(this.data.endTime).isBefore(dayjs(this.data.startTime))) {
            if (this.data.isStart) {
                this.setData({
                    endTime: '终止日期'
                })
            } else {
                this.setData({
                    startTime: '起始日期'
                })
            }
        }
    },
    closeTimePicker() {
        this.setData({
            showTimePicker: false
        });
    },
    onInput(event) {
        this.setData({
            currentDate: event.detail,
        });
    }
    ,
    resetFilter() {
        this.setData({
            startTime: '起始日期',
            endTime: '终止日期',
            dateTitle: '',
            minDate: dayjs().subtract(10, 'year').valueOf(),
            maxDate: new Date().getTime(),
            value1: '',
            value2: '',
        });
        this.setTagNumber()
    }
    ,
    confirmFilter() {
        this.setData({show: false})
        this.setTagNumber()
    },
    setTagNumber() {
        const {startTime, endTime, value1, value2} = this.data
        let num = 0
        if (value1 !== '' || value2 !== '') {
            num++;
        }
        if (startTime !== '起始日期' || endTime !== '终止日期') {
            num++;
        }
        this.setData({tagNumber: num})
    },
    setSelectedOrder() {
        const selectedOrders = this.data.orderList.filter(item => item.checked)
        const totalPrice = this.data.orderList.reduce((acc, item) => {
            if (item.checked) acc += item.price
            return acc
        }, 0)
        this.setData({
            selectedOrderLen: selectedOrders.length,
            totalPrice: totalPrice.toFixed(2)
        })
    },
    onChange1(val) {
        this.setData({
            value1: val.detail
        })
    }
    ,
    onChange2(val) {
        this.setData({
            value2: val.detail
        })
    }
    ,
    nextStep() {
        if (this.data.selectedOrderLen === 0) {
            Toast({duration: 2000, message: '请选择订单'});
            return
        }
        this.setData({
            showNextStepTipDialog: true
        })
    },
    doNextStep() {
        this.setData({
            showNextStepTipDialog: false
        }, () => {
            wx.navigateTo({url: '/pages/invoice/invoiceForm/invoiceForm'})
        })
    },
    closeShowNextStepTipDialog() {
        this.setData({
            showNextStepTipDialog: false
        })
    },
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.selectAll('.c-height').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            const total = res[0].reduce((acc, nodeInfo) => acc + nodeInfo.height, 0)
            console.log(res, res[1].height - total - 44)
            that.setData({
                filterTop: res[0][0].height + 44,
                listHeight: res[1].height - total - 44,
            })
        })
    }
});
