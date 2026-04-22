import React from "react";

export interface ProductT {
  id: string;
  name: string;
  images: string[];
  price: number;
  originalPrice?: number;
  slug?: string;
  description?: string;
  stock?: number;
  category?: string;
  rating?: number;
  reviews?: number;
  brand?: string;
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

export interface ProductListT {
  title: string;
  description?: string;
  children?: React.ReactNode;
}