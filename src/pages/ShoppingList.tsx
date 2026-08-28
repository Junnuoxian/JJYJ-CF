import React, { useState, useMemo } from 'react';
import { ShoppingCart, Check, Circle, ChefHat, Sparkles } from 'lucide-react';
import { useStore } from '../Store';

// Mock ingredient dictionary for realism
const ingredientDB: Record<string, string[]> = {
  '火锅': ['火锅底料', '肥牛卷', '毛肚', '鸭血', '茼蒿'],
  '烧烤': ['五花肉串', '羊肉串', '韭菜', '金针菇', '烧烤料'],
  '麻辣烫': ['麻酱', '各种丸子', '宽粉', '青菜', '豆皮'],
  '深夜泡面': ['泡面', '火腿肠', '鸡蛋', '芝士片'],
  '点外卖': ['无需买菜，等外卖小哥'],
  '青椒炒肉': ['青椒', '五花肉', '大蒜', '生抽'],
  '鱼香肉丝': ['里脊肉', '木耳', '胡萝卜', '豆瓣酱', '醋'],
  '麻婆豆腐': ['嫩豆腐', '牛肉沫', '花椒粉', '豆瓣酱'],
  '辣椒炒蛋': ['青线椒', '鸡蛋', '大蒜'],
  '番茄炒蛋': ['番茄', '鸡蛋', '葱花', '糖'],
  '红烧肉': ['带皮五花肉', '冰糖', '八角', '老抽'],
  '话梅排骨': ['肋排', '话梅', '冰糖', '陈醋'],
  '可乐鸡翅': ['鸡中翅', '可乐', '姜片', '料酒'],
  '糖醋排骨': ['小排', '冰糖', '白醋', '白芝麻'],
  '蒜蓉生菜': ['生菜', '大蒜', '蚝油'],
  '酸辣土豆丝': ['土豆', '干辣椒', '陈醋', '青椒'],
  '饺子': ['饺子皮', '猪肉馅', '韭菜', '生姜'],
  '蛋炒饭': ['剩米饭', '鸡蛋', '火腿肠', '葱花'],
  '葱油拌面': ['挂面', '小葱', '老抽', '糖'],
  '煎饼果子': ['面糊', '鸡蛋', '薄脆', '甜面酱'],
  '螺蛳粉': ['螺蛳粉底料', '酸笋', '腐竹', '花生'],
  '清炒花甲': ['花甲', '大蒜', '干辣椒', '豆瓣酱'],
  '蒜蓉虾': ['鲜虾', '大蒜泥', '粉丝', '葱花'],
  '清蒸鲈鱼': ['鲈鱼', '葱丝', '姜丝', '蒸鱼豉油'],
  '小龙虾': ['小龙虾', '十三香料', '啤酒', '大蒜'],
  '草莓蛋糕': ['草莓', '淡奶油', '蛋糕胚'],
  '奶茶': ['红茶', '牛奶', '珍珠', '黑糖'],
  '水果沙拉': ['苹果', '香蕉', '火龙果', '沙拉酱'],
  '红豆汤': ['红豆', '冰糖', '陈皮'],
  '冰淇淋': ['淡奶油', '牛奶', '白糖', '香草荚']
};

export default function ShoppingList() {
  const { orders } = useStore();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Calculate required ingredients based on all 'cooking' orders
  const { shoppingItems, dishCount } = useMemo(() => {
    const activeOrders = orders.filter(o => o.status === 'cooking');
    const ingredientCounts: Record<string, number> = {};
    let count = 0;

    activeOrders.forEach(order => {
      order.items.forEach(item => {
        count += item.quantity;
        const ingredients = ingredientDB[item.dish.name] || ['神秘食材 x' + item.quantity];
        ingredients.forEach(ing => {
          ingredientCounts[ing] = (ingredientCounts[ing] || 0) + item.quantity;
        });
      });
    });

    const items = Object.entries(ingredientCounts).map(([name, qty]) => ({ name, qty }));
    return { shoppingItems: items, dishCount: count };
  }, [orders]);

  const toggleCheck = (name: string) => {
    setCheckedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const allDone = shoppingItems.length > 0 && checkedItems.length === shoppingItems.length;

  if (shoppingItems.length === 0) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center text-center bg-[#FFFDF9]">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-[4px] border-[#FFF0F2] shadow-sm">
          <ShoppingCart size={48} className="text-[#FFB3C1]" />
        </div>
        <h2 className="text-xl font-black text-[#4A3A3A] mb-2">不需要买菜哦</h2>
        <p className="text-[#9A8A8A] text-sm font-medium">目前还没有正在制作的订单，先去点几个菜吧！</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-full bg-[#FFFDF9] overflow-y-auto pb-24">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-[#FF5C77]" />
            <h2 className="text-xl font-black text-[#4A3A3A]">采购清单</h2>
          </div>
          <p className="text-xs text-[#9A8A8A] font-medium mt-1">
            为了 {dishCount} 道菜品，巴库需要买这些菜
          </p>
        </div>
        
        {allDone && (
          <div className="bg-[#FFF0F2] text-[#FF5C77] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-in zoom-in duration-300">
            <Sparkles size={14} /> 采买完成！
          </div>
        )}
      </div>

      <div className="bg-white rounded-[24px] p-2 border-[3px] border-[#FFF0F2] shadow-sm space-y-1">
        {shoppingItems.map((item, idx) => {
          const isChecked = checkedItems.includes(item.name);
          return (
            <div 
              key={idx} 
              onClick={() => toggleCheck(item.name)}
              className={`flex justify-between items-center p-3 rounded-2xl transition-all cursor-pointer active:scale-95 ${
                isChecked ? 'bg-[#FFFDF9] opacity-60' : 'bg-white hover:bg-[#FFF0F2]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isChecked ? 'bg-[#FF5C77] text-white' : 'bg-[#FFF0F2] text-[#FFB3C1]'
                }`}>
                  {isChecked ? <Check size={14} strokeWidth={3} /> : <Circle size={14} strokeWidth={3} />}
                </div>
                <span className={`font-bold text-sm transition-all ${
                  isChecked ? 'text-[#C4B4B4] line-through' : 'text-[#4A3A3A]'
                }`}>
                  {item.name}
                </span>
              </div>
              <span className={`text-xs font-black px-2 py-1 rounded-lg ${
                isChecked ? 'bg-transparent text-[#C4B4B4]' : 'bg-[#FFF0F2] text-[#FF5C77]'
              }`}>
                x{item.qty}
              </span>
            </div>
          );
        })}
      </div>
      
      {allDone && (
        <div className="mt-6 flex flex-col items-center justify-center animate-in slide-in-from-bottom-4 duration-500">
          <img src="/assets/avatar-baku.svg" className="w-16 h-16 mb-2 opacity-80 drop-shadow-sm" alt="Baku Happy" />
          <p className="text-sm font-bold text-[#FF5C77]">巴库跑腿任务圆满完成！🛵</p>
        </div>
      )}
    </div>
  );
}
