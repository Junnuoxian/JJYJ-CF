import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, CheckCircle, BellRing, Utensils, Star } from 'lucide-react';
import { useStore } from '../Store';

export default function Order() {
  const { role, orders, completeOrder, urgeOrder, rateOrder, lastUrgedOrder, clearUrgeNotification } = useStore();
  
  const [showUrgeToast, setShowUrgeToast] = useState(false);

  useEffect(() => {
    if (role === 'baku' && lastUrgedOrder) {
      setShowUrgeToast(true);
      // Optional: Sound/Speech synthesis could go here
      try {
        const msg = new SpeechSynthesisUtterance("库洛米大人催单啦，搞快点！");
        window.speechSynthesis.speak(msg);
      } catch (e) {}
      
      const timer = setTimeout(() => {
        setShowUrgeToast(false);
        clearUrgeNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastUrgedOrder, role, clearUrgeNotification]);

  const activeOrders = role === 'baku' 
    ? orders.filter(o => o.status === 'cooking')
    : orders; // Kuromi sees all orders

  if (activeOrders.length === 0) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center text-center bg-[#FFFDF9]">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-[4px] border-[#FFF0F2] shadow-sm">
          {role === 'baku' ? (
            <ChefHat size={48} className="text-[#A288E3]" />
          ) : (
            <Utensils size={48} className="text-[#FFB3C1]" />
          )}
        </div>
        <h2 className="text-xl font-black text-[#4A3A3A] mb-2">
          {role === 'baku' ? '后厨空空如也' : '还没有点单记录哦'}
        </h2>
        <p className="text-[#9A8A8A] text-sm font-medium">
          {role === 'baku' ? '可以先去摸会儿鱼~' : '快去菜单里点几道喜欢吃的菜吧！'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 h-full bg-[#FFFDF9] overflow-y-auto pb-24 relative">
      <div className="flex items-center gap-2 mb-6">
        {role === 'baku' ? (
          <ChefHat size={24} className="text-[#A288E3]" />
        ) : (
          <Utensils size={24} className="text-[#FF5C77]" />
        )}
        <h2 className="text-xl font-black text-[#4A3A3A]">
          {role === 'baku' ? '后厨待做订单' : '我的订单'}
        </h2>
      </div>
      
      <div className="space-y-4">
        {activeOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-[24px] p-4 border-[3px] border-[#FFF0F2] shadow-sm">
            <div className="flex justify-between items-center mb-3 pb-3 border-b-2 border-dashed border-[#FFE8E8]">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#9A8A8A]">
                <Clock size={14} />
                {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              {order.status === 'cooking' ? (
                <div className="bg-[#FFF0F2] text-[#FF5C77] text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle size={10} /> 制作中
                </div>
              ) : (
                <div className="bg-[#F0FDF4] text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle size={10} /> 已完成
                </div>
              )}
            </div>
            
            <div className="space-y-3 mb-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={item.dish.image} className="w-10 h-10 rounded-[10px] object-cover border border-[#FFF0F2]" alt={item.dish.name} />
                    <div>
                      <h4 className="font-bold text-[#4A3A3A] text-sm">{item.dish.name}</h4>
                      {item.options && item.options.length > 0 && (
                        <div className="text-[10px] text-[#9A8A8A] font-medium leading-tight mt-0.5">
                          {item.options.join(', ')}
                        </div>
                      )}
                      <div className="text-[11px] text-[#9A8A8A] font-medium mt-0.5">x{item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-black text-[#4A3A3A]">¥{(parseFloat(item.dish.price) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            {order.remark && (
              <div className="mb-3 p-3 bg-[#FFF5F7] rounded-xl text-sm border border-[#FFE8E8]">
                <span className="font-bold text-[#FF5C77]">备注：</span>
                <span className="text-[#4A3A3A] font-medium">{order.remark}</span>
              </div>
            )}
            
            <div className="flex justify-between items-end pt-2 border-t-2 border-dashed border-[#FFE8E8] pb-3 mb-3 mt-1">
              <span className="text-xs font-bold text-[#9A8A8A]">共 {order.items.reduce((acc, curr) => acc + curr.quantity, 0)} 件</span>
              <div className="text-[#FF5C77] font-black flex items-baseline tracking-tighter">
                <span className="text-sm mr-0.5">合计 ¥</span>
                <span className="text-xl leading-none">{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions based on role and status */}
            {role === 'baku' && order.status === 'cooking' && (
              <button 
                onClick={() => completeOrder(order.id)}
                className="w-full bg-[#A288E3] text-white py-3 rounded-xl font-black text-sm flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-[0_4px_0_#8062C7] active:shadow-[0_0px_0_#8062C7] active:translate-y-1"
              >
                <BellRing size={16} /> 完成制作，出餐！
              </button>
            )}

            {role === 'kuromi' && order.status === 'cooking' && (
              <button 
                onClick={() => urgeOrder(order.id)}
                disabled={order.urged}
                className={`w-full py-3 rounded-xl font-black text-sm flex justify-center items-center gap-2 active:scale-95 transition-all ${
                  order.urged 
                    ? 'bg-[#F5F5F5] text-[#C4B4B4] cursor-not-allowed'
                    : 'bg-[#FF5C77] text-white shadow-[0_4px_0_#D94A62] active:shadow-[0_0px_0_#D94A62] active:translate-y-1'
                }`}
              >
                <BellRing size={16} /> {order.urged ? '已催单' : '催单'}
              </button>
            )}

            {role === 'kuromi' && order.status === 'completed' && (
              <div className="pt-2 border-t-2 border-dashed border-[#FFE8E8]">
                {!order.rating ? (
                  <div>
                    <span className="text-xs font-bold text-[#9A8A8A] block mb-2 text-center">给巴库的厨艺打个分吧~</span>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star}
                          onClick={() => rateOrder(order.id, star)}
                          className="text-[#FFCF3D] hover:scale-110 active:scale-95 transition-transform"
                        >
                          <Star size={24} fill="#FFCF3D" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-xs font-bold text-[#9A8A8A]">已评价:</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < order.rating! ? "#FFCF3D" : "#E5E7EB"} className={i < order.rating! ? "text-[#FFCF3D]" : "text-[#E5E7EB]"} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Baku Urge Toast */}
      {showUrgeToast && (
        <div className="fixed top-16 left-4 right-4 bg-white border-2 border-[#FF5C77] rounded-2xl p-4 shadow-xl z-50 animate-in slide-in-from-top fade-in flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FFF0F2] rounded-full flex items-center justify-center text-2xl shrink-0">
            👿
          </div>
          <div>
            <h4 className="font-black text-[#FF5C77] text-lg">催单啦！</h4>
            <p className="text-[#4A3A3A] text-sm font-medium">库洛米大人肚子饿了，搞快点搞快点！</p>
          </div>
        </div>
      )}
    </div>
  );
}
