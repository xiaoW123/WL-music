// components/ranking-item/ranking-item.js
Component({
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
    onRankingItemTap() {
      const key = this.properties.itemData.playlist.id
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=ranking&key=${key}`,
      })
    }
  },
});
