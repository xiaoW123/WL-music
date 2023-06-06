// pages/detail-song/detail-song.js
import { createStoreBindings, storeBin } from "mobx-miniprogram-bindings";
import { store } from "../../store/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    songInfo: {},
    key: null,
    isLoading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["recommendSongs", "peakRankingList", "songListItemData"],
    });
    this.setData({
      type: options.type,
      key: options.key - 0,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    if (this.data.type === "recommend") {
      this.setData({
        songInfo: this.data.recommendSongs,
      });
    } else if (this.data.type === "ranking") {
      const arr = this.data.peakRankingList.find((item) => {
        return item.playlist.id === this.data.key;
      });
      this.setData({
        songInfo: arr.playlist,
      });
    } else {
      this.setData({
        songInfo: this.data.songListItemData,
      });
    }
    this.setData({
      isLoading: false,
    });
  },

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
