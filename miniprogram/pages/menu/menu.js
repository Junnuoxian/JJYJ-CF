const app = getApp()

Page({
  data: {
    role: null,
    activeCategory: 0,
    categories: ['一起偷个懒', '主食🍚', '炖的🥘', '炒的🔥', '煎的🍳', '零食🍉'],
    dishes: [
      { id: 1, categoryIndex: 0, name: '出去吃', desc: '改善下伙食', price: '0.00' },
      { id: 2, categoryIndex: 0, name: '点外卖', desc: '麻麻都香', price: '0.00' },
      { id: 3, categoryIndex: 1, name: '饭来', desc: '大口干饭', price: '1.00', ingredients: ['米饭'] },
      { id: 4, categoryIndex: 1, name: '水饺🥟', desc: '好吃不过饺子', price: '1.00', ingredients: ['饺子皮', '猪肉', '大葱'] },
      { id: 5, categoryIndex: 2, name: '红烧肉', desc: '肥而不腻', price: '2.00', ingredients: ['五花肉', '冰糖', '八角'] },
      { id: 6, categoryIndex: 3, name: '西红柿炒鸡蛋', desc: '酸甜可口', price: '1.50', ingredients: ['西红柿', '鸡蛋'] }
    ],
    cart: [],
    cartTotal: '0.00'
  },

  onShow() {
    this.setData({
      role: app.globalData.role || wx.getStorageSync('userRole'),
      cart: [],
      cartTotal: '0.00'
    })
  },

  switchCategory(e) {
    this.setData({
      activeCategory: e.currentTarget.dataset.index
    })
  },

  onDishScroll(e) {
    // 处理右侧滚动联动左侧（预留）
  },

  addToCart(e) {
    const dish = e.currentTarget.dataset.dish;
    let cart = this.data.cart;
    cart.push(dish);
    
    // 计算总价
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    this.setData({
      cart,
      cartTotal: total.toFixed(2)
    });

    wx.showToast({
      title: '已放入购物车',
      icon: 'none',
      duration: 500
    })
  },

  checkout() {
    if (this.data.cart.length === 0) return;
    
    let that = this;
    wx.showModal({
      title: '确认下单',
      content: `共偷了 ${this.data.cart.length} 样菜，去结账吗？`,
      success(res) {
        if (res.confirm) {
          let currentOrders = wx.getStorageSync('currentOrders') || [];
          
          that.data.cart.forEach(dish => {
            currentOrders.push({
              ...dish,
              orderTime: new Date().getTime() + Math.random(),
              status: 'pending'
            });
          });
          
          wx.setStorageSync('currentOrders', currentOrders);
          
          wx.showToast({
            title: '下单成功',
            icon: 'success'
          });

          that.setData({
            cart: [],
            cartTotal: '0.00'
          });

          setTimeout(() => {
            wx.switchTab({
              url: '/pages/order/order',
            })
          }, 1000);
        }
      }
    })
  }
})
