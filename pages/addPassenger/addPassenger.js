import Toast from '@vant/weapp/toast/toast';
import {isIdCard, isMobile} from "../../utils/util";

const app = getApp()
Page({
    data: {
        name: '',
        idCard: '',
        mobile: '',
        passengers: [{name: '张三丰', idCard: '622826199111231270', mobile: '15809527290'}],
        cardHeight: 400,
        sHeight: 600,
        show: false
    },
    onLoad: function (options) {

    },
    async onReady() {
        const res1 = await app.computeRec()
        const res2 = await app.computeRec('.custom-nav')
        // console.log(res2, res1)

        const h = res1[0].height - res2[0].height
        this.setData({
            cardHeight: h - 15 - 12,
            sHeight: res1[0].height
        })
    },
    saveInfo() {
        // console.log(this.data)
        const {name, idCard, mobile} = this.data
        if (!name) {
            Toast({duration: 2000, message: '请填写姓名'});
            return;
        }
        if (!idCard) {
            Toast({duration: 2000, message: '请填写身份证号'});
            return;
        }
        const {tip, pass} = isIdCard(idCard)
        if (!pass) {
            Toast({duration: 2000, message: tip});
            return;
        }
        if (!mobile) {
            Toast({duration: 2000, message: '请填写手机号'});
            return;
        }
        if (!isMobile(mobile)) {
            Toast({duration: 2000, message: '手机号格式不正确'});
            return;
        }
        console.log('submit')

    },
    openPopup() {
        this.setData({
            show: true
        })
    },
    closePopup() {
        this.setData({
            show: false
        })
    },
    editInfo(e) {
        const info = e.currentTarget.dataset.info
        // console.log(info)
        this.setData({
            isEdit: true,
            show: true,
            name: info.name,
            idCard: info.idCard,
            mobile: info.mobile,
        })
    },
    deleteInfo(e) {
        const info = e.currentTarget.dataset.info
        console.log(info)
    },
});
