const app = getApp()

Page({
  data: {
    step: 'role', // 'role' | 'pair'
    selectedRole: null,
    myCode: '',
    pairingCode: '',
    copied: false,
    error: ''
  },
  
  onLoad() {
    // 检查是否已绑定
    const isBound = wx.getStorageSync('partner_bound');
    const role = wx.getStorageSync('userRole');
    
    if (isBound && role) {
      app.globalData.role = role;
      wx.switchTab({
        url: '/pages/menu/menu',
      });
      return;
    }

    // 生成或获取邀请码
    let savedCode = wx.getStorageSync('my_invite_code');
    if (!savedCode) {
      savedCode = Math.floor(100000 + Math.random() * 900000).toString();
      wx.setStorageSync('my_invite_code', savedCode);
    }
    this.setData({ myCode: savedCode });
  },

  selectRole(e) {
    const role = e.currentTarget.dataset.role;
    this.setData({ 
      selectedRole: role,
      step: 'pair'
    });
  },

  handleCopy() {
    const roleName = this.data.selectedRole === 'diner' ? '库洛米食客' : '巴库大厨';
    const text = `我是${roleName}，快来和我绑定专属点单系统！我的专属邀请码是：${this.data.myCode}，复制这条消息打开小程序即可绑定~`;
    
    wx.setClipboardData({
      data: text,
      success: () => {
        this.setData({ copied: true });
        setTimeout(() => {
          this.setData({ copied: false });
        }, 3000);
      }
    });
  },

  onCodeInput(e) {
    this.setData({
      pairingCode: e.detail.value,
      error: ''
    });
  },

  handlePair() {
    if (this.data.pairingCode.length === 6) {
      // 本地模拟绑定成功
      wx.setStorageSync('partner_bound', true);
      wx.setStorageSync('userRole', this.data.selectedRole);
      // 同时写入旧版的 partnerId 兼容之前的我的页面逻辑
      wx.setStorageSync('partnerId', 'partner_' + this.data.pairingCode);
      
      app.globalData.role = this.data.selectedRole;
      wx.showToast({
        title: '绑定成功！',
        icon: 'success',
        duration: 1500
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/menu/menu',
        });
      }, 1500);
    } else {
      this.setData({ error: '配对码输入错误，请重新输入' });
      setTimeout(() => {
        this.setData({ error: '' });
      }, 3000);
    }
  },

  goBackRole() {
    this.setData({ step: 'role', pairingCode: '', error: '' });
  },

  onShareAppMessage() {
    return {
      title: '快来加入我们的干饭小分队！',
      path: '/pages/index/index'
    }
  }
})
