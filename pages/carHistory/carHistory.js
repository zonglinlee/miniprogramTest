const app = getApp()
const dayjs = require('dayjs')
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
        cusNavHeight: 0,
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
        value1: '',
        value2: '',
        tagNumber: 0,
        filterTop: 0,
        listHeight: 0,
        orderTypes: [],
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
        this.setData({
            cusNavHeight: app.globalData.sysInfo.statusBarHeight + 46
        })
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
    openFilter() {
        this.setData({show: !this.data.show})
    }
    ,
    selectOrderType(e) {
        const type = e.currentTarget.dataset.type
        let types = this.data.orderTypes
        if (types.includes(type)) {
            types = types.filter(t => t != type)
        } else {
            types.push(type)
        }
        this.setData({
            orderTypes: types
        })
    },
    isSelected(type) {
        return this.data.orderTypes.includes(type)
    },
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
            orderTypes: []
        });
        this.setTagNumber()
    }
    ,
    confirmFilter() {
        this.setData({show: false})
        this.setTagNumber()
    },
    setTagNumber() {
        const {startTime, endTime, value1, value2, orderTypes} = this.data
        let num = 0
        if (value1 !== '' || value2 !== '') {
            num++;
        }
        if (orderTypes.length > 0) {
            num++;
        }
        if (startTime !== '起始日期' || endTime !== '终止日期') {
            num++;
        }
        this.setData({tagNumber: num})
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
    computeHeight() {
        const that = this
        const query = wx.createSelectorQuery()
        query.selectAll('.c-height').boundingClientRect()
        query.selectViewport().boundingClientRect()
        query.exec(function (res) {
            const {safeArea: {bottom}, screenHeight} = app.globalData.sysInfo
            const safeBottom = screenHeight - bottom
            const total = res[0].reduce((acc, nodeInfo) => acc + nodeInfo.height, 0)
            console.log(res)
            that.setData({
                listHeight: res[1].height - total - safeBottom,
            })
        })
    }
});
