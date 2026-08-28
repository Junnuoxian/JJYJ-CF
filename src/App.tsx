/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Utensils, ClipboardList, ShoppingCart, User, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Menu from './pages/Menu';
import Order from './pages/Order';
import ShoppingList from './pages/ShoppingList';
import Profile from './pages/Profile';
import KuromiLoader from './components/KuromiLoader';
import { useStore } from './Store';

import Login from './pages/Login';

type TabType = 'menu' | 'order' | 'shopping' | 'profile';

export default function App() {
  const { role, setRole, isBound } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  // ensure activeTab is valid for role
  useEffect(() => {
    if (role === 'baku' && activeTab === 'menu') {
      setActiveTab('order');
    }
    if (role === 'kuromi' && activeTab === 'shopping') {
      setActiveTab('menu');
    }
  }, [role]);

  const handleTabChange = (tabId: TabType) => {
    if (tabId === activeTab || isNavigating) return;
    setIsNavigating(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setTimeout(() => setIsNavigating(false), 100);
    }, 400); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'menu': return <Menu />;
      case 'order': return <Order />;
      case 'shopping': return <ShoppingList />;
      case 'profile': return <Profile />;
      default: return <Menu />;
    }
  };

  const kuromiTabs = [
    { id: 'menu', icon: Utensils, label: '点餐' },
    { id: 'order', icon: ClipboardList, label: '订单' },
    { id: 'profile', icon: User, label: '我的' },
  ] as const;

  const bakuTabs = [
    { id: 'order', icon: ChefHat, label: '后厨' },
    { id: 'shopping', icon: ShoppingCart, label: '采购单' },
    { id: 'profile', icon: User, label: '我的' },
  ] as const;

  const tabs = role === 'kuromi' ? kuromiTabs : bakuTabs;

  if (!isBound || !role) {
    return <Login />;
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto bg-[#FFFDF9] shadow-2xl relative overflow-hidden ring-1 ring-[#FFE8E8] text-[#4A3A3A]">
      <AnimatePresence>
        {isAppLoading && <KuromiLoader fullScreen={true} text="正在准备中..." />}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden bg-[#FFFDF9] pb-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {isNavigating && <KuromiLoader fullScreen={false} text="切换中..." />}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-[#FFFDF9]/95 backdrop-blur-md border-t-[3px] border-[#FFF0F2] px-2 pb-safe pt-2 shadow-[0_-10px_40px_rgba(255,192,203,0.3)] z-40">
        <div className="flex justify-around items-center h-16 mb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as TabType)}
                className={`flex flex-col items-center justify-center w-20 transition-all duration-200 ${
                  isActive ? (role === 'kuromi' ? 'text-[#FF5C77]' : 'text-[#A288E3]') : 'text-[#C4B4B4] hover:text-[#FFA8B5]'
                }`}
              >
                <div className={`relative flex items-center justify-center p-2 rounded-[16px] transition-all duration-300 ${
                  isActive ? (role === 'kuromi' ? 'bg-[#FFF0F2] border-[#FFE0E5]' : 'bg-[#F0E6FF] border-[#E0D4FF]') + ' scale-110 shadow-sm border' : ''
                }`}>
                  <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] mt-1 font-black transition-all ${
                  isActive ? (role === 'kuromi' ? 'text-[#FF5C77]' : 'text-[#A288E3]') + ' scale-105' : 'text-[#9A8A8A] font-medium'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
