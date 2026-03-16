import type { Product } from '@app-types/product';

export interface CartItem {
  id: number;
  documentId: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type CartResponse = CartItem[];
