const mapBehavior = require("../../assets/js/qqmap-wx-jssdk1.2/mapBehavior");
import {CITY_LIST, CITY_GROUP_BY_LETTERS, HOT_CITY_LIST, LETTERS} from "./citydata";

Component({
    properties: {
        show: Boolean
    },
    behaviors: [mapBehavior],
    data: {
        cityGroupByLetters: CITY_GROUP_BY_LETTERS,
        hotCities: HOT_CITY_LIST,
        letters: LETTERS,
        cityHeight: 0,
        cityInput: ''
    },
    methods: {
        cancel() {
            this.setData({cityInput: ''})
            this.triggerEvent('closeCity', null)
        },
        computeHeight() {
            const that = this
            const query = wx.createSelectorQuery().in(this)
            query.select('.search-wrapper').boundingClientRect()
            query.select('.city-nav').boundingClientRect()
            query.selectViewport().boundingClientRect()
            query.exec(function (res) {
                const sysInfo = wx.getSystemInfoSync()
                // console.log('24342443242342342342342434', res)
                that.setData({
                    cityHeight: res[2].height - res[0].height - res[1].height,
                })
            })
        },
        tapCity(e) {
            const city = e.currentTarget.dataset.city
            this.triggerEvent('closeCity', city)
        }
    },
    observers: {
        'show': function (show) {
            if (show) {
                wx.nextTick(async () => {
                    this.computeHeight()
                    // const res = await this.getCityList()
                    // console.log(res);
                    // if (res.status === 0) {
                    //     this.setData({
                    //         cityLists: []
                    //     })
                    // }
                })
            }
        },
        'cityInput': function (val) {
            if (val) {
                const cityGroupByLetters = []
                const letters = []
                for (let i = 0; i < CITY_GROUP_BY_LETTERS.length; i++) {
                    const list = CITY_GROUP_BY_LETTERS[i]
                    const temp = list.filter(item => item.city.indexOf(val) !== -1 || item.short.toLowerCase().indexOf(val.toLowerCase()) !== -1)
                    if (temp.length > 0) {
                        cityGroupByLetters.push(temp)
                        letters.push(LETTERS[i])
                    }
                }
                this.setData({
                    cityGroupByLetters,
                    letters
                })
            }
        }
    },
});
