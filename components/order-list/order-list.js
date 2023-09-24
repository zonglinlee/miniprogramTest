Component({
    properties: {
        orderType: {
            type: String,
        },
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
        orderList: []
    },
    methods: {
        itemClick: function (e) {
            let item = e.currentTarget.dataset.item
            this.setData({currentSelect: item})
            console.log("itemClick；this.orderType", this.data.orderType)
            const myEventDetail = {item} // detail对象，提供给事件监听函数
            const myEventOption = {item} // 触发事件的选项
            this.triggerEvent('item-click', myEventDetail, myEventOption)
        }
    }
});
