import { buildQuery } from "./queryBuilder";
import type { Product, StrapiResponse, StrapiSingleResponse, RelatedProductsResponse, InfiniteProductsResponse } from '@app-types/product';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProductById = async (documentId: string) => {
  const query = buildQuery({ populate: ["images", "productCategory"] });

  const res = await fetch(`${BASE_URL}/products/${documentId}?${query}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data: StrapiSingleResponse<Product> = await res.json();
  return data.data;
};

export const getRelatedProductsByCategory = async (
  categoryId: number,
  excludeDocumentId?: string
): Promise<RelatedProductsResponse> => {
  const query = buildQuery({
    populate: ["images", "productCategory"],
    filters: {
      productCategory: { id: { $eq: categoryId } },
      ...(excludeDocumentId && { documentId: { $ne: excludeDocumentId } }),
    },
  });

  const res = await fetch(`${BASE_URL}/products?${query}`, {
    next: { revalidate: 60 },
  });


  const data: StrapiResponse<Product> = await res.json();
  return {
    items: data.data,
    total: data.meta?.pagination?.total ?? 0,
    pagination: data.meta?.pagination,
  };
};

export const getProductsInfiniteServer = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<InfiniteProductsResponse> => {
  const query = buildQuery({
    populate: ["images", "productCategory"],
    pagination: { page, pageSize, withCount: true },
  });

  const res = await fetch(`${BASE_URL}/products?${query}`, {
    next: { revalidate: 600 },
  });

  const data: StrapiResponse<Product> = await res.json();
  return {
    items: data.data,
    pagination: data.meta?.pagination,
  };
};