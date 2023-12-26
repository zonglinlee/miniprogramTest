import {line} from "./line";


Page({
    data: {
        carInfo: {
            name: '机场专线',
            currentPosition: '银川火车站',
            waitStop: '河东机场',
            stopsFromCur: '2',
            distances: '12',
            waitingTime: '12',
        },
        line,
        runningCarInfo: [
            {"latitude": 38.47487300000001, "longitude": 106.18169799999995},
            {"latitude": 38.43985900000002, "longitude": 106.18174599999996},
            {"latitude": 38.398016999999996, "longitude": 106.29875699999995}, {
                "latitude": 38.45388000000002,
                "longitude": 106.18171899999996,
                closest: false,
            }, {
                "latitude": 38.422772000000016,
                "longitude": 106.18800499999999,
                closest: true,
                time: 45,
            }]
    },
    onLoad: function (options) {

    },
    refresh() {
        this.setData({
            runningCarInfo: [
                {"latitude": 38.398016999999996, "longitude": 106.29875699999995}, {
                    "latitude": 38.45388000000002,
                    "longitude": 106.18171899999996,
                    closest: false,
                }, {
                    "latitude": 38.422772000000016,
                    "longitude": 106.18800499999999,
                    closest: true,
                    time: Math.random() * 100..toFixed(0),
                }]
        })
    }
});
