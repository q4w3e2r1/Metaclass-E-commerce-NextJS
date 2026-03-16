export const routes = {
  main: {
    mask: '/',
    getRoute: () => '/',
  },
  products: {
    mask: '/products/',
    getRoute: () => '/products',
  },
  categories: {
    mask: '/categories/',
    getRoute: () => '/categories',
  },
  product: {
    mask: '/products/:productId',
    getRoute: (id: string | number) => `/products/${id}`,
  },
  auth: {
    mask: '/login',
    getRoute: () => '/login',
  },
};
