import React, { useState } from 'react';
import { useStore } from '../Store';
import { Utensils, ChefHat, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const { setRole, bindPartner } = useStore();
  const [selectedRole, setSelectedRole] = useState<'kuromi' | 'baku' | null>(null);
  const [pairingCode, setPairingCode] = useState('');
  const [step, setStep] = useState<'role' | 'pair'>('role');
  const [error, setError] = useState('');

  const myCode = '5200'; // Fixed generated code for local demo purposes

  const handleSelectRole = (role: 'kuromi' | 'baku') => {
    setSelectedRole(role);
    setStep('pair');
  };

  const handlePair = () => {
    if (bindPartner(pairingCode)) {
      setRole(selectedRole);
    } else {
      setError('配对码输入错误，请重新输入');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto bg-[#FFFDF9] shadow-2xl relative overflow-hidden ring-1 ring-[#FFE8E8] text-[#4A3A3A] items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 'role' ? (
          <motion.div
            key="role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-[4px] border-[#FFF0F2] shadow-sm text-4xl">
                🍱
              </div>
              <h1 className="text-3xl font-black text-[#4A3A3A] mb-2">专属点单系统</h1>
              <p className="text-[#9A8A8A] font-medium">请选择你的身份</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleSelectRole('kuromi')}
                className="w-full bg-white border-[3px] border-[#FFF0F2] rounded-2xl p-6 flex items-center gap-4 hover:border-[#FF5C77] active:scale-95 transition-all shadow-sm group"
              >
                <div className="w-16 h-16 bg-[#FFF0F2] rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Utensils size={32} className="text-[#FF5C77]" />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-xl text-[#4A3A3A] mb-1">我是库洛米</h3>
                  <p className="text-[#9A8A8A] text-xs font-medium">负责点菜和催单，我是干饭王！</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectRole('baku')}
                className="w-full bg-white border-[3px] border-[#FFF0F2] rounded-2xl p-6 flex items-center gap-4 hover:border-[#A288E3] active:scale-95 transition-all shadow-sm group"
              >
                <div className="w-16 h-16 bg-[#F0E6FF] rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ChefHat size={32} className="text-[#A288E3]" />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-xl text-[#4A3A3A] mb-1">我是巴库</h3>
                  <p className="text-[#9A8A8A] text-xs font-medium">负责做饭和买菜，我是大厨！</p>
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pair"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-sm flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 border-[4px] border-[#FFF0F2] shadow-sm">
              <Link size={32} className={selectedRole === 'kuromi' ? 'text-[#FF5C77]' : 'text-[#A288E3]'} />
            </div>
            
            <h2 className="text-2xl font-black text-[#4A3A3A] mb-2">绑定你的另一半</h2>
            <p className="text-[#9A8A8A] text-sm font-medium text-center mb-6">
              {selectedRole === 'kuromi' 
                ? '作为库洛米，你的专属绑定码是：' 
                : '作为巴库，你的专属绑定码是：'}
              <br/>
              <span className="text-2xl font-black text-[#4A3A3A] mt-2 mb-2 block tracking-widest">{myCode}</span>
            </p>

            <button 
              onClick={handleCopy}
              className={`w-full py-3 rounded-xl mb-8 font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                copied 
                  ? 'bg-[#E8F8F5] text-[#20B2AA] border-2 border-[#20B2AA]' 
                  : 'bg-[#FFF0F2] text-[#FF5C77] border-2 border-[#FF5C77] hover:bg-[#FF5C77] hover:text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  已复制邀请口令，快去微信发给对方吧
                </>
              ) : (
                <>
                  <Copy size={18} />
                  一键复制微信邀请口令
                </>
              )}
            </button>

            <div className="w-full space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#4A3A3A] mb-2 text-center">
                  请输入对方的6位绑定码
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pairingCode}
                  onChange={(e) => setPairingCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white text-center text-2xl tracking-[0.25em] font-black border-[3px] border-[#FFE8E8] rounded-xl px-4 py-4 focus:border-[#FF5C77] outline-none placeholder:text-[#E5E5E5] transition-colors"
                  placeholder="******"
                />
                {error && (
                  <p className="text-[#FF5C77] text-xs font-bold text-center mt-2 animate-in fade-in">{error}</p>
                )}
              </div>

              <button
                onClick={handlePair}
                disabled={pairingCode.length !== 6}
                className={`w-full font-black py-4 rounded-xl transition-all shadow-[0_4px_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none flex justify-center items-center gap-2 ${
                  pairingCode.length === 6 
                    ? (selectedRole === 'kuromi' ? 'bg-[#FF5C77] text-white shadow-[0_4px_0_#D94A62] active:shadow-[0_0px_0_#D94A62]' : 'bg-[#A288E3] text-white shadow-[0_4px_0_#8062C7] active:shadow-[0_0px_0_#8062C7]')
                    : 'bg-[#F5F5F5] text-[#C4B4B4] cursor-not-allowed shadow-[0_4px_0_#E5E5E5] active:shadow-[0_0px_0_#E5E5E5]'
                }`}
              >
                立即绑定 💞
              </button>

              <button 
                onClick={() => setStep('role')}
                className="w-full text-[#9A8A8A] text-sm font-bold hover:text-[#4A3A3A] transition-colors"
              >
                返回重新选择身份
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
