import type { StrapiResponse } from '@app-types/product';

import { api } from './axios';
import { buildQuery } from './queryBuilder';

type ProductCategoryDto = {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export const getProductCategories = async () => {
  const query = buildQuery({
    pagination: {
      pageSize: 4,
      withCount: true,
    },
  });

  const { data } = await api.get<StrapiResponse<ProductCategoryDto>>(
    `/product-categories?${query}`
  );

  return {
    items: data.data,
    pagination: data.meta?.pagination,
  };
};
