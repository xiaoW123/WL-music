
Component({
  properties: {
    title: {
      type: String,
      value: "默认标题",
    },
    hasMore: {
      type: Boolean,
      value: true,
    },
  },
  data: {

  },
  methods: {
    onMoreTap() {
      this.triggerEvent('moreclick')
    },

  }
});