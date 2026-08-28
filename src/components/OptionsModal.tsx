import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../Store';

export const customizableOptions = {
  flavors: ['麻辣味', '番茄味', '清汤味', '菌汤味'],
  addons: ['撒尿牛丸', '肥牛卷', '鲜毛肚', '土豆粉', '方便面', '娃娃菜', '金针菇', '腐竹']
};

interface OptionsModalProps {
  dish: any;
  onClose: () => void;
  onConfirm: (options: string[]) => void;
}

export default function OptionsModal({ dish, onClose, onConfirm }: OptionsModalProps) {
  const { customAddons, addCustomAddon } = useStore();
  const [flavor, setFlavor] = useState(customizableOptions.flavors[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [customAddonInput, setCustomAddonInput] = useState('');

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev => 
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const handleAddCustomAddon = () => {
    const addon = customAddonInput.trim();
    if (addon && !customizableOptions.addons.includes(addon)) {
      addCustomAddon(addon);
      if (!selectedAddons.includes(addon)) {
        setSelectedAddons(prev => [...prev, addon]);
      }
      setCustomAddonInput('');
    }
  };

  const handleConfirm = () => {
    onConfirm([flavor, ...selectedAddons]);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex items-end justify-center sm:items-center">
      <div className="bg-[#FFFDF9] border-t-[3px] border-x-[3px] sm:border-[3px] sm:rounded-[32px] border-[#FFF0F2] w-full max-w-md rounded-t-[32px] p-6 pb-8 shadow-[0_-10px_40px_rgba(255,192,203,0.3)] animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h3 className="font-black text-xl text-[#4A3A3A]">{dish.name} - 选点啥</h3>
          <button onClick={onClose} className="text-[#C4B4B4] hover:text-[#FF5C77] bg-[#FFF0F2] p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 py-2">
          {/* Flavor Selection */}
          <div>
            <h4 className="font-bold text-[#4A3A3A] mb-3">锅底口味 (单选)</h4>
            <div className="flex flex-wrap gap-2">
              {customizableOptions.flavors.map(f => (
                <button
                  key={f}
                  onClick={() => setFlavor(f)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${flavor === f ? 'bg-[#FF5C77] text-white shadow-md' : 'bg-white border-2 border-[#FFE8E8] text-[#9A8A8A]'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Addons Selection */}
          <div>
            <h4 className="font-bold text-[#4A3A3A] mb-3">加点配菜 (可多选)</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {[...customizableOptions.addons, ...customAddons].map(a => {
                const isSelected = selectedAddons.includes(a);
                return (
                  <button
                    key={a}
                    onClick={() => toggleAddon(a)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isSelected ? 'bg-[#FFCF3D] text-[#6B4B1B] shadow-md border-2 border-[#E5B220]' : 'bg-white border-2 border-[#FFE8E8] text-[#9A8A8A]'}`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={customAddonInput}
                onChange={(e) => setCustomAddonInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomAddon()}
                placeholder="没找到想要的？手动输入..."
                className="flex-1 bg-[#FFFDF9] text-[#4A3A3A] border-2 border-[#FFE8E8] rounded-full px-4 py-2 text-sm focus:border-[#FF5C77] outline-none placeholder:text-[#C4B4B4] font-medium"
              />
              <button 
                onClick={handleAddCustomAddon}
                disabled={!customAddonInput.trim()}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${customAddonInput.trim() ? 'bg-[#FF5C77] text-white shadow-sm' : 'bg-[#F5F5F5] text-[#C4B4B4]'}`}
              >
                添加
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t-2 border-dashed border-[#FFE8E8]">
          <button 
            onClick={handleConfirm}
            className="w-full bg-[#FF5C77] text-white font-black py-4 rounded-full shadow-[0_4px_0_#D94A62] active:shadow-[0_0px_0_#D94A62] active:translate-y-1 transition-all text-lg"
          >
            选好了，加入购物车
          </button>
        </div>
      </div>
    </div>
  );
}
