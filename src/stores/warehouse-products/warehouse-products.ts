import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { IGetProductsParams, IProducts } from '@/api/products/types';
import { warehouseProductsApi } from '@/api/warehouseProducts/warehouse-products';

class WarehouseProductsStore {
  pageNumber = 1;
  pageSize = 100;
  search: string | null = null;
  isOpenAddEditProductModal = false;
  isOpenTransferModal = false;
  singleWarehouseProduct: IProducts | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = (params: IGetProductsParams) =>
    warehouseProductsApi.getProducts(params)
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  setSearch = (search: string | null) => {
    this.search = search;
  };

  setIsOpenAddEditProductModal = (isOpenAddEditProductModal: boolean) => {
    this.isOpenAddEditProductModal = isOpenAddEditProductModal;
  };

  setIsOpenTransferModal = (isOpenTransferModal: boolean) => {
    this.isOpenTransferModal = isOpenTransferModal;
  };

  setSingleWarehouseProduct = (singleWarehouseProduct: IProducts | null) => {
    this.singleWarehouseProduct = singleWarehouseProduct;
  };

  reset() {
    this.pageNumber = 1;
    this.pageSize = 100;
    this.search = null;
  }
}

export const warehouseProductsStore = new WarehouseProductsStore();
