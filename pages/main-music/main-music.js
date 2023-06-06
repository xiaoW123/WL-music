// pages/main-music/main-music.js
import {
  getSwiperInfo,
  getPlaylistDetail,
  getHotSongList,
  getSongListData,
} from "../../servers/music";
import quertSelect from "../../utils/query-select"; // 获取元素高度
import { throttle } from "underscore"; // 引入节流函数
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/index";

// 因为轮播图片有多张，所以会加载执行多次onBannerImageLoad,使用节流函数
const querySelectThrottle = throttle(quertSelect, 2000);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    bannerList: [],
    bannerHeight: 0,
    sixRecommendSongs: [],
    hotSongListOne: [],
    tags: [],
    peakRankingList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["recommendSongs"],
      actions: [
        "getRecommendSongs",
        "getSongListDataAction",
        "getPeakRankingList",
      ],
    });
    this.fetchSwiperInfo();
    this.fetchPlaylistDetail();
    this.fetchHotSongList();
    this.fetchPeakRanking();
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
  // 获取歌曲排行
  fetchPlaylistDetail() {
    this.setData({
      isLoading: true,
    });
    getPlaylistDetail(3778678).then((res) => {
      this.setData({
        sixRecommendSongs: res.playlist.tracks.splice(0, 6),
      });
      this.getRecommendSongs(res.playlist);
      this.setData({
        isLoading: false,
      });
    });
  },

  // 获取热门歌单数据
  fetchHotSongList() {
    getHotSongList().then(({ tags }) => {
      this.setData({
        tags: tags,
      });
      const arrPromise = [];
      tags.forEach((item) => {
        arrPromise.push(getSongListData(item.name, 6));
      });
      Promise.all(arrPromise).then((res) => {
        this.getSongListDataAction(res);
      });
    });
    Promise.all([getSongListData("全部", 6), getSongListData("华语", 6)]).then(
      (res) => {
        this.setData({
          hotSongListOne: res,
        });
      }
    );
  },

  // 获取巅峰榜单数据
  fetchPeakRanking() {
    // 新歌 id=3779629 原创 id=2884035 飙升 id=19723756
    Promise.all([
      getPlaylistDetail(3779629),
      getPlaylistDetail(2884035),
      getPlaylistDetail(19723756),
    ]).then((res) => {
      this.setData({
        peakRankingList: res,
      });
      this.getPeakRankingList(res)
    });
  },

  // 获取组件高度Height-图片加载完毕
  onBannerImageLoad() {
    querySelectThrottle(".banner-image").then((res) => {
      this.setData({
        bannerHeight: res[0].height,
      });
    });
  },

  // 推荐歌曲，更多事件，
  onRecommendMoreClick() {
    wx.navigateTo({
      url: "/pages/detail-song/detail-song?type=recommend",
    });
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
