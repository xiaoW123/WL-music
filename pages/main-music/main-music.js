// pages/main-music/main-music.js
import { getSwiperInfo } from "../../servers/music";
import quertSelect from "../../utils/query-select"; // 获取元素高度
import { throttle } from "underscore"; // 引入节流函数

// 因为轮播图片有多张，所以会加载执行多次onBannerImageLoad,使用节流函数
const querySelectThrottle = throttle(quertSelect, 2000);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    bannerHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchSwiperInfo();
  },
  // 搜索框点击
  onSearchClick() {
    wx.navigateTo({
      url: "/pages/detail-search/detail-search",
    });
  },
  // 轮播图数据请求
  fetchSwiperInfo() {
    getSwiperInfo().then((res) => {
      this.setData({
        bannerList: res.banners,
      });
    });
  },
  // 获取组件高度Height-图片加载完毕
  onBannerImageLoad() {
    querySelectThrottle(".banner-image").then((res) => {
      console.log(res);
      this.setData({
        bannerHeight: res[0].height,
      });
    });
  },

  // 推荐歌曲，更多事件
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
