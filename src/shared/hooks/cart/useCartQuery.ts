import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, removeFromCart } from "@api/cart";
import type { CartResponse } from "@app-types/cart";

export const useCart = () => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const addMutation = useMutation({
    mutationFn: addToCart,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData<CartResponse>(["cart"]);

      queryClient.setQueryData<CartResponse>(["cart"], (old = []) => {
        const existing = old.find((i) => i.product.id === productId);
        if (existing) {
          return old.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return old;
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      removeFromCart(productId, quantity),
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData<CartResponse>(["cart"]);
  
      queryClient.setQueryData<CartResponse>(["cart"], (old = []) =>
        old
          .map((i) =>
            i.product.id === productId
              ? { ...i, quantity: i.quantity - quantity }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
  
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(["cart"], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const deleteFromCart = async (productId: number) => {
    const cart = queryClient.getQueryData<CartResponse>(["cart"]);
    const item = cart?.find((i) => i.product.id === productId);
    if (!item) return;
    return removeMutation.mutateAsync({ productId, quantity: item.quantity });
  };

  return {
    cart: cartQuery.data,
    addToCart: (productId: number) =>
      addMutation.mutateAsync(productId),
    removeFromCart: (productId: number) =>
      removeMutation.mutateAsync({ productId, quantity: 1 }),
    deleteFromCart,
    isLoading: cartQuery.isLoading,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isProcessing: addMutation.isPending || removeMutation.isPending,
  };
};