const app = getApp()

Page({
  data: {
    role: null,
    activeCategory: 0,
    categories: ['一起偷个懒', '主食🍚', '炖的🥘', '炒的🔥', '煎的🍳', '凉菜🥒', '汤羹🥣', '甜点🍮', '零食🍉', '饮料🥤'],
    baseDishes: [
      { id: 1, categoryIndex: 0, name: '出去吃', desc: '改善下伙食', price: '0.00' },
      { id: 2, categoryIndex: 0, name: '点外卖', desc: '麻麻都香', price: '0.00' },
      
      { id: 3, categoryIndex: 1, name: '大米饭', desc: '碳水快乐', price: '0.50' },
      { id: 4, categoryIndex: 1, name: '排骨焖饭', desc: '饭菜一锅出', price: '2.00', ingredients: ['大米', '排骨', '胡萝卜'] },
      { id: 5, categoryIndex: 1, name: '水饺🥟', desc: '好吃不过饺子', price: '1.00', ingredients: ['饺子皮', '肉馅'] },
      
      { id: 6, categoryIndex: 2, name: '土豆炖牛腩', desc: '下饭神器', price: '3.00', ingredients: ['牛腩', '土豆', '番茄'] },
      { id: 7, categoryIndex: 2, name: '黄焖鸡', desc: '鸡肉鲜嫩', price: '2.50', ingredients: ['鸡腿', '香菇', '青椒'] },
      { id: 8, categoryIndex: 2, name: '莲藕排骨汤', desc: '浓郁鲜香', price: '3.50', ingredients: ['排骨', '莲藕'] },
      
      { id: 9, categoryIndex: 3, name: '西红柿炒鸡蛋', desc: '国民家常菜', price: '1.00', ingredients: ['西红柿', '鸡蛋'] },
      { id: 10, categoryIndex: 3, name: '辣椒炒肉', desc: '辣得过瘾', price: '1.50', ingredients: ['五花肉', '青椒'] },
      { id: 11, categoryIndex: 3, name: '蒜蓉生菜', desc: '清淡解腻', price: '0.80', ingredients: ['生菜', '大蒜'] },
      { id: 12, categoryIndex: 3, name: '干锅花菜', desc: '焦香四溢', price: '1.80', ingredients: ['花菜', '五花肉'] },
      
      { id: 13, categoryIndex: 4, name: '煎荷包蛋', desc: '外焦里嫩', price: '0.50', ingredients: ['鸡蛋'] },
      { id: 14, categoryIndex: 4, name: '香煎豆腐', desc: '外酥里嫩', price: '1.20', ingredients: ['老豆腐'] },
      { id: 15, categoryIndex: 4, name: '水煎包', desc: '底部金黄', price: '1.50', ingredients: ['包子', '面粉'] },
      
      { id: 16, categoryIndex: 5, name: '凉拌黄瓜', desc: '清脆爽口', price: '0.50', ingredients: ['黄瓜', '大蒜', '醋'] },
      { id: 17, categoryIndex: 5, name: '皮蛋拌豆腐', desc: '经典凉菜', price: '0.80', ingredients: ['皮蛋', '内酯豆腐'] },
      
      { id: 18, categoryIndex: 6, name: '紫菜蛋花汤', desc: '快手好汤', price: '0.50', ingredients: ['紫菜', '鸡蛋'] },
      { id: 19, categoryIndex: 6, name: '玉米排骨汤', desc: '清甜滋补', price: '3.00', ingredients: ['排骨', '玉米'] },
      
      { id: 20, categoryIndex: 7, name: '焦糖布丁', desc: '甜甜的', price: '2.00', ingredients: ['鸡蛋', '牛奶', '白糖'] },
      { id: 21, categoryIndex: 8, name: '薯片', desc: '咔嚓咔嚓', price: '0.00' },
      { id: 22, categoryIndex: 9, name: '肥宅快乐水', desc: '加冰更好喝', price: '0.00' }
    ],
    displayDishes: [], // 基础菜 + 搜索添加的自定义菜
    cart: [],
    cartTotal: '0.00'
  },

  onShow() {
    // 每次显示页面时，读取基础菜和自定义菜并合并
    const customMenu = wx.getStorageSync('customMenu') || [];
    const allDishes = [...this.data.baseDishes, ...customMenu];

    this.setData({
      role: app.globalData.role || wx.getStorageSync('userRole'),
      displayDishes: allDishes,
      cart: [],
      cartTotal: '0.00'
    })
  },

  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  switchCategory(e) {
    this.setData({
      activeCategory: e.currentTarget.dataset.index
    })
  },

  addToCart(e) {
    const dish = e.currentTarget.dataset.dish;
    let cart = this.data.cart;
    cart.push(dish);
    this.setData({ cart });
    wx.showToast({ title: '已放入', icon: 'none', duration: 500 })
  },

  checkout() {
    if (this.data.cart.length === 0) return;
    let that = this;
    wx.showModal({
      title: '确认下单',
      content: `共点了 ${this.data.cart.length} 样，发给大厨吗？`,
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
          wx.showToast({ title: '下单成功', icon: 'success' });
          that.setData({ cart: [] });
          setTimeout(() => { wx.switchTab({ url: '/pages/order/order' }) }, 1000);
        }
      }
    })
  }
})
