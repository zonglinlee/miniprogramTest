const app = getApp()
Component({
    properties: {
        show: Boolean
    },
    data: {
        selectedPassenger: [false, false, false],
        passengerList: [
            {
                name: '张三1',
                idCard: '640106201708487878',
                mobile: '17809527290',
            },
            {
                name: '张三2',
                idCard: '640106201708487878',
                mobile: '17809527290',
            },
            {
                name: '张三3',
                idCard: '640106201708487878',
                mobile: '17809527290',
            },
            {
                name: '张三4',
                idCard: '640106201708487878',
                mobile: '17809527290',
            },
            {
                name: '张三5',
                idCard: '640106201708487878',
                mobile: '17809527290',
            },
            {
                name: '张三6',
                idCard: '640106201708487878',
                mobile: '17809527290',
            },
            {
                name: '张三7',
                idCard: '640106201708487878',
                mobile: '17809527290',
            }
        ]
    },
    methods: {
        onClose() {
            this.setData({show: false})
            this.triggerEvent('closePopup', {})
        },
        gotoPage(e) {
            app.navigate(e)
        },
        confirmSelect() {
            const selectedPassenger = this.data.passengerList.filter((item, index) => this.data.selectedPassenger[index])
            console.log(selectedPassenger)
            this.triggerEvent('closePopup', {selectedPassenger})
        },
        selectPassenger(e) {
            const passenger = e.currentTarget.dataset.passenger
            const index = e.currentTarget.dataset.index
            const tem = [...this.data.selectedPassenger]
            tem[index] = !tem[index]
            this.setData({selectedPassenger: tem})
        }
    }
});
