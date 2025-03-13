import {appStore} from './app';
import {authStore} from './auth';
import {breadcrumbStore} from './breadcrumb';
import {clientsInfoStore} from './clients-info';
import {paymentsStore} from './payments';
import {productsListStore} from './products-list';
import {saleStore} from './sale';
import {staffsStore} from './staffs';
import {statisticStore} from './statistik';
import {warehousesStore} from './warehouse';
import {warehouseProductsStore} from './warehouse-products';

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
