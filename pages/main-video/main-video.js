// pages/main-video/main-video.js
import {
  getTopMV
} from '../../servers/video.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    offset: 0,
    hasMore: true,
    limit: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchTopMV()
  },

  // =================  发送网络请求的方法 =================  
  async fetchTopMV() {
    const data = await getTopMV(this.data.offset, this.data.limit)
    const newVideoList = [...this.data.videoList,...data.data]
    this.setData({
      videoList: newVideoList
    })
    this.data.hasMore = data.hasMore
    this.data.offset = this.data.videoList.length
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  openItemDetail(event) {
    const itemId = event.target.dataset.item.id
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${itemId}`,
    })
  },
 async onPullDownRefresh() {
    //  重置数据
    this.setData({
      videoList: [],
      offset: 0,
      hasMore: true,
    })
    // 重新请求
    await this.fetchTopMV()

    // 关闭下拉刷新
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    if(!this.data.hasMore) {
      this.setData({
       hasMore:false
      })

      return
    }
    this.fetchTopMV(this.data.offset)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})