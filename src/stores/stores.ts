import {appStore} from './app';
import {authStore} from './auth';
import {breadcrumbStore} from './breadcrumb';
import {clientsInfoStore} from './clients-info';
import {warehousesStore} from './warehouse';
import {productsListStore} from './products-list';
import {paymentsStore} from './payments';
import {staffsStore} from './staffs';
import {statisticStore} from './statistik';
import {warehouseProductsStore} from './warehouse-products';
import {saleStore} from './sale';

export const stores = {
  appStore,
  authStore,
  breadcrumbStore,
  clientsInfoStore,
  warehousesStore,
  productsListStore,
  paymentsStore,
  staffsStore,
  statisticStore,
  warehouseProductsStore,
  saleStore,
};

export const resetStores = () => {
  appStore.reset();
  authStore.reset();
  breadcrumbStore.reset();
  clientsInfoStore.reset();
  warehousesStore.reset();
  productsListStore.reset();
  warehouseProductsStore.reset();
  saleStore.reset();
};
