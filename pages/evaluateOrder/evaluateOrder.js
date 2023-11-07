const app = getApp()
Page({
    data: {
        evaIndex: '1',
        evaTitle: '不满意，我要吐槽',
        evaTips: ['未提醒系安全带', '车内不整洁', '车内有异味', '导航绕路(堵车)'],
        selectedTipIndex: [],
        btnOk: false,
        evaluate: ''
    },
    onLoad: function (options) {
        this.data.selectedTipIndex = this.data.evaTips.map(item => false)
    },
    selectTip(e) {
        const index = e.currentTarget.dataset.index
        this.data.selectedTipIndex[index] = !this.data.selectedTipIndex[index]
        this.setData(
            {
                selectedTipIndex: [...this.data.selectedTipIndex],
            }
        )
        this.setBtnOk()
    },
    setBtnOk() {
        const {selectedTipIndex, evaluate} = this.data
        const len = selectedTipIndex.filter(item => item).length
        if (len > 0 || evaluate) {
            this.setData(
                {
                    btnOk: true,
                }
            )
        } else {
            this.setData(
                {
                    btnOk: false,
                }
            )
        }
    },
    inputEvaluate(e) {
        this.setData({
            evaluate: e.detail.value
        })
        this.setBtnOk()
    },
    focusInput() {
    },
    clickIcon(e) {
        const index = e.currentTarget.dataset.evaindex
        let evaTitle = ''
        let evaTips = []
        if (index === '1') {
            evaTitle = '不满意，我要吐槽'
            evaTips = ['未提醒系安全带', '车内不整洁', '车内有异味', '导航绕路(堵车)']
        }
        if (index === '2') {
            evaTitle = '还可以，以下方面能做的更好'
            evaTips = ['配合开关空调', '接驾地点更准确', '车内更整洁', '驾驶更平稳']
        }
        if (index === '3') {
            evaTitle = '服务太棒啦，我想夸夸司机'
            evaTips = ['配合开关空调', '礼貌道别', '车内无异味', '车内整洁']
        }
        let selectedTipIndex = evaTips.map(item => false)
        this.setData(
            {
                evaIndex: index,
                selectedTipIndex,
                evaTitle,
                evaTips
            }
        )
        this.setBtnOk()
    },
    goBack() {
        app.defaultCustomNavClick()
    },
});
