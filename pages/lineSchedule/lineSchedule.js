const app = getApp()
Page({
    data: {
        days: [],
        currentSelectDate: '',
        scheduledLines: [],
        selectedScheduledLine: {},
    },
    onLoad: function (options) {
        this.getDays()

        const scheduledLines = []
        for (let i = 0; i < 12; i++) {
            scheduledLines.push({
                no: 'NDGY1230',
                from: '大武口汽车站',
                to: '银川河东机场',
                price: '88',
            })
        }
        this.setData({scheduledLines})
    },
    getDays() {
        const paddingStart = (s) => {
            s += '';
            if (s.length === 1) {
                s = s.padStart(2, '0')
            }
            return s
        }
        const map = {
            '1': '周一',
            '2': '周二',
            '3': '周三',
            '4': '周四',
            '5': '周五',
            '6': '周六',
            '0': '周天',
        }
        const arr = [{label: '今天'}, {label: '明天'}, {label: '后天'}]
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i)
            const today = newDate.getDay()
            const month = newDate.getMonth() + 1
            const date = newDate.getDate()
            if (i >= 3) {
                arr[i] = {}
                arr[i].label = map[today]
            }
            arr[i].date = paddingStart(month) + '-' + paddingStart(date)
        }
        this.setData({
            days: arr,
            currentSelectDate: arr[0].date
        })
    },
    changeDate(e) {
        const day = e.currentTarget.dataset.day
        this.setData({currentSelectDate: day.date})
    },
    goBack() {
        app.defaultCustomNavClick()
    },
    gotoPage(e) {
        const selectedScheduledLine = e.currentTarget.dataset.item
        this.setData({selectedScheduledLine})
        app.globalData.currentOrder.currentSelectDate = this.data.currentSelectDate
        app.globalData.currentOrder.selectedScheduledLine = this.data.selectedScheduledLine
        console.log(app.globalData.currentOrder)
        app.navigate(e)
    }
});
