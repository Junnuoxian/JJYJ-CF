const app = getApp()

Page({
  data: {
    role: null,
    orders: [],
    statusMap: {
      'pending': '待处理',
      'cooking': '正在热火朝天做饭中...',
      'done': '饭做好啦！'
    }
  },

  onShow() {
    this.setData({
      role: app.globalData.role || wx.getStorageSync('userRole'),
      orders: wx.getStorageSync('currentOrders') || []
    })
  },

  updateStatus(e) {
    const { index, status } = e.currentTarget.dataset;
    let orders = this.data.orders;
    orders[index].status = status;
    
    this.setData({ orders });
    wx.setStorageSync('currentOrders', orders);

    if(status === 'done') {
      wx.showToast({
        title: '已呼叫！',
        icon: 'success'
      })
    }
  },

  cuiCan() {
    wx.vibrateLong();
    wx.showToast({
      title: '催饭信号已发出！',
      icon: 'none'
    })
  },

  finishOrder(e) {
    const { index } = e.currentTarget.dataset;
    let orders = this.data.orders;
    let history = wx.getStorageSync('historyOrders') || [];
    
    // 移入历史记录
    let finishedOrder = orders.splice(index, 1)[0];
    finishedOrder.finishTime = new Date().getTime();
    history.push(finishedOrder);

    this.setData({ orders });
    wx.setStorageSync('currentOrders', orders);
    wx.setStorageSync('historyOrders', history);

    wx.showToast({
      title: '吃饱啦',
      icon: 'success'
    })
  }
})
