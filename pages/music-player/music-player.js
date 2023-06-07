// pages/music-player/music-player.js
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/index";
import { throttle } from "underscore";
import { parseLyric } from "../../utils/parse-lyric";

const app = getApp();
const audioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: 20,
    currentPage: 0,
    contentHeight: 555,
    currentSong: [],
    id: 0,
    currentTime: 0,
    durationTime: 0,
    isPlaying: false,
    isFirstPlay: true,
    lyricInfos: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindsing = createStoreBindings(this, {
      store,
      fields: ["musicInfo", "musicGc"],
    });
    // 设备信息
    this.setData({ statusHeight: app.globalData.statusHeight });
    this.setData({ contentHeight: app.globalData.windowHeight });
    this.setData({
      id: options.id,
    });
  },
  onBackTap() {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(this.data.musicInfo);
    this.setData({
      currentSong: this.data.musicInfo[0],
      durationTime: this.data.musicInfo[0].dt,
    });
    this.setData({
      lyricInfos: parseLyric(this.data.musicGc.lyric),
    });
    console.log(parseLyric(this.data.musicGc.lyric));
    this.setupAudioPlayer();
  },
  // 播放
  setupAudioPlayer() {
    // 1.歌曲播放
    audioContext.stop();
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`;
    audioContext.autoplay = true;
    this.setData({
      isPlaying: true,
    });

    // 2.进度监听
    if (this.data.isFirstPlay) {
      this.onAudioContextListener();
      this.data.isFirstPlay = false;
    }
  },
  // 点击暂停
  onPlayOrPauseTap() {
    if (audioContext.paused) {
      audioContext.play();
      // playerStore.setState("isPlaying", true);
      this.setData({
        isPlaying: true,
      });
    } else {
      audioContext.pause();
      // playerStore.setState("isPlaying", false);
      this.setData({
        isPlaying: false,
      });
    }
    // playerStore.dispatch("changePlayStatusAction")
  },
  // 匹配歌词
  onAudioContextListener() {
    const updateProress = throttle(this.updateProgress, 1000);
    audioContext.onTimeUpdate(() => {
      updateProress();
      this.setData({ currentTime: audioContext.currentTime * 1000 });

      // 匹配歌词
      if (!this.data.lyricInfos.length) return;
      let index = this.data.lyricInfos.length - 1;
      for (let i = 0; i < this.data.lyricInfos.length; i++) {
        const lyricItem = this.data.lyricInfos[i];
        if (lyricItem.time >= this.data.currentTime) {
          index = i - 1;
          break;
        }
      }
      if (index === this.data.currentLyricIndex) return;
      this.setData({
        currentLyricIndex: index,
        currentLyricText: this.data.lyricInfos[index].text,
      });

      // 改变scrollTop
      this.setData({ lyricScrollTop: index * 35 });
    });

    audioContext.onWaiting(() => {
      audioContext.pause();
    });

    audioContext.onCanplay(() => {
      audioContext.play();
    });
  },
  onSwiperChange(event) {
    const currentPage = event.detail.current;
    this.setData({ currentPage });
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
