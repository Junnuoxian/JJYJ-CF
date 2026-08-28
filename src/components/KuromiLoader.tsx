import React from 'react';
import { motion } from 'motion/react';

type KuromiLoaderProps = {
  text?: string;
  fullScreen?: boolean;
};

export default function KuromiLoader({ text = '努力加载中...', fullScreen = false }: KuromiLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col items-center justify-center bg-[#FFFDF9]/90 backdrop-blur-sm z-[200] ${
        fullScreen ? 'fixed inset-0' : 'absolute inset-0'
      }`}
    >
      {/* Chase Scene Container */}
      <div className="relative flex items-center justify-center w-64 h-32 mb-4">
        
        {/* Speed Lines / Dust */}
        <div className="absolute -bottom-2 w-48 h-2 overflow-hidden flex items-center justify-center opacity-60">
           <motion.div 
             className="w-[200%] h-full border-t-[3px] border-dashed border-[#FFB3C1]"
             animate={{ x: [0, -40] }}
             transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
           />
        </div>

        {/* Kuromi (The Attacker) */}
        <motion.div
          className="absolute z-20"
          animate={{ x: [-40, -40, -5, -40, -40] }}
          transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.3, 0.4, 0.6, 1] }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
            className="relative rotate-[5deg]"
          >
            {/* Kuromi Avatar */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-[3px] border-[#FFF0F2] shadow-sm overflow-hidden p-1">
              <img src="/assets/avatar-kuromi.svg" alt="Kuromi" className="w-full h-full object-contain" />
            </div>
            
            {/* Anger Symbol */}
            <span className="absolute -top-2 -left-2 text-xl drop-shadow-sm">💢</span>
            
            {/* Weapon (Frying Pan) */}
            <motion.div
              className="absolute top-0 -right-5 text-3xl origin-bottom-left"
              animate={{ rotate: [-20, -20, 70, -20, -20] }}
              transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.3, 0.4, 0.6, 1] }}
            >
              🍳
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Baku (The Victim) */}
        <motion.div
          className="absolute z-10"
          animate={{ x: [20, 20, 45, 20, 20] }}
          transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.3, 0.45, 0.7, 1] }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.25, repeat: Infinity, delay: 0.1, ease: "linear" }}
            className="relative rotate-[12deg]"
          >
            {/* Baku Avatar */}
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-[3px] border-[#FFE8E8] shadow-sm overflow-hidden p-1">
              <img src="/assets/avatar-baku.svg" alt="Baku" className="w-full h-full object-contain" />
            </div>

            {/* Sweat Symbol */}
            <motion.span 
              className="absolute -top-3 -right-2 text-lg drop-shadow-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💦
            </motion.span>
            
            {/* Hit Effect (Pow!) */}
            <motion.div
              className="absolute top-1 -left-4 text-2xl z-30 drop-shadow-md"
              animate={{ 
                opacity: [0, 0, 1, 0, 0], 
                scale: [0.5, 0.5, 1.3, 0.8, 0.5],
                rotate: [0, 0, 15, -15, 0]
              }}
              transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.35, 0.4, 0.6, 1] }}
            >
              💥
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="mt-6 font-black text-[#FF5C77] tracking-widest text-sm flex gap-1 items-center bg-[#FFF0F2] px-4 py-1.5 rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <span className="animate-spin mr-1">💫</span>
        {text}
      </motion.div>
    </motion.div>
  );
}
