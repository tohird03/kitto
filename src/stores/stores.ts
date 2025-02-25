import {appStore} from './app';
import {authStore} from './auth';
import {breadcrumbStore} from './breadcrumb';
import {clientsInfoStore} from './clients-info';
import {warehousesStore} from './warehouse';
import {productsListStore} from './products-list';

export const stores = {
  appStore,
  authStore,
  breadcrumbStore,
  clientsInfoStore,
  warehousesStore,
  productsListStore,
};

export const resetStores = () => {
  appStore.reset();
  authStore.reset();
  breadcrumbStore.reset();
  clientsInfoStore.reset();
  warehousesStore.reset();
  productsListStore.reset();
};
