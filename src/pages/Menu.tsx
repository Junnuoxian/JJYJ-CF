import React, { useState } from 'react';
import { ShoppingBag, Heart, Plus, Camera, X, Search, FileText } from 'lucide-react';
import { useStore, OrderData } from '../Store';
import OptionsModal from '../components/OptionsModal';

const categories = [
  { id: 'hot', name: '大王必吃榜', icon: '/assets/icon-hot.svg' },
  { id: 'home', name: '大厨拿手菜', icon: '/assets/icon-home.svg' },
  { id: 'meat', name: '无肉不欢', icon: '/assets/icon-meat.svg' },
  { id: 'veg', name: '清新解腻', icon: '/assets/icon-veg.svg' },
  { id: 'soup', name: '碳水与汤', icon: '/assets/icon-soup.svg' },
  { id: 'sea', name: '海里游的', icon: '/assets/icon-sea.svg' },
  { id: 'snack', name: '解馋零嘴', icon: '/assets/icon-snack.svg' },
  { id: 'drink', name: '快乐源泉', icon: '/assets/icon-drink.svg' },
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
  { id: 34, category: 'snack', name: '原味薯片', desc: '咔嚓咔嚓，脆到掉渣', price: '8', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=chips&backgroundColor=ffda9e', buttonText: '拿下 😈' },
];

export const initialDishesData = initialDishes; // Export for other components if needed

export default function Menu() {
  const { addOrder, favorites, toggleFavorite, cart, addToCart, removeFromCart, clearCart } = useStore();
  const [activeCategory, setActiveCategory] = useState('hot');
  const [dishes, setDishes] = useState(initialDishes);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  const [showCartModal, setShowCartModal] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [activeDishForOptions, setActiveDishForOptions] = useState<any>(null);
  const [orderRemark, setOrderRemark] = useState('');

  // Add Dish Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDish, setNewDish] = useState({ name: '', desc: '', price: '', category: 'hot', imagePreview: '' });

  const playPopSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  };

  const handleAddToCart = (dish: typeof initialDishes[0]) => {
    playPopSound();
    addToCart(dish);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.dish.price) * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Add to global store
    const newOrder: OrderData = {
      id: Date.now().toString(),
      items: cart,
      total: cartTotalPrice,
      date: new Date().toISOString(),
      status: 'cooking',
      remark: orderRemark
    };
    addOrder(newOrder);
    setOrderRemark('');

    setShowCartModal(false);
    setShowOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      setShowOrderSuccess(false);
    }, 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local preview URL for the uploaded/captured image
      const previewUrl = URL.createObjectURL(file);
      setNewDish({ ...newDish, imagePreview: previewUrl });
    }
  };

  const handleAddDish = () => {
    if (!newDish.name || !newDish.price) {
      alert('请填写菜名和价格哦！');
      return;
    }
    const addedDish = {
      id: Date.now(),
      category: newDish.category,
      name: newDish.name,
      desc: newDish.desc || '大厨的新作品',
      price: newDish.price,
      image: newDish.imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80',
      buttonText: '选它'
    };
    setDishes([addedDish, ...dishes]);
    setShowAddModal(false);
    setSearchQuery('');
    setNewDish({ name: '', desc: '', price: '', category: 'hot', imagePreview: '' });
  };

  const searchResults = searchQuery.trim() 
    ? dishes.filter(d => d.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : [];

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    if (!searchQuery.trim()) {
      const el = document.getElementById(`category-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (searchQuery.trim()) return;
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    
    let currentActive = categories[0].id;
    for (const cat of categories) {
      const el = document.getElementById(`category-${cat.id}`);
      if (el) {
        // -60 offsets the padding/sticky search bar
        if (el.offsetTop - 60 <= scrollPosition + 120) {
          currentActive = cat.id;
        }
      }
    }
    if (currentActive !== activeCategory) {
      setActiveCategory(currentActive);
    }
  };

  const renderDish = (dish: typeof initialDishes[0]) => (
    <div key={dish.id} className="bg-white rounded-[24px] p-3 border-[3px] border-[#FFF0F2] shadow-sm flex gap-3 relative">
      <img src={dish.image} alt={dish.name} className="w-[100px] h-[100px] rounded-[16px] object-cover border-2 border-[#FFF0F2]" />
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          {/* Tag & Title */}
          <div className="flex items-center gap-1 mb-1">
            <span className="bg-[#FFF0F2] text-[#FF7A7A] text-[10px] px-2 py-0.5 rounded-full font-bold">
              {dish.category === 'hot' ? '必吃 🔥' : dish.category === 'home' ? '拿手 🔥' : dish.category === 'meat' ? '吃肉 🥩' : dish.category === 'veg' ? '解腻 🥬' : dish.category === 'soup' ? '碳水 🥣' : dish.category === 'sea' ? '海鲜 🦐' : dish.category === 'snack' ? '解馋 🍟' : '甜甜 🍰'}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <h3 className="font-black text-[#4A3A3A] text-[16px] tracking-wide">{dish.name}</h3>
            <button 
              onClick={() => toggleFavorite(dish.id)}
              className={`p-1.5 rounded-full transition-colors ${favorites.includes(dish.id) ? 'text-[#FF5C77] bg-[#FFF0F2]' : 'text-[#C4B4B4] bg-[#F5F5F5] hover:bg-[#FFF0F2] hover:text-[#FFB3C1]'}`}
            >
              <Heart size={14} className={favorites.includes(dish.id) ? 'fill-current' : ''} />
            </button>
          </div>
          <p className="text-[11px] text-[#9A8A8A] line-clamp-1 mt-1 font-medium">{dish.desc}</p>
        </div>
        
        {/* Dashed Line */}
        <div className="w-full border-t-[2px] border-dashed border-[#FFF0F2] my-2"></div>
        
        <div className="flex justify-between items-end">
          <div className="text-[#FF5C77] font-black flex items-baseline tracking-tighter">
            <span className="text-sm mr-0.5">¥</span>
            <span className="text-2xl leading-none">{dish.price}</span>
            {dish.priceSuffix && <span className="text-xs ml-0.5 font-bold text-[#FFA8B5]">{dish.priceSuffix}</span>}
          </div>
          <button 
            onClick={() => {
              if ((dish as any).customizable) {
                setActiveDishForOptions(dish);
              } else {
                handleAddToCart(dish);
              }
            }}
            className="bg-gradient-to-b from-[#FFE787] to-[#FFCF3D] text-[#6B4B1B] text-[13px] px-4 py-1.5 rounded-full font-black shadow-[0_4px_0_#E5B220] active:shadow-[0_0px_0_#E5B220] active:translate-y-1 transition-all"
          >
            选它
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] relative overflow-hidden">
      {/* Top Banner (Illustration Placeholder) */}
      <div className="w-full h-40 bg-[#FFF5F7] relative overflow-hidden">
        <img 
          src="/assets/menu-bg.svg" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Curved overlay to blend with content */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#FFFDF9] rounded-t-3xl"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden -mt-6 z-10 relative bg-transparent">
        {/* Left Sidebar */}
        <div className="w-[100px] bg-[#FFF5F7] overflow-y-auto outline-none flex flex-col pb-20 border-r border-[#FFE8E8]">
          <div className="pt-6 space-y-1 px-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <div 
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex flex-col items-center justify-center py-3 rounded-2xl cursor-pointer transition-all [-webkit-tap-highlight-color:transparent] ${
                    isActive ? 'bg-white shadow-[0_4px_10px_rgba(255,192,203,0.3)] border border-[#FFE0E5] scale-105' : 'border border-transparent hover:bg-white/60'
                  }`}
                >
                  <img src={cat.icon} alt={cat.name} className={`w-8 h-8 mb-1 transition-all ${isActive ? '' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`} />
                  <span className={`text-[11px] font-bold ${isActive ? 'text-[#FF5C77]' : 'text-[#C4B4B4]'}`}>
                    {cat.name}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Cute illustration placeholder at bottom */}
          <div className="mt-auto p-4 opacity-80 flex justify-center">
            <div className="w-12 h-12 bg-[#FFF0F2] rounded-full flex items-center justify-center text-2xl border border-[#FFE0E5]">
              ✨
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 overflow-y-auto p-4 pt-6 pb-24 bg-[#FFFDF9] relative outline-none" onScroll={handleScroll}>
          
          {/* Floating Search Bar */}
          <div className="bg-white rounded-full shadow-sm flex items-center px-4 py-2.5 mb-4 sticky top-0 z-20 border border-[#FFE8E8]">
            <Search size={18} className="text-[#FFB3C1] mr-2" />
            <input 
              type="text" 
              placeholder="想吃点什么？搜索菜名..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none text-[#4A3A3A] placeholder:text-[#C4B4B4]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#C4B4B4] hover:text-[#FF5C77] transition-colors">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Section Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <img src="/assets/avatar-kuromi.svg" className="w-9 h-9 rounded-full border-2 border-[#FFE8E8]" alt="Kuromi" />
              <div>
                <h2 className="text-lg font-black text-[#4A3A3A] leading-tight">厨主推荐 ✨</h2>
                <p className="text-[10px] text-[#9A8A8A]">Kuromi和Baku的美味食光</p>
              </div>
            </div>
            <div className="bg-[#FFF0F2] text-[#FF7A7A] text-[10px] font-bold px-2 py-1 rounded-full border border-[#FFE0E5] flex items-center">
              <span className="mr-1">📢</span> 今日上新
            </div>
          </div>

          {/* Dish List */}
          {searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((dish) => renderDish(dish))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-3 opacity-80">🥺</div>
                <p className="text-[#9A8A8A] text-sm font-medium mb-4">找不到想吃的菜品...</p>
                <button 
                  onClick={() => {
                    setNewDish({ ...newDish, name: searchQuery, category: activeCategory });
                    setShowAddModal(true);
                  }}
                  className="bg-[#FF5C77] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(255,92,119,0.4)] active:scale-95 transition-transform"
                >
                  找不到？点击自定义添加
                </button>
              </div>
            )
          ) : (
            <div className="space-y-6 pb-6">
              {categories.map(cat => {
                const catDishes = dishes.filter(d => d.category === cat.id);
                if (catDishes.length === 0) return null;
                return (
                  <div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-20">
                    <h3 className="font-black text-[#4A3A3A] text-[15px] mb-3 flex items-center">
                      <span className="w-1.5 h-4 bg-[#FF5C77] rounded-full mr-2"></span>
                      {cat.name}
                    </h3>
                    <div className="space-y-4">
                      {catDishes.map(dish => renderDish(dish))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Placeholder */}
      <div 
        onClick={() => cartTotalCount > 0 && setShowCartModal(true)}
        className={`absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border-[3px] border-[#FFF0F2] text-[#4A3A3A] rounded-full h-14 flex items-center px-4 shadow-[0_8px_30px_rgba(255,192,203,0.3)] z-40 transition-transform ${cartTotalCount > 0 ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-80'}`}
      >
        <div className="flex-1 flex items-center">
          <div className="relative">
            <ShoppingBag size={24} className={cartTotalCount > 0 ? "text-[#FF5C77]" : "text-[#C4B4B4]"} />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#FF5C77] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                {cartTotalCount}
              </span>
            )}
          </div>
          <div className="ml-3 flex flex-col justify-center">
            <span className="font-black text-sm text-[#4A3A3A]">共 {cartTotalCount} 份 <span className="text-[#FF5C77] ml-1">¥{cartTotalPrice.toFixed(2)}</span></span>
            <div className="flex items-center gap-1 mt-0.5">
              <img src="/assets/avatar-baku.svg" className={`w-3.5 h-3.5 rounded-full ${cartTotalCount === 0 && 'grayscale opacity-50'}`} alt="Baku" />
              <span className="text-[10px] text-[#9A8A8A] font-medium">
                {cartTotalCount > 0 ? '巴库火速接单中 🛵' : '巴库正在等待接单'}
              </span>
            </div>
          </div>
        </div>
        <button 
          disabled={cartTotalCount === 0}
          onClick={(e) => {
            e.stopPropagation();
            if (cartTotalCount > 0) setShowCartModal(true);
          }}
          className={`px-6 py-2 rounded-full text-sm font-black transition-all ${
            cartTotalCount > 0 
              ? 'bg-gradient-to-b from-[#FFE787] to-[#FFCF3D] text-[#6B4B1B] shadow-[0_3px_0_#E5B220] active:shadow-[0_0px_0_#E5B220] active:translate-y-1' 
              : 'bg-[#F5F5F5] text-[#C4B4B4]'
          }`}
        >
          去结账
        </button>
      </div>

      {/* Options Modal */}
      {activeDishForOptions && (
        <OptionsModal 
          dish={activeDishForOptions} 
          onClose={() => setActiveDishForOptions(null)}
          onConfirm={(options) => {
            addToCart(activeDishForOptions, options);
            setActiveDishForOptions(null);
            playPopSound();
          }}
        />
      )}

      {/* Floating Action Button for adding custom dishes */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-20 right-4 bg-[#FF5C77] text-white p-3 rounded-full shadow-[0_4px_20px_rgba(255,92,119,0.4)] hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus size={24} />
      </button>

      {/* Add Custom Dish Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white border-[3px] border-[#FFF0F2] w-full max-w-sm rounded-[32px] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg text-[#4A3A3A]">📸 拍照添加新菜品</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#C4B4B4] hover:text-[#FF5C77]">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-bold text-[#4A3A3A] mb-2">菜品图片</label>
                <label className="cursor-pointer flex flex-col items-center justify-center bg-[#FFFDF9] rounded-2xl h-40 border-2 border-dashed border-[#FFB3C1] hover:bg-[#FFF0F2] transition-colors relative overflow-hidden">
                  {newDish.imagePreview ? (
                    <img src={newDish.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera size={32} className="text-[#FFB3C1] mb-2" />
                      <span className="text-sm font-bold text-[#FF5C77]">点击拍照或上传图片</span>
                      <span className="text-[11px] text-[#9A8A8A] mt-1 font-medium">支持直接调用手机摄像头</span>
                    </>
                  )}
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#4A3A3A] mb-2">菜品名称</label>
                <input 
                  type="text" 
                  value={newDish.name}
                  onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                  className="w-full bg-[#FFFDF9] text-[#4A3A3A] border-2 border-[#FFE8E8] rounded-xl px-4 py-3 text-sm focus:border-[#FF5C77] outline-none placeholder:text-[#C4B4B4] font-medium"
                  placeholder="例如：可爱的青椒炒肉"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-[#4A3A3A] mb-2">分类</label>
                  <select 
                    value={newDish.category}
                    onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                    className="w-full bg-[#FFFDF9] text-[#4A3A3A] border-2 border-[#FFE8E8] rounded-xl px-4 py-3 text-sm focus:border-[#FF5C77] outline-none font-medium"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-[#4A3A3A] mb-2">价格 (¥)</label>
                  <input 
                    type="number" 
                    value={newDish.price}
                    onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                    className="w-full bg-[#FFFDF9] text-[#4A3A3A] border-2 border-[#FFE8E8] rounded-xl px-4 py-3 text-sm focus:border-[#FF5C77] outline-none placeholder:text-[#C4B4B4] font-medium"
                    placeholder="输入价格"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#4A3A3A] mb-2">食材清单</label>
                <textarea 
                  value={newDish.desc}
                  onChange={(e) => setNewDish({...newDish, desc: e.target.value})}
                  className="w-full bg-[#FFFDF9] text-[#4A3A3A] border-2 border-[#FFE8E8] rounded-xl px-4 py-3 text-sm focus:border-[#FF5C77] outline-none resize-none h-20 placeholder:text-[#C4B4B4] font-medium"
                  placeholder="例如：新鲜猪肉、青椒..."
                />
              </div>

              <button 
                onClick={handleAddDish}
                className="w-full bg-gradient-to-b from-[#FFE787] to-[#FFCF3D] text-[#6B4B1B] font-black py-3.5 rounded-xl shadow-[0_4px_0_#E5B220] active:shadow-[0_0px_0_#E5B220] active:translate-y-1 transition-all mt-2 text-lg"
              >
                确认上架新菜 ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart & Checkout Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-end justify-center sm:items-center">
          <div className="bg-[#FFFDF9] border-t-[3px] border-x-[3px] sm:border-[3px] sm:rounded-[32px] border-[#FFF0F2] w-full max-w-md rounded-t-[32px] p-6 pb-8 shadow-[0_-10px_40px_rgba(255,192,203,0.3)] animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag size={24} className="text-[#FF5C77]" />
                <h3 className="font-black text-xl text-[#4A3A3A]">购物车</h3>
              </div>
              <button onClick={() => setShowCartModal(false)} className="text-[#C4B4B4] hover:text-[#FF5C77] bg-[#FFF0F2] p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-[24px] border-[2px] border-[#FFF0F2]">
                  <img src={item.dish.image} alt={item.dish.name} className="w-[64px] h-[64px] rounded-[16px] object-cover border border-[#FFF0F2]" />
                  <div className="flex-1">
                    <h4 className="font-black text-[#4A3A3A] text-[15px]">{item.dish.name}</h4>
                    {item.options && item.options.length > 0 && (
                      <div className="text-[10px] text-[#9A8A8A] font-medium leading-tight mt-0.5">
                        {item.options.join(', ')}
                      </div>
                    )}
                    <div className="text-[#FF5C77] font-black mt-1 tracking-tighter">¥{item.dish.price}</div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FFFDF9] rounded-full border border-[#FFE8E8] p-1">
                    <button 
                      onClick={() => removeFromCart(item.id!)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#FF5C77] font-bold shadow-sm border border-[#FFE8E8] active:scale-90 transition-transform"
                    >-</button>
                    <span className="font-black text-[#4A3A3A] min-w-[12px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item.dish, item.options)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-[#FF5C77] text-white font-bold shadow-sm active:scale-90 transition-transform"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-bold text-[#4A3A3A] mb-2">订单备注</label>
              <textarea 
                value={orderRemark}
                onChange={(e) => setOrderRemark(e.target.value)}
                className="w-full bg-[#FFFDF9] text-[#4A3A3A] border-2 border-[#FFE8E8] rounded-xl px-4 py-3 text-sm focus:border-[#FF5C77] outline-none resize-none h-20 placeholder:text-[#C4B4B4] font-medium"
                placeholder="想要怎么做？可以写在这里哦 (比如: 多放辣椒、不要葱)..."
              />
            </div>

            <div className="border-t-2 border-dashed border-[#FFE8E8] pt-4 shrink-0">
              <div className="flex justify-between items-end mb-6">
                <span className="text-[#9A8A8A] font-bold">合计金额</span>
                <div className="text-[#FF5C77] font-black flex items-baseline tracking-tighter">
                  <span className="text-lg mr-1">¥</span>
                  <span className="text-3xl leading-none">{cartTotalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-b from-[#FFE787] to-[#FFCF3D] text-[#6B4B1B] font-black py-4 rounded-full shadow-[0_4px_0_#E5B220] active:shadow-[0_0px_0_#E5B220] active:translate-y-1 transition-all text-lg flex items-center justify-center gap-2"
              >
                确认下单 ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Success Toast/Modal */}
      {showOrderSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-8 flex flex-col items-center border-[4px] border-[#FFF0F2] shadow-2xl animate-in zoom-in-75 duration-300">
            <div className="w-20 h-20 bg-[#FFF0F2] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-inner text-4xl">
              🎉
            </div>
            <h2 className="text-2xl font-black text-[#4A3A3A] mb-2">下单成功！</h2>
            <p className="text-[#9A8A8A] font-medium">巴库马上为您准备美味</p>
          </div>
        </div>
      )}
    </div>
  );
}

