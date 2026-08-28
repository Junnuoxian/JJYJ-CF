const app = getApp()

Page({
  data: {
    role: null,
    dishes: [
      { id: 1, name: '西红柿炒鸡蛋', tags: ['快手菜', '家常'], ingredients: ['西红柿', '鸡蛋', '葱'] },
      { id: 2, name: '红烧肉', tags: ['硬菜', '解馋'], ingredients: ['五花肉', '冰糖', '八角', '生姜'] },
      { id: 3, name: '可乐鸡翅', tags: ['甜口', '肉类'], ingredients: ['鸡翅', '可乐', '姜片'] },
      { id: 4, name: '酸辣土豆丝', tags: ['下饭', '素菜'], ingredients: ['土豆', '干辣椒', '醋'] }
    ]
  },

  onShow() {
    this.setData({
      role: app.globalData.role || wx.getStorageSync('userRole')
    })
  },

  orderDish(e) {
    const dish = e.currentTarget.dataset.dish;
    wx.showModal({
      title: '确认点单',
      content: `确定要点【${dish.name}】吗？`,
      success (res) {
        if (res.confirm) {
          // 这里将来会写入云数据库，目前用本地存储模拟
          let currentOrders = wx.getStorageSync('currentOrders') || [];
          currentOrders.push({
            ...dish,
            orderTime: new Date().getTime(),
            status: 'pending' // pending, shopping, cooking, done
          });
          wx.setStorageSync('currentOrders', currentOrders);
          
          wx.showToast({
            title: '点单成功',
            icon: 'success'
          })
        }
      }
    })
  }
})
