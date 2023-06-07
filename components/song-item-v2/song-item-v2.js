// components/song-item-v2/song-item-v2.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../../store/index";
import { getMusicGc, getMusicInfo } from "../../servers/player";
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    actions: {
      getMusicInfoAction: "getMusicInfoAction",
      getMusicGcAction: "getMusicGcAction",
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
    index: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onSongItemTap(){
      const id = this.properties.itemData.id;
      getMusicInfo(id).then((res) => {
        this.getMusicInfoAction(res.songs);
      });
      getMusicGc(id).then((res) => {
        this.getMusicGcAction(res.lrc);
      });
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      });
      console.log(this.data.itemData);

      console.log(this.data.itemData.id);
    }
  },
});
