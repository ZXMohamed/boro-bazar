import { WishlistStateT } from "@/types/wishlist";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * Wishlist Store
 * Manages user wishlist/favorites
 * Persists to localStorage
 */
export const useWishlistStore = create<WishlistStateT>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        items: [],
        isLoading: false,
        error: null,
        lastUpdated: null,

        // Computed values
        get itemCount() {
          return get().items.length;
        },

        get isEmpty() {
          return get().items.length === 0;
        },

        // Actions
        /**
         * Add item to wishlist
         * Duplicate check based on productId
         */
        addItem: (item) =>
          set(
            (state) => {
              // Check if already in wishlist
              const exists = state.items.some(
                (i) => i.productId === item.productId,
              );

              if (exists) {
                set(
                  { error: "Item already in wishlist" },
                  false,
                  "addItem:duplicate",
                );
                return state;
              }

              return {
                items: [...state.items, { ...item, addedAt: Date.now() }],
                lastUpdated: Date.now(),
                error: null,
              };
            },
            false,
            "addItem",
          ),

        /**
         * Remove item from wishlist
         */
        removeItem: (itemId) =>
          set(
            (state) => ({
              items: state.items.filter((item) => item.id !== itemId),
              lastUpdated: Date.now(),
              error: null,
            }),
            false,
            "removeItem",
          ),

        /**
         * Check if product is in wishlist
         */
        isInWishlist: (productId) => {
          return get().items.some((item) => item.productId === productId);
        },

        /**
         * Add or remove item from wishlist
         * Useful for toggle buttons
         */
        toggleWishlist: (item) => {
          const { items } = get();
          const exists = items.some((i) => i.productId === item.productId);

          if (exists) {
            const itemToRemove = items.find(
              (i) => i.productId === item.productId,
            );
            if (itemToRemove) {
              get().removeItem(itemToRemove.id);
            }
          } else {
            get().addItem(item);
          }
        },

        /**
         * Clear entire wishlist
         */
        clearWishlist: () =>
          set(
            {
              items: [],
              lastUpdated: Date.now(),
            },
            false,
            "clearWishlist",
          ),

        /**
         * Set loading state
         */
        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

        /**
         * Set error message
         */
        setError: (error) => set({ error }, false, "setError"),

        /**
         * Clear error message
         */
        clearError: () => set({ error: null }, false, "clearError"),

        /**
         * Replace entire wishlist items
         * Used for syncing with backend
         */
        setItems: (items) =>
          set(
            {
              items,
              lastUpdated: Date.now(),
            },
            false,
            "setItems",
          ),
      }),
      {
        name: "wishlist-storage", // localStorage key
        partialize: (state) => ({
          // Only persist items
          items: state.items,
        }),
      },
    ),
    {
      name: "WishlistStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

/**
 * Selectors for better performance
 */
export const selectItems = (state: WishlistStateT) => state.items;
export const selectItemCount = (state: WishlistStateT) => state.itemCount;
export const selectIsEmpty = (state: WishlistStateT) => state.isEmpty;
export const selectIsLoading = (state: WishlistStateT) => state.isLoading;
export const selectError = (state: WishlistStateT) => state.error;
