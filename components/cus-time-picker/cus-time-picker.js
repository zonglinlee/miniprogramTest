Component({
    externalClasses: ['custom-class'],
    properties: {},
    data: {
        days: [],
        currentSelectDate: '',
        sliderSlide: 'translateX(0)',
        dayIndex: 0,
        timeRanges: [],
        timeRange: '',
        timeRangeIndex: 0,
        scrollTop: 0,
    },
    lifetimes: {
        ready() {
            this.getDays()
            const now = new Date()
            const hour = now.getHours()
            const min = now.getMinutes()
            this.getTimeRanges(hour, min >= 30)
        }

    },
    methods: {
        getDays() {
            const paddingStart = (s) => {
                s += '';
                if (s.length === 1) {
                    s = s.padStart(2, '0')
                }
                return s
            }
            const map = {
                '1': '星期一',
                '2': '星期二',
                '3': '星期三',
                '4': '星期四',
                '5': '星期五',
                '6': '星期六',
                '0': '星期日',
            }
            const arr = [{label: '今天'}, {label: '明天'}]
            for (let i = 0; i < 5; i++) {
                const newDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i)
                const today = newDate.getDay()
                const month = newDate.getMonth() + 1
                const date = newDate.getDate()
                if (i >= 2) {
                    arr[i] = {}
                    arr[i].label = map[today]
                }
                arr[i].date = paddingStart(month) + '月' + paddingStart(date) + '日'
            }
            this.setData({
                days1: arr,
                days: arr,
                currentSelectDate: arr[0].date
            })
        },
        changeDay(e) {
            const day = e.currentTarget.dataset.day
            const index = e.currentTarget.dataset.index
            this.setData({
                sliderSlide: `translateX(${index * 100}%)`,
                dayIndex: index,
                scrollTop: 0,
                currentSelectDate: day.date
            })
        },
        getTimeRanges(start = 6, half = false) {
            const arr = []
            for (let i = start; i < 20; i++) {
                let padI = i < 10 ? `0${i}` : `${i}`
                let padI1 = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`
                let str1 = `${padI}:00-${padI}:30`
                let str2 = `${padI}:30-${padI1}:00`
                arr.push(str1)
                arr.push(str2)
            }
            if (half) arr.unshift()
            this.setData({
                timeRanges: arr
            })
        },
        confirmSelect() {
            const {currentSelectDate, timeRange} = this.data
            this.triggerEvent('confirm', {currentSelectDate,timeRange})
        },
        selectTimeRange(e) {
            const time = e.currentTarget.dataset.time
            const index = e.currentTarget.dataset.index
            const {dayIndex} = this.data

            this.setData({
                timeRange: time,
                timeRangeIndex: dayIndex
            })
            console.log(time, dayIndex)
        }
    },
    observers: {
        'dayIndex': function (dayIndex) {
            if (dayIndex === 0) {
                const now = new Date()
                const hour = now.getHours()
                const min = now.getMinutes()
                this.getTimeRanges(hour, min >= 30)
            } else {
                this.getTimeRanges()
            }
        },
    }
});
