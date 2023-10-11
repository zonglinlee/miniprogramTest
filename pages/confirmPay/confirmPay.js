const app = getApp()
Page({
    data: {
        markers: [
            {
                id: 200,
                latitude: 39.90,
                longitude: 116.40,
                // iconPath: '../../assets/images/select_position.svg',
                // iconPath: 'http://s1dkzsmpj.hb-bkt.clouddn.com/select_position.png',
                width: 20,
                height: 20,
                customCallout: {
                    display: 'ALWAYS'
                }
            }
        ],
        destination: {
            latitude: 39.90,
            longitude: 116.40,
        },
    },
    onLoad: function (options) {

    },
    cancelOrder() {
    },
    doPay() {
        setTimeout(() => {
            app.navigate('/pages/paymentResult/paymentResult')
        }, 2000)
    },
    goBack() {
        app.defaultCustomNavClick()
    }
});
