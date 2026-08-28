import React, { createContext, useContext, useState } from 'react';

export type OrderItem = {
  id?: string;
  dish: {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
  };
  quantity: number;
  options?: string[];
};

export type OrderData = {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'cooking' | 'delivering' | 'completed';
  remark?: string;
  urged?: boolean;
  rating?: number;
};

type StoreContextType = {
  role: 'kuromi' | 'baku' | null;
  setRole: (role: 'kuromi' | 'baku' | null) => void;
  isBound: boolean;
  bindPartner: (code: string) => boolean;
  unbindPartner: () => void;
  customAddons: string[];
  addCustomAddon: (addon: string) => void;
  orders: OrderData[];
  addOrder: (order: OrderData) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  cart: OrderItem[];
  addToCart: (dish: OrderItem['dish'], options?: string[]) => void;
  removeFromCart: (cartItemId: string | number) => void;
  clearCart: () => void;
  completeOrder: (id: string) => void;
  urgeOrder: (id: string) => void;
  rateOrder: (id: string, rating: number) => void;
  lastUrgedOrder: string | null;
  clearUrgeNotification: () => void;
};

const StoreContext = createContext<StoreContextType>({} as any);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<'kuromi' | 'baku' | null>(() => {
    const savedRole = localStorage.getItem('partner_role');
    return (savedRole as 'kuromi' | 'baku') || null;
  });
  
  const [isBound, setIsBound] = useState<boolean>(() => {
    return localStorage.getItem('partner_bound') === 'true';
  });

  const [customAddons, setCustomAddons] = useState<string[]>(() => {
    const saved = localStorage.getItem('custom_addons');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [lastUrgedOrder, setLastUrgedOrder] = useState<string | null>(null);

  const bindPartner = (code: string) => {
    // For local simulation, any 6-digit code works
    if (code.length === 6) {
      setIsBound(true);
      localStorage.setItem('partner_bound', 'true');
      if (role) {
        localStorage.setItem('partner_role', role);
      }
      return true;
    }
    return false;
  };

  const unbindPartner = () => {
    setIsBound(false);
    setRole(null);
    localStorage.removeItem('partner_bound');
    localStorage.removeItem('partner_role');
  };

  const addCustomAddon = (addon: string) => {
    setCustomAddons(prev => {
      if (prev.includes(addon)) return prev;
      const newAddons = [...prev, addon];
      if (newAddons.length > 30) newAddons.shift(); // keep max 30
      localStorage.setItem('custom_addons', JSON.stringify(newAddons));
      return newAddons;
    });
  };

  const addOrder = (order: OrderData) => setOrders((prev) => [order, ...prev]);
  
  const completeOrder = (id: string) => {
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: 'completed' } : o));
  };

  const urgeOrder = (id: string) => {
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, urged: true } : o));
    setLastUrgedOrder(id);
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([200, 100, 200]);
    }
  };

  const clearUrgeNotification = () => setLastUrgedOrder(null);

  const rateOrder = (id: string, rating: number) => {
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, rating } : o));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addToCart = (dish: OrderItem['dish'], options?: string[]) => {
    setCart(prev => {
      const optionsStr = options ? options.join(',') : '';
      const existing = prev.find(item => item.dish.id === dish.id && (item.options?.join(',') || '') === optionsStr);
      if (existing) {
        return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: Math.random().toString(36).substr(2, 9), dish, quantity: 1, options }];
    });
  };

  const removeFromCart = (cartItemId: string | number) => {
    setCart(prev => {
      // Need backward compatibility for just dishId when removing
      const existing = prev.find(item => item.id === cartItemId || item.dish.id === cartItemId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter(item => item !== existing);
    });
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ 
      role, setRole, isBound, bindPartner, unbindPartner, customAddons, addCustomAddon,
      orders, addOrder, completeOrder, urgeOrder, rateOrder, lastUrgedOrder, clearUrgeNotification,
      favorites, toggleFavorite, 
      cart, addToCart, removeFromCart, clearCart 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
