export interface ProductT {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
}

export interface ProductsParamsT {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: string;
}

export interface ProductsResponseT {
  products: ProductT[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CategoryT {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
