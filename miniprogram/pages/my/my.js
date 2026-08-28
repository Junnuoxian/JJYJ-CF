const app = getApp();

Page({
  data: {
    userInfo: null,
    role: null,
    partnerId: null
  },

  onShow() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      role: app.globalData.role || wx.getStorageSync('userRole'),
      partnerId: wx.getStorageSync('partnerId')
    });
  },

  login() {
    // 模拟微信授权登录
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        const userInfo = res.userInfo;
        wx.setStorageSync('userInfo', userInfo);
        this.setData({ userInfo });
        wx.showToast({ title: '登录成功', icon: 'success' });
        
        // 登录成功后，如果没有选过角色，跳回首页去选
        if (!this.data.role) {
          wx.reLaunch({ url: '/pages/index/index' });
        }
      },
      fail: () => {
        wx.showToast({ title: '已取消登录', icon: 'none' });
      }
    });
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          app.globalData.role = null;
          this.setData({ userInfo: null, role: null, partnerId: null });
          wx.reLaunch({ url: '/pages/index/index' });
        }
      }
    });
  },

  unbind() {
    wx.showModal({
      title: '解除绑定',
      content: '解除绑定后，你们将回到单机模式，确定解除吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('partnerId');
          this.setData({ partnerId: null });
          wx.showToast({ title: '已解绑', icon: 'success' });
        }
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '快来加入我的专属御膳房！',
      path: '/pages/index/index?invite=12345' // 模拟邀请码
    }
  }
});
