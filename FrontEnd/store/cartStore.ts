import { CartItemT, CartStateT, CartSummaryT } from "@/types/cart";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * Helper function to calculate cart summary
 */
const calculateSummary = (items: CartItemT[]): CartSummaryT => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Placeholder calculations - adjust based on your logic
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const discount = 0; // Will be set by promo codes

  const total = subtotal + tax + shipping - discount;

  return {
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    total: Math.round(total * 100) / 100,
    itemCount: items.length,
  };
};

/**
 * Cart Store
 * Manages shopping cart state and operations
 * Persists to localStorage
 */
export const useCartStore = create<CartStateT>()(
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

        get totalQuantity() {
          return get().items.reduce((sum, item) => sum + item.quantity, 0);
        },

        get summary() {
          return calculateSummary(get().items);
        },

        // Actions
        /**
         * Add item to cart
         * If item exists, increase quantity
         */
        addItem: (item) =>
          set(
            (state) => {
              const existingItem = state.items.find(
                (i) =>
                  i.productId === item.productId &&
                  JSON.stringify(i.selectedVariants || {}) ===
                    JSON.stringify(item.selectedVariants || {}),
              );

              if (existingItem) {
                return {
                  items: state.items.map((i) =>
                    i.id === existingItem.id
                      ? { ...i, quantity: i.quantity + item.quantity }
                      : i,
                  ),
                  lastUpdated: Date.now(),
                };
              }

              return {
                items: [...state.items, item],
                lastUpdated: Date.now(),
              };
            },
            false,
            "addItem",
          ),

        /**
         * Remove item from cart
         */
        removeItem: (itemId) =>
          set(
            (state) => ({
              items: state.items.filter((item) => item.id !== itemId),
              lastUpdated: Date.now(),
            }),
            false,
            "removeItem",
          ),

        /**
         * Update quantity of item
         * Remove if quantity <= 0
         */
        updateQuantity: (itemId, quantity) =>
          set(
            (state) => ({
              items:
                quantity <= 0
                  ? state.items.filter((item) => item.id !== itemId)
                  : state.items.map((item) =>
                      item.id === itemId ? { ...item, quantity } : item,
                    ),
              lastUpdated: Date.now(),
            }),
            false,
            "updateQuantity",
          ),

        /**
         * Update multiple fields of an item
         */
        updateItem: (itemId, updates) =>
          set(
            (state) => ({
              items: state.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item,
              ),
              lastUpdated: Date.now(),
            }),
            false,
            "updateItem",
          ),

        /**
         * Clear entire cart
         */
        clearCart: () =>
          set(
            {
              items: [],
              lastUpdated: Date.now(),
            },
            false,
            "clearCart",
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
         * Replace entire cart items
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
        name: "cart-storage", // localStorage key
        partialize: (state) => ({
          // Only persist items and lastUpdated
          items: state.items,
          lastUpdated: state.lastUpdated,
        }),
      },
    ),
    {
      name: "CartStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

/**
 * Selectors for better performance
 */
export const selectItems = (state: CartStateT) => state.items;
export const selectItemCount = (state: CartStateT) => state.itemCount;
export const selectTotalQuantity = (state: CartStateT) => state.totalQuantity;
export const selectSummary = (state: CartStateT) => state.summary;
export const selectIsLoading = (state: CartStateT) => state.isLoading;
export const selectError = (state: CartStateT) => state.error;
