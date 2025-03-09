import { TStage } from './types';
export const stage = process.env.REACT_APP_STAGE || 'dev';

export enum Endpoints {
  Base = '',

  // SETTINGS
  SignIn = '/auth/sign-in',
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

  // STAFFS
  Staff = '/staff/one',
  StaffMany = '/staff/many',
  // PRODUCTS
  product = '/product/one',
  productsMany = '/product/many',
  productOneSelling = '/product/one-for-selling',
  productExcel = '/product/excel',
  // CLIENTS
  Clients = '/client/one',
  ClientsMany = '/client/many',
  // PAYMENT
  payment = '/payment/one',
  paymentMany = '/payment/many',
  paymentUpload = '/payment/excel',
  // SALE
  sale = '/selling/one',
  saleMany = '/selling/many',

  // WAREHOUSE
  warehouse = '/storehouse/one',
  warehouseMany = '/storehouse/many',
  // WAREHOUSE PRODUCTS
  WarehouseProducts = '/product-storehouse/one',
  WarehouseProductsMany = '/product-storehouse/many',
  // ROLE
  Role = '/role/one',
  RoleMany = '/role/many',

  productsIncomeOrder = '/incomingOrder',
  productsIncomeOrderProduct = '/incomingProduct',
  productsOrder = '/Order',
  productsOrderStatistic = '/Order/statistica',
  productsOrderProduct = '/orderProduct',
  productsOrderExel = '/Order/upload',
  productsIncomeOrderExel = '/incomingOrder/upload',

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
