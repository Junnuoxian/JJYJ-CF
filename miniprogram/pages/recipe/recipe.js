Page({
  data: {
    dishId: null
  },
  onLoad(options) {
    if (options.id) {
      this.setData({ dishId: options.id })
    }
  }
})
