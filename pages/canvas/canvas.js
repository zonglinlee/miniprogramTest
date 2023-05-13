// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctx: null,
    canvas: null,
    windowWidth: 0,
    pixelRatio: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initCanvas()
  },
  initCanvas() {
    wx.createSelectorQuery()
      .select('#myCanvas') // 在 WXML 中填入的 id
      .fields({
        node: true,
        size: true
      })
      .exec(async (res) => {
        // Canvas 对象
        const canvas = res[0].node
        // 渲染上下文
        const ctx = canvas.getContext('2d')
        // Canvas 画布的实际绘制宽高
        const width = res[0].width
        const height = res[0].height
        // 初始化画布大小
        const {
          pixelRatio: dpr,
          windowWidth
        } = await wx.getSystemInfo()
        canvas.width = width * dpr
        canvas.height = height * dpr
        // ctx.scale(dpr, dpr)
        this.setData({
          canvas,
          ctx,
          windowWidth,
          pixelRatio: dpr
        })
        this.drawImage()
      })
  },
  drawImage() {
    const {
      canvas,
      ctx,
      pixelRatio,
      windowWidth
    } = this.data
    const image = canvas.createImage()
    image.onload = () => {
      // 将图片绘制到 canvas 上
      // debugger
      console.log('imageinfo:', image, this.data)
      const {
        width,
        height
      } = image
      const drawHeight = (windowWidth / (width / height)) * pixelRatio
      ctx.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, drawHeight)
    }
    image.src = 'https://img95.699pic.com/photo/40019/3927.jpg_wh300.jpg'
  },
  tapCanvas(event) {
    const {
      x,
      y
    } = event.detail
    const {
      ctx,
      pixelRatio
    } = this.data
    ctx.strokeStyle = "#ff0000"
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x * pixelRatio, y * pixelRatio, 50, 0, 2 * Math.PI);
    ctx.stroke();
    wx.showToast({
      title: '画了一个圈',
      icon: 'none',
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})