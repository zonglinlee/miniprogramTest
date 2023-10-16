Component({
    properties: {
        orderType: {
            type: String,
        },
        refresh: {
            type: Boolean
        }
    },
    lifetimes: {
        created: function () {
            console.log("created", this.data.orderType)
        },
        attached: function () {
            console.log("attached", this.data.orderType)
            // 在组件实例进入页面节点树时执行
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        show: function () {
            // 页面被展示
            console.log("show", this.data.orderType)
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    },
    data: {
        currentSelect: '1',
        orderList: [{
            type: '定制班线',
            departureTime: '2023-10-11 16:30',
            from: '金凤区宁夏迪安乐嘉医学检验中心有限责任公司（五里台路口）',
            to: '银川科技厅',
            price: '45.00'
        }, {
            type: '定制班线',
            departureTime: '2023-10-11 16:30',
            from: '金凤区中海国际社区龙湾南门',
            to: '育成中心',
            price: '15.00'
        }, {
            type: '定制班线',
            departureTime: '2023-10-11 16:30',
            from: '金凤区宁夏迪安乐嘉医学检验中心有限责任公司（五里台路口）',
            to: '银川科技厅',
            price: '45.00'
        }, {
            type: '定制班线',
            departureTime: '2023-10-11 16:30',
            from: '金凤区中海国际社区龙湾南门',
            to: '育成中心',
            price: '15.00'
        }],
        total: 12
    },
    methods: {
        itemClick: function (e) {
            let item = e.currentTarget.dataset.item
            this.setData({currentSelect: item})
            console.log("itemClick；this.orderType", this.data.orderType)
            const myEventDetail = {item} // detail对象，提供给事件监听函数
            const myEventOption = {item} // 触发事件的选项
            this.triggerEvent('item-click', myEventDetail, myEventOption)
        },
        onReachBottom() {
            console.log('onReachBottom')
            const temp = [...this.data.orderList, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区宁夏迪安乐嘉医学检验中心有限责任公司（五里台路口）',
                to: '银川科技厅',
                price: '45.00'
            }, {
                type: '定制班线',
                departureTime: '2023-10-11 16:30',
                from: '金凤区中海国际社区龙湾南门',
                to: '育成中心',
                price: '15.00'
            }]

            setTimeout(() => {
                this.setData(
                    {orderList: temp, refresh: false}
                )
            }, 1200)

        }
    },
    observers: {
        'refresh': function (refresh) {
            if (refresh) {
                if (this.data.orderList.length < this.data.total) {
                    this.onReachBottom()
                }
            }
        }
    }

});
