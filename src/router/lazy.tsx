import {lazy} from 'react';
import {Loading} from '@/components';

const handleCatchChunkError = () => {
  window.location.reload();

  return {default: Loading};
};

export const Sale = lazy(() =>
  import('@/pages/Sale').then(({Sale}) => ({default: Sale})).catch(handleCatchChunkError));

export const SaleHistory = lazy(() =>
  import('@/pages/SaleHistory').then(({SaleHistory}) => ({default: SaleHistory})).catch(handleCatchChunkError));

export const Statistic = lazy(() =>
  import('@/pages/Statistic').then(({Statistic}) => ({default: Statistic})).catch(handleCatchChunkError));

export const Login = lazy(() =>
  import('@/pages/Login').then(({Login}) => ({default: Login})).catch(handleCatchChunkError));

export const ClientsInfo = lazy(() =>
  import('@/pages/ClientsInfo').then(({ClientsInfo}) => ({default: ClientsInfo})).catch(handleCatchChunkError));

export const Warehouse = lazy(() =>
  import('@/pages/Warehouse').then(({Warehouse}) => ({default: Warehouse})).catch(handleCatchChunkError));

export const ProductsList = lazy(() =>
  import('@/pages/Products').then(({ProductsList}) => ({default: ProductsList})).catch(handleCatchChunkError));

export const WarehouseProductsList = lazy(() =>
  import('@/pages/WarehouseProducts').then(({WarehouseProductsList}) => ({default: WarehouseProductsList})).catch(handleCatchChunkError));

export const Staffs = lazy(() =>
  import('@/pages/Staffs').then(({Staffs}) => ({default: Staffs})).catch(handleCatchChunkError));

export const Payments = lazy(() =>
  import('@/pages/Payments').then(({ClientsPayments}) => ({default: ClientsPayments})).catch(handleCatchChunkError));
