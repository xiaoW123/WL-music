// pages/detail-video/detail-video.js
import {
  getVideoDetailInfo,
  getVideoMvUrl,
  getRelatedVideo,
} from "../../servers/video";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoId: null,
    videoDatilList: {},
    mvUrl: "",
    relatedVideo: [],
    danmuList: [
      { text: "哈哈哈, 真好听", color: "#ff0000", time: 3 },
      { text: "呵呵呵, 不错哦", color: "#ffff00", time: 10 },
      { text: "嘿嘿嘿, 好喜欢", color: "#0000ff", time: 15 },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      videoId: options.id,
    });

    this.fetchMvDetil();
    this.fetchMvUrl();
    this.fetchRelatVideo()
  },
  // 获取mv数据
  fetchMvDetil() {
    getVideoDetailInfo(this.data.videoId).then(({ data }) => {
      this.setData({
        videoDatilList: data,
      });
      console.log('mv数据---',this.data.videoDatilList);
    });
  },
  // 获取mv地址
  fetchMvUrl() {
    getVideoMvUrl(this.data.videoId).then(({ data }) => {
      this.setData({
        mvUrl: data.url,
      });
      console.log('mvUrl---',this.data.mvUrl);
    });
  },
  fetchRelatVideo() {
    getRelatedVideo(this.data.videoId).then(({data}) => {
      this.setData({
        relatedVideo: data
      })
      console.log('relatVideo---',this.data.relatedVideo);

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
