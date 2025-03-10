export const ROUTES = {
  home: '/',
  saleHistory: '/sale-history',
  statistic: '/statistic',
  signIn: '/signin',
  warehouse: '/warehouse',
  clientsInfo: '/clients-info',
  products: '/products',
  warehouseProducts: '/warehouse-products',
  staffs: '/staffs',
  payments: '/payments',
} as const;

export const roleChecker = {
  storeKeeper: 'storekeeper',
  mainStoreKeeper: 'main-storekeeper',
};
