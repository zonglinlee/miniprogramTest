const app = getApp()
Component({
    properties: {
        show: Boolean
    },
    data: {},
    methods: {
        onClose() {
            this.setData({show: false})
            this.triggerEvent('closePopup', {})
        },
        gotoPage(e) {
            app.navigate(e)
        },
        confirmSelect() {
            this.triggerEvent('closePopup', {})
        }
    }
});
