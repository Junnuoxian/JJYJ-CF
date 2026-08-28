const app = getApp()

Page({
  data: {
    history: []
  },

  onShow() {
    let rawHistory = wx.getStorageSync('historyOrders') || [];
    
    // 格式化时间
    const history = rawHistory.map(item => {
      const date = new Date(item.finishTime);
      return {
        ...item,
        dateStr: `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
      }
    }).reverse(); // 倒序，最新的在上面

    this.setData({ history })
  }
})
