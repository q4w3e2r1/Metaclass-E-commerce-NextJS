import { api } from "./axios";
import { buildQuery } from "./queryBuilder";
import type { Product, StrapiResponse, RelatedProductsResponse, StrapiSingleResponse, InfiniteProductsResponse } from '@app-types/product';

export const getProductById = async (documentId: string) => {
  const query = buildQuery({
    populate: ["images", "productCategory"],
  });

  const { data } = await api.get<StrapiSingleResponse<Product>>(
    `/products/${documentId}?${query}`
  );

  return data.data;
};


export const getRelatedProductsByCategory = async (
  categoryId: number,
  excludeDocumentId?: string
): Promise<RelatedProductsResponse> => {

  const query = buildQuery({
    populate: ["images", "productCategory"],
    filters: {
      productCategory: {
        id: {
          $eq: categoryId,
        },
      },
      ...(excludeDocumentId && {
        documentId: {
          $ne: excludeDocumentId,
        },
      }),
    },
  });

  const { data } = await api.get<StrapiResponse<Product>>(
    `/products?${query}`
  );

  return {
    items: data.data,
    total: data.meta?.pagination?.total ?? 0,
    pagination: data.meta?.pagination,
  };
};

type GetInfiniteProductsParams = {
  page: number;
  pageSize: number;
  categories?: string[];
  search?: string;
  sort?:string;
  priceFrom?: string;
  priceTo?: string;
  rating?:string;
  inStock?:boolean
};

export const  getProductsInfinite = async ({
  page,
  pageSize,
  categories,
  search,
  sort,
  priceFrom,
  priceTo,
  rating,
  inStock,
}: GetInfiniteProductsParams): Promise<InfiniteProductsResponse> => {

  const filters: Record<string, unknown> = {};
  
  if (categories && categories.length > 0) {
    filters.productCategory = {
      id: {
        $in: categories,
      },
    };
  }

  if (search && search.trim().length > 0) {
    filters.title = {
      $containsi: search.trim(),
    };
  }

  if (priceFrom || priceTo) {
    filters.price = {
      ...(priceFrom && { $gte: Number(priceFrom) }),
      ...(priceTo && { $lte: Number(priceTo) }),
    };
  }

  if (rating) {
    filters.rating = {
      $gte: Number(rating),
    };
  }

  if (inStock) {
    filters.isInStock = {
      $eq: true,
    };
  }

  const resolvedSort = sort ?? (rating ? 'rating:asc' : undefined);

  const query = buildQuery({
    populate: ["images", "productCategory"],
    pagination: {
      page,
      pageSize,
      withCount: true,
    },
    ...(Object.keys(filters).length > 0 && { filters }),
    ...(resolvedSort && { sort: resolvedSort }),
  });

  const { data } = await api.get<StrapiResponse<Product>>(
    `/products?${query}`
  );

  return {
    items: data.data,
    pagination: data.meta?.pagination,
  };
};