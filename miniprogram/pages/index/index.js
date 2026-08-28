const app = getApp()

Page({
  data: {
    selectedRole: null
  },

  onLoad() {
    // 检查是否已有缓存角色
    const role = wx.getStorageSync('userRole')
    if (role) {
      app.globalData.role = role;
      wx.switchTab({
        url: '/pages/menu/menu',
      })
    }
  },

  selectRole(e) {
    const role = e.currentTarget.dataset.role;
    this.setData({ selectedRole: role });
    app.globalData.role = role;
    wx.setStorageSync('userRole', role);
    wx.showToast({
      title: '已选择角色',
      icon: 'success'
    });
  },

  enterApp() {
    wx.switchTab({
      url: '/pages/menu/menu',
    })
  },

  onShareAppMessage() {
    return {
      title: '快来加入我们的干饭小分队！',
      path: '/pages/index/index'
    }
  }
})
