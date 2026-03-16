import type {
  InfiniteProductsResponse,
  Product,
  RelatedProductsResponse,
  StrapiResponse,
  StrapiSingleResponse,
} from '@app-types/product';

import { buildQuery } from './queryBuilder';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ProductCategoryDto = {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export const getCategories = async () => {
  const query = buildQuery({
    pagination: { pageSize: 100, withCount: false },
  });

  const res = await fetch(`${BASE_URL}/product-categories?${query}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const data: StrapiResponse<ProductCategoryDto> = await res.json();
  return data.data;
};

export const getTopProductsByCategory = async (categoryId: number) => {
  const query = buildQuery({
    populate: ['images'],
    pagination: { page: 1, pageSize: 4, withCount: true },
    filters: {
      productCategory: { id: { $eq: categoryId } },
    },
  });

  const res = await fetch(`${BASE_URL}/products?${query}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return { items: [], total: 0 };

  const data: StrapiResponse<Product> = await res.json();
  return {
    items: data.data,
    total: data.meta?.pagination?.total ?? 0,
  };
};
