import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (!state.items.find((i) => i.id === item.id)) {
            return { items: [...state.items, item] };
          }
          return state;
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (itemId) =>
        get().items.some((item) => item.id === itemId),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
