Page({
  data: {
    keyword: '',
    hasSearched: false,
    searchResult: null,
    categories: [
      { id: 'hot', name: '大王必吃榜' },
      { id: 'home', name: '大厨拿手菜' },
      { id: 'meat', name: '无肉不欢' },
      { id: 'veg', name: '清新解腻' },
      { id: 'soup', name: '碳水与汤' },
      { id: 'sea', name: '海里游的' },
      { id: 'snack', name: '解馋零嘴' },
      { id: 'drink', name: '快乐源泉' }
    ],
    catIndex: 0,
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
    
    setTimeout(() => {
      wx.hideLoading();
      
      if (kw.includes('肉') || kw.includes('鸡') || kw.includes('鱼')) {
        this.setData({
          hasSearched: true,
          searchResult: {
            name: kw,
            category: 'home', // '大厨拿手菜'
            ingredients: kw + ', 葱姜蒜, 酱油',
            price: '25'
          }
        });
      } else {
        this.setData({
          hasSearched: true,
          searchResult: null,
          manualName: kw 
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
    const cat = this.data.categories[this.data.catIndex].id;
    this._saveToGlobalMenu(this.data.manualName, cat, this.data.manualIngredients, '15');
  },
  _saveToGlobalMenu(name, categoryId, ingredients, price) {
    let customMenu = wx.getStorageSync('customMenu') || [];
    
    customMenu.push({
      id: 'custom_' + Date.now(),
      category: categoryId,
      name: name,
      desc: '许愿池添加的美味',
      price: price,
      buttonText: '拿下 😈',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80',
      ingredients: ingredients ? ingredients.split(/[,，]/).map(i => i.trim()).filter(i=>i) : []
    });
    
    wx.setStorageSync('customMenu', customMenu);
    
    wx.showToast({ title: '添加成功！', icon: 'success' });
    setTimeout(() => {
      wx.switchTab({ url: '/pages/menu/menu' });
    }, 1000);
  }
})
