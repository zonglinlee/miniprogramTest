// components/custom-nav/custom-nav.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navTitle: String
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        defaultCustomNavClick() {
            wx.navigateBack({})
        }
    }
})
