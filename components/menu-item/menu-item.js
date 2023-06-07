// components/menu-item/menu-item.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../../store/index";
import { getPlaylistDetail } from "../../servers/music";
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      songListItemData: "songListItemData",
    },
    actions: {
      getSongListItemData: "getSongListItemData",
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
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onMenuItemTap() {
      const id = this.data.itemData.id;
      console.log(id);
      getPlaylistDetail(id).then(res=>{
        this.getSongListItemData(res.playlist)
      })
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=menu&id=${id}`,
      });
    },
  },
});
