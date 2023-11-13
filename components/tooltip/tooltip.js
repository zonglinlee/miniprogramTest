const app = getApp()
Component({
    properties: {
        tips: String
    },
    data: {
        visible: false,
        wrapperStyles: "",
        arrowStyles: "",
    },
    externalClasses: ['custom-arrow', 'custom-close','custom-btn'],
    methods: {
        show() {
            let wrapperStyles = ''
            let arrowStyles = ''
            setTimeout(() => {
                const query = wx.createSelectorQuery().in(this)
                query.select('#tooltip-btn').boundingClientRect()
                const that = this
                query.exec(res => {
                    console.log(res)
                    const {left, top, right, width, height} = res[0]
                    const {screenWidth, windowWidth} = app.globalData.sysInfo
                    const _right = screenWidth - right
                    const position = left > _right ? 'left' : 'right'
                    if (position === "left") {
                        wrapperStyles = `right:${width + 7}px;width:${left - 7 - 5}px;`
                        arrowStyles = `right:${-10}rpx`
                    }
                    if (position === "right") {
                        wrapperStyles = `left:${width + 7}px;width:${_right - 7 - 5}px;`
                        arrowStyles = `left:${-10}rpx`
                    }
                    that.setData({
                        visible: true,
                        wrapperStyles,
                        arrowStyles,
                    })
                    const query1 = wx.createSelectorQuery().in(this)
                    query1.select('.tooltip-content').boundingClientRect()
                    query1.exec(
                        res => {
                            const {height: heightContent} = res[0]
                            wrapperStyles += `top:-${(heightContent - height) / 2}px`
                            // console.log(res)
                            that.setData({
                                visible: true,
                                wrapperStyles,
                                arrowStyles,
                            })
                        }
                    )
                })
            }, 20)
        },
        close() {
            this.setData({
                visible: false,
            })
        }
    }
});
