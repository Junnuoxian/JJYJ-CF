Page({
  data: {
    keyword: '',
    hasSearched: false,
    searchResult: null,
    categories: ['一起偷个懒', '主食🍚', '炖的🥘', '炒的🔥', '煎的🍳', '凉菜🥒', '汤羹🥣', '甜点🍮', '零食🍉', '饮料🥤'],
    catIndex: 1,
    manualName: '',
    manualIngredients: ''
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value, hasSearched: false });
  },

  doSearch() {
    const kw = this.data.keyword.trim();
    if (!kw) return;
    
    wx.showLoading({ title: '全网搜索中...' });
    
    // 模拟网络请求和第三方API逻辑
    setTimeout(() => {
      wx.hideLoading();
      
      // 我们用一个简单的 Mock 逻辑：包含"肉"字就能搜到，否则搜不到触发兜底
      if (kw.includes('肉') || kw.includes('鸡') || kw.includes('鱼')) {
        this.setData({
          hasSearched: true,
          searchResult: {
            name: kw,
            category: '炒的🔥',
            ingredients: kw + ', 葱姜蒜, 酱油',
            price: '2.50'
          }
        });
      } else {
        this.setData({
          hasSearched: true,
          searchResult: null,
          manualName: kw // 自动填入兜底表单
        });
      }
    }, 1000);
  },

  addToMyMenu() {
    const res = this.data.searchResult;
    this._saveToGlobalMenu(res.name, res.category, res.ingredients, res.price);
  },

  onCategoryChange(e) {
    this.setData({ catIndex: e.detail.value });
  },
  onManualName(e) { this.setData({ manualName: e.detail.value }); },
  onManualIngredients(e) { this.setData({ manualIngredients: e.detail.value }); },

  submitManual() {
    if(!this.data.manualName) {
      return wx.showToast({ title: '菜名不能为空', icon: 'none' });
    }
    const cat = this.data.categories[this.data.catIndex];
    this._saveToGlobalMenu(this.data.manualName, cat, this.data.manualIngredients, '1.50');
  },

  _saveToGlobalMenu(name, category, ingredients, price) {
    // 存入本地缓存（未来这里是 wx.cloud.database() 写入）
    let customMenu = wx.getStorageSync('customMenu') || [];
    
    // 找到分类索引
    const catIndex = this.data.categories.indexOf(category) || 1;
    
    customMenu.push({
      id: 'custom_' + Date.now(),
      categoryIndex: catIndex,
      name: name,
      desc: '许愿池添加的美味',
      price: price,
      ingredients: ingredients.split(/[,，]/).map(i => i.trim()).filter(i=>i)
    });
    
    wx.setStorageSync('customMenu', customMenu);
    
    wx.showToast({ title: '添加成功！', icon: 'success' });
    setTimeout(() => {
      wx.switchTab({ url: '/pages/menu/menu' });
    }, 1000);
  }
})
