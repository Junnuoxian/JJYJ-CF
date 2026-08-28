const app = getApp()

const categoriesData = [
  { id: 'hot', name: '大王必吃榜', icon: '🔥' },
  { id: 'home', name: '大厨拿手菜', icon: '👨‍🍳' },
  { id: 'meat', name: '无肉不欢', icon: '🥩' },
  { id: 'veg', name: '清新解腻', icon: '🥬' },
  { id: 'soup', name: '碳水与汤', icon: '🥣' },
  { id: 'sea', name: '海里游的', icon: '🦐' },
  { id: 'snack', name: '解馋零嘴', icon: '🍿' },
  { id: 'drink', name: '快乐源泉', icon: '🥤' }
];

const initialDishes = [
  // 热门推荐 (hot)
  { id: 16, category: 'hot', customizable: true, name: '火锅', desc: '热气腾腾，暖心暖胃', price: '68', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=hotpot&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 17, category: 'hot', name: '烧烤', desc: '宵夜必备，撸串快乐', price: '38', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=bbq&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 18, category: 'hot', customizable: true, name: '麻辣烫', desc: '麻辣鲜香，随心搭配', price: '16', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=spicy&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 5, category: 'hot', name: '深夜泡面', desc: '深夜治愈，一碗暖心', price: '14', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=noodle&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 21, category: 'hot', name: '点外卖', desc: '懒人福利，美味到家', price: '0', priceSuffix: '起', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=takeout&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  // 家常小炒 (home)
  { id: 1, category: 'home', name: '青椒炒肉', desc: '经典家常菜，香辣下饭', price: '18', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=pork&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 8, category: 'home', name: '鱼香肉丝', desc: '酸甜微辣，超级下饭', price: '18', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=fish&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 9, category: 'home', name: '麻婆豆腐', desc: '麻辣鲜香，嫩滑入味', price: '16', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=tofu&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 12, category: 'home', name: '辣椒炒蛋', desc: '香辣入味，家常美味', price: '14', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=egg&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 13, category: 'home', name: '番茄炒蛋', desc: '酸甜可口，营养美味', price: '14', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=tomato&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  // 荤菜肉类 (meat)
  { id: 2, category: 'meat', name: '红烧肉', desc: '肥而不腻，入口即化', price: '22', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=meat&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 4, category: 'meat', name: '话梅排骨', desc: '酸甜开胃，回味无穷', price: '26', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=ribs&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 6, category: 'meat', name: '可乐鸡翅', desc: '鲜嫩多汁，甜咸适中', price: '20', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=chicken&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 7, category: 'meat', name: '糖醋排骨', desc: '酸甜可口，老少皆宜', price: '22', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=sweetribs&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  // 时蔬素菜 (veg)
  { id: 10, category: 'veg', name: '蒜蓉生菜', desc: '清爽脆嫩，蒜香浓郁', price: '12', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=lettuce&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 11, category: 'veg', name: '酸辣土豆丝', desc: '酸辣爽口，脆嫩开胃', price: '12', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=potato&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  // 汤羹主食 (soup)
  { id: 22, category: 'soup', name: '饺子', desc: '皮薄馅大，鲜香美味', price: '18', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=dumpling&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 23, category: 'soup', name: '蛋炒饭', desc: '粒粒分明，香气扑鼻', price: '15', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=rice&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 24, category: 'soup', name: '葱油拌面', desc: '葱香浓郁，简单美味', price: '12', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=noodle2&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 25, category: 'soup', name: '煎饼果子', desc: '酥脆可口，元气早餐', price: '10', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=pancake&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 19, category: 'soup', name: '螺蛳粉', desc: '酸辣够味，深夜灵魂', price: '15', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=luosifen&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  // 海鲜水产 (sea)
  { id: 3, category: 'sea', name: '清炒花甲', desc: '鲜香爽口，鲜味十足', price: '24', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=clam&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 14, category: 'sea', name: '蒜蓉虾', desc: '蒜香浓郁，鲜嫩Q弹', price: '28', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=shrimp&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 15, category: 'sea', name: '清蒸鲈鱼', desc: '鲜嫩清甜，原汁原味', price: '32', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=fish2&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 20, category: 'sea', name: '小龙虾', desc: '麻辣鲜香，停不下来', price: '48', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=lobster&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  // 饮品甜点 (drink)
  { id: 35, category: 'drink', name: '冰镇可乐', desc: '快乐水，肥宅挚爱', price: '5', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=cola&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 36, category: 'drink', name: '透心凉雪碧', desc: '清爽解腻，透心凉', price: '5', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=sprite&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 37, category: 'drink', name: '微醺鸡尾酒', desc: '果味微醺，浪漫小酌', price: '28', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=cocktail&backgroundColor=ffda9e', buttonText: '拿下 😈' },
  { id: 26, category: 'drink', name: '草莓蛋糕', desc: '香甜软糯，幸福满满', price: '16', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=cake&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 27, category: 'drink', name: '奶茶', desc: '香浓丝滑，快乐加倍', price: '12', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=tea&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 28, category: 'drink', name: '水果沙拉', desc: '新鲜水果，酸甜可口', price: '18', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=salad&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 29, category: 'drink', name: '红豆汤', desc: '香甜软糯，暖心甜品', price: '10', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=soup&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 30, category: 'drink', name: '冰淇淋', desc: '清凉解暑，甜蜜冰爽', price: '12', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=icecream&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  // 解馋零嘴 (snack)
  { id: 31, category: 'snack', name: '无骨鸡爪', desc: '酸辣Q弹，追剧必备', price: '25', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=chickenfeet&backgroundColor=ffda9e', buttonText: '拿下 😈' },
  { id: 32, category: 'snack', name: '泡椒春笋', desc: '脆爽鲜嫩，停不下来', price: '12', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=bamboo&backgroundColor=f5d6eb', buttonText: '拿下 😈' },
  { id: 33, category: 'snack', name: '大面筋辣条', desc: '童年回忆，爆汁过瘾', price: '5', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=latiao&backgroundColor=c39ed4', buttonText: '拿下 😈' },
  { id: 34, category: 'snack', name: '原味薯片', desc: '咔嚓咔嚓，脆到掉渣', price: '8', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=chips&backgroundColor=ffda9e', buttonText: '拿下 😈' }
];

Page({
  data: {
    role: null,
    activeCategory: 'hot',
    categories: categoriesData,
    baseDishes: initialDishes,
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
      activeCategory: e.currentTarget.dataset.id
    })
  },

  addToCart(e) {
    const dish = e.currentTarget.dataset.dish;
    let cart = this.data.cart;
    cart.push(dish);
    
    // Calculate total
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    
    this.setData({ 
      cart,
      cartTotal: total.toFixed(2)
    });
    
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
          that.setData({ cart: [], cartTotal: '0.00' });
          
          setTimeout(() => { wx.switchTab({ url: '/pages/order/order' }) }, 1000);
        }
      }
    })
  }
})
