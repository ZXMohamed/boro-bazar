export interface CartItemT {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  subtotal: number;
  selectedVariants?: {
    [key: string]: string; // e.g., { "size": "L", "color": "red" }
  };
}

export interface AddToCartPayloadT {
  productId: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface AddToCartResponseT {
  cartItem: CartItemT;
  cartTotal: number;
  itemCount: number;
}

export interface CartSummaryT {
  items: CartItemT[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CartStateT {
  // State
  items: CartItemT[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Computed values (getters)
  itemCount: number;
  totalQuantity: number;
  summary: CartSummaryT;

  // Actions
  addItem: (item: CartItemT) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateItem: (itemId: string, updates: Partial<CartItemT>) => void;
  clearCart: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setItems: (items: CartItemT[]) => void;
}
