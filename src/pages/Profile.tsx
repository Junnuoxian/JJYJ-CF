import React, { useState } from 'react';
import { Heart, Star, Settings, ChevronRight, X, Clock, CheckCircle } from 'lucide-react';
import { useStore } from '../Store';
import { initialDishesData } from './Menu';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const { role, orders, favorites, unbindPartner } = useStore();
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const completedOrders = orders.filter(o => o.status === 'completed');
  const favoriteDishes = initialDishesData.filter(d => favorites.includes(d.id));

  return (
    <div className="p-4 h-full bg-[#FFFDF9] overflow-y-auto relative pb-24">
      <div className="bg-white rounded-[32px] p-6 shadow-sm border-[3px] border-[#FFF0F2] flex items-center gap-4 mb-4 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#FFF0F2] rounded-full opacity-50"></div>
        <div className="w-16 h-16 bg-[#FFF0F2] rounded-full flex items-center justify-center overflow-hidden border-[3px] border-[#FFE8E8] shrink-0 z-10">
          <img src={role === 'kuromi' ? "/assets/avatar-kuromi.svg" : "/assets/avatar-baku.svg"} className="w-full h-full object-cover" alt="Avatar" />
        </div>
        <div className="z-10">
          <h2 className="text-xl font-black text-[#4A3A3A] mb-1">
            {role === 'kuromi' ? '干饭王 Kuromi' : '主厨 Baku'}
          </h2>
          <div className="bg-[#FFF0F2] text-[#FF7A7A] text-[10px] px-2 py-0.5 rounded-full font-bold inline-flex items-center">
            <Star size={10} className="mr-1 fill-current" /> {role === 'kuromi' ? '顶级吃货' : '星级大厨'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-6 shadow-sm border-[3px] border-[#FFF0F2] mb-4">
        <h3 className="font-black text-sm text-[#4A3A3A] mb-4 flex items-center gap-2">
          <Heart size={16} className="text-[#FF5C77] fill-[#FF5C77]" /> 
          我的搭档
        </h3>
        <div className="flex justify-between items-center bg-[#FFFDF9] p-3 rounded-2xl border-2 border-[#FFE8E8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFF0F2] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#FFE8E8]">
              <img src={role === 'kuromi' ? "/assets/avatar-baku.svg" : "/assets/avatar-kuromi.svg"} className="w-full h-full object-cover" alt="Partner" />
            </div>
            <div>
              <div className="font-bold text-[#4A3A3A] text-sm">
                {role === 'kuromi' ? '巴库 Baku' : '库洛米 Kuromi'}
              </div>
              <div className="text-[10px] text-[#9A8A8A] font-medium">
                {role === 'kuromi' ? '专属跑腿小弟 🛵' : '尊贵的干饭大人 👑'}
              </div>
            </div>
          </div>
          <button className="bg-[#FFF0F2] text-[#FF5C77] text-xs px-3 py-1.5 rounded-full font-bold active:scale-95 transition-transform">
            互动
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border-[3px] border-[#FFF0F2]">
        <div onClick={() => setShowHistory(true)} className="px-6 py-4 border-b-2 border-dashed border-[#FFE8E8] flex justify-between items-center active:bg-[#FFFDF9] transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFF0F2] rounded-full flex items-center justify-center text-[#FF5C77]">
              📜
            </div>
            <span className="font-bold text-[#4A3A3A] text-sm">历史订单</span>
          </div>
          <div className="flex items-center gap-2">
            {completedOrders.length > 0 && (
              <span className="bg-[#FFF0F2] text-[#FF5C77] text-[10px] font-bold px-2 py-0.5 rounded-full">{completedOrders.length}</span>
            )}
            <ChevronRight size={18} className="text-[#C4B4B4]" />
          </div>
        </div>
        <div onClick={() => setShowFavorites(true)} className="px-6 py-4 border-b-2 border-dashed border-[#FFE8E8] flex justify-between items-center active:bg-[#FFFDF9] transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFF0F2] rounded-full flex items-center justify-center text-[#FF5C77]">
              ✨
            </div>
            <span className="font-bold text-[#4A3A3A] text-sm">我的收藏</span>
          </div>
          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <span className="bg-[#FFF0F2] text-[#FF5C77] text-[10px] font-bold px-2 py-0.5 rounded-full">{favorites.length}</span>
            )}
            <ChevronRight size={18} className="text-[#C4B4B4]" />
          </div>
        </div>
        <div 
          onClick={unbindPartner}
          className="px-6 py-4 flex justify-between items-center active:bg-[#FFFDF9] transition-colors cursor-pointer border-t-2 border-[#FFE8E8]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFF0F2] rounded-full flex items-center justify-center text-[#FF5C77]">
              <Settings size={16} />
            </div>
            <span className="font-bold text-[#FF5C77] text-sm">解除绑定并退出</span>
          </div>
        </div>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-[#FFFDF9] z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b-2 border-[#FFE8E8] bg-white">
              <h2 className="font-black text-[#4A3A3A] text-lg">历史订单</h2>
              <button onClick={() => setShowHistory(false)} className="p-2 bg-[#FFF0F2] text-[#FF5C77] rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {completedOrders.length === 0 ? (
                <div className="text-center text-[#9A8A8A] mt-10 text-sm font-bold">暂无已完成的订单</div>
              ) : (
                completedOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-[24px] p-4 border-[3px] border-[#FFF0F2] shadow-sm opacity-70">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b-2 border-dashed border-[#FFE8E8]">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-[#9A8A8A]">
                        <Clock size={14} />
                        {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <div className="bg-[#E8F8F5] text-[#20B2AA] text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <CheckCircle size={10} /> 已完成
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm font-medium text-[#4A3A3A]">
                          <div className="flex items-center gap-2">
                            <span className="text-[#9A8A8A] w-4 text-right">x{item.quantity}</span>
                            <span>{item.dish.name}</span>
                          </div>
                          <span>¥{(parseFloat(item.dish.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end pt-2 border-t-2 border-dashed border-[#FFE8E8]">
                      <div className="text-[#4A3A3A] font-black flex items-baseline tracking-tighter">
                        <span className="text-sm mr-0.5">合计 ¥</span>
                        <span className="text-lg leading-none">{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Modal */}
      <AnimatePresence>
        {showFavorites && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-[#FFFDF9] z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b-2 border-[#FFE8E8] bg-white">
              <h2 className="font-black text-[#4A3A3A] text-lg">我的收藏</h2>
              <button onClick={() => setShowFavorites(false)} className="p-2 bg-[#FFF0F2] text-[#FF5C77] rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {favoriteDishes.length === 0 ? (
                <div className="text-center text-[#9A8A8A] mt-10 text-sm font-bold">还没有收藏任何菜品哦</div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {favoriteDishes.map((dish) => (
                    <div key={dish.id} className="bg-white rounded-2xl p-3 border-[3px] border-[#FFF0F2] shadow-sm flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#FFF0F2] rounded-full mb-2 overflow-hidden flex items-center justify-center">
                        <img src={dish.image} alt={dish.name} className="w-12 h-12 object-contain" />
                      </div>
                      <h4 className="font-black text-[#4A3A3A] text-sm text-center line-clamp-1">{dish.name}</h4>
                      <p className="text-[#9A8A8A] text-[10px] font-bold mt-1">¥{dish.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
