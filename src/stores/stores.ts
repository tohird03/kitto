import {appStore} from './app';
import {authStore} from './auth';
import {breadcrumbStore} from './breadcrumb';
import {clientsInfoStore} from './clients-info';
import {warehousesStore} from './warehouse';
import {productsListStore} from './products-list';
import {paymentsStore} from './payments';
import {staffsStore} from './staffs';

export const stores = {
  appStore,
  authStore,
  breadcrumbStore,
  clientsInfoStore,
  warehousesStore,
  productsListStore,
  paymentsStore,
  staffsStore,
};

export const resetStores = () => {
  appStore.reset();
  authStore.reset();
  breadcrumbStore.reset();
  clientsInfoStore.reset();
  warehousesStore.reset();
  productsListStore.reset();
};
