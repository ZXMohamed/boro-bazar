/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface ProductT {
  image: {
    url: string;
    id: string;
  };
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: {
    image: {
      url: string;
      id: string;
    };
    _id: string;
    name: string;
    slug: string;
  };
  isFeatured: boolean;
  reviews: any[];
  rating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryT {
  image: {
    url: string;
    id: string;
  };
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsParamsT {
  search?: string;
  sort?: "featured" | "latest" | "price-asc" | "price-desc";
  categoryId?: number;
  exclude?: string | number;
  limit?: number;
}

export interface ProductsResponseT {
  products: ProductT[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ProductListT {
  title: string;
  description?: string;
  children?: React.ReactNode;
}
