export interface WishlistItemT {
  id: string;
  productId: string;
  productName: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  addedAt: number;
}

export interface WishlistStateT {
  // State
  items: WishlistItemT[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Computed values
  itemCount: number;
  isEmpty: boolean;

  // Actions
  addItem: (item: WishlistItemT) => void;
  removeItem: (itemId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (item: WishlistItemT) => void;
  clearWishlist: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setItems: (items: WishlistItemT[]) => void;
}
