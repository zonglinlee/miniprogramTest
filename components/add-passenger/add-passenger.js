Component({
    properties: {
        show: Boolean
    },
    data: {},
    methods: {
        onClose() {
            this.setData({show: false})
            this.triggerEvent('closePopup', {})
        }
    }
});
