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
  methods:{
    onMoreTap(){
      this.triggerEvent('moreclick')
    }
  }
});
