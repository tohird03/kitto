import { TStage } from './types';
export const stage = process.env.REACT_APP_STAGE || 'dev';

export enum Endpoints {
  Base = '',

  // SETTINGS
  SignIn = '/admin/sign-in',
  RefreshToken = '/dashboard-auth/refresh',
  UserProfile = '/admin/profile',

  // STAFFS
  Staffs = '/admin',

  // CLIENTS
  Users = '/user',
  ClientsDeed = '/user/client/deed',
  SupplierDeed = '/user/supplier/deed',
  Supplier = '/user/supplier',
  ClientDeedExcelUpload = '/user/client/deed/upload',
  SupplierDeedExcelUpload = '/user/supplier/deed/upload',
  UploadClient = '/user/client/debtors',

  // PRODUCTS
  product = '/product/one',
  productsMany = '/product/many',
  // CLIENTS
  Clients = '/client/one',
  ClientsMany = '/client/many',
  // PAYMENT
  payment = '/payment/one',
  paymentMany = '/payment/many',
  // WAREHOUSE
  warehouse = '/storehouse/one',
  warehouseMany = '/storehouse/many',
  // WAREHOUSE PRODUCTS
  WarehouseProducts = '/product-storehouse/one',
  WarehouseProductsMany = '/product-storehouse/many',

  productsIncomeOrder = '/incomingOrder',
  productsIncomeOrderProduct = '/incomingProduct',
  productsOrder = '/Order',
  productsOrderStatistic = '/Order/statistica',
  productsOrderProduct = '/orderProduct',
  productsOrderExel = '/Order/upload',
  productsIncomeOrderExel = '/incomingOrder/upload',

  paymentUpload = '/payment/upload',
  incomePayment = '/incomingOrderPayment',

  // ROLES
  role = '/role',

  // RETURNED ORDER
  returnedOrder = '/returned-order',
  returnedProduct = '/returned-product',
}

const config: Record<string, TStage> = {
  dev: {
    apiUrl: 'http://51.21.171.73:3000',
  },
  prod: {
    apiUrl: 'http://51.21.171.73:3000',
  },
};

const imgConfig: Record<string, TStage> = {
  dev: {
    apiUrl: 'https://minio.mydevops.uz/',
  },
  prod: {
    apiUrl: 'https://minio.mydevops.uz/',
  },
};


// {
//   "phone": "998949174127",
//   "password": "jamalov07"
// }

export const umsStages = config[stage];
export const imgStages = imgConfig[stage];
