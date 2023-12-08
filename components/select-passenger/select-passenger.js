const app = getApp()
Component({
    properties: {
        show: Boolean,
        selectedList: {
            type: Array,
            value: []
        }
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
                idCard: '640106201708487877',
                mobile: '17809527290',
            },
            {
                name: '张三3',
                idCard: '640106201708487876',
                mobile: '17809527290',
            },
            {
                name: '张三4',
                idCard: '640106201708487875',
                mobile: '17809527290',
            },
            {
                name: '张三5',
                idCard: '640106201708487874',
                mobile: '17809527290',
            },
            {
                name: '张三6',
                idCard: '640106201708487873',
                mobile: '17809527290',
            },
            {
                name: '张三7',
                idCard: '640106201708487872',
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
            this.triggerEvent('closePopup', {selectedPassenger})
        },
        initSelectedList() {
            const {passengerList, selectedList} = this.data
            let selectedPassenger = []
            for (let i = 0; i < passengerList.length; i++) {
                let flag = false
                for (let j = 0; j < selectedList.length; j++) {
                    if (selectedList[j].idCard === passengerList[i].idCard) {
                        flag = true
                        break
                    }
                }
                selectedPassenger.push(flag)
            }
            this.setData({selectedPassenger})
        },
        selectPassenger(e) {
            const passenger = e.currentTarget.dataset.passenger
            const index = e.currentTarget.dataset.index
            const tem = [...this.data.selectedPassenger]
            tem[index] = !tem[index]
            this.setData({selectedPassenger: tem})
        }
    },
    observers: {
        'show': function (show) {
            console.log(show)
            this.initSelectedList()
        }
    }
});
