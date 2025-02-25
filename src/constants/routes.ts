export const ROUTES = {
  home: '/',
  signIn: '/signin',
  warehouse: '/warehouse',
  clientsInfo: '/clients-info',
  products: '/products',
} as const;

export const roleChecker = {
  storeKeeper: 'storekeeper',
  mainStoreKeeper: 'main-storekeeper',
};
