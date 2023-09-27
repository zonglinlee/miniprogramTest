const app = getApp()
module.exports = Behavior({
    behaviors: [],
    properties: {},
    data: {},
    attached: function () {
    },
    methods: {
        async getCityList() {
            const mapSdk = app.globalData.mapSdk
            return new Promise((resolve, reject) => {
                mapSdk.getCityList({
                    success: function (res) {//成功后的回调
                        resolve(res)
                    },
                    fail: function (error) {
                        reject(error)
                    },
                    complete: function (res) {
                        resolve(res)
                    }
                })
            })
        },
        async suggest(keyword, region) {
            const mapSdk = app.globalData.mapSdk
            const res = await new Promise((resolve, reject) => {
                mapSdk.getSuggestion({
                    //获取输入框值并设置keyword参数
                    keyword, //用户输入的关键词，可设置固定值,如keyword:'KFC'
                    region, //设置城市名，限制关键词所示的地域范围，非必填参数
                    success: function (res) {//搜索成功后的回调
                        resolve(res)
                    },
                    fail: function (error) {
                        reject(error)
                    },
                    complete: function (res) {
                        resolve(res)
                    }
                });
            })
            const sug = [];
            for (let i = 0; i < res.data.length; i++) {
                sug.push({ // 获取返回结果，放到sug数组中
                    title: res.data[i].title,
                    id: res.data[i].id,
                    addr: res.data[i].address,
                    city: res.data[i].city,
                    district: res.data[i].district,
                    latitude: res.data[i].location.lat,
                    longitude: res.data[i].location.lng
                });
            }
            return sug
        },
        async getDrivingLine(from, to) {
            //调用距离计算接口
            const mapSdk = app.globalData.mapSdk
            const ret = await new Promise((resolve, reject) => {
                mapSdk.direction({
                    mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
                    from,//from参数不填默认当前地址
                    to,
                    success: function (res) {
                        resolve(res)
                    },
                    fail: function (error) {
                        reject(error)
                    },
                    complete: function (res) {
                        resolve(res)
                    }
                });
            })

            let coors = ret.result.routes[0].polyline, pl = [];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            let kr = 1000000;
            for (let i = 2; i < coors.length; i++) {
                coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (let i = 0; i < coors.length; i += 2) {
                pl.push({latitude: coors[i], longitude: coors[i + 1]})
            }
            //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
            return pl
        }
    }
})
