import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { CartItem } from '../lib/types';
import { getCart, addToCart as addToCartDb, updateCartQuantity, removeFromCart as removeFromCartDb } from '../lib/actions/cart';

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  isLoading: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: [],
  isLoading: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  
  fetchCart: async (userId: string) => {
    set({ isLoading: true });
    const items = await getCart(userId);
    set({ items, isLoading: false });
  },

  addToCart: async (userId: string, productId: string, quantity = 1) => {
    // Check if exists
    const existing = get().items.find(i => i.product_id === productId);
    if (existing) {
      // Optimistic update
      set((state) => ({
        items: state.items.map(i => i.id === existing.id ? { ...i, quantity: existing.quantity + quantity } : i),
        isOpen: true
      }));
      await addToCartDb(userId, productId, quantity);
      return;
    }

    const newItem = await addToCartDb(userId, productId, quantity);
    if (newItem) {
      set((state) => ({ items: [...state.items, newItem as any], isOpen: true }));
    }
  },

  updateQuantity: async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await get().removeFromCart(cartItemId);
      return;
    }

    // Optimistic update
    set((state) => ({
      items: state.items.map(i => i.id === cartItemId ? { ...i, quantity } : i)
    }));

    await updateCartQuantity(cartItemId, quantity);
  },

  removeFromCart: async (cartItemId: string) => {
    // Optimistic update
    set((state) => ({
      items: state.items.filter(i => i.id !== cartItemId)
    }));

    await removeFromCartDb(cartItemId);
  },

  clearCart: () => {
    set({ items: [] });
  }
}));
