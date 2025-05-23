import {makeAutoObservable} from 'mobx';
import {productsApi} from '@/api/products';
import {IGetProductsParams, IProducts, ISingleSaleProductParams} from '@/api/products/types';
import {addNotification} from '@/utils';

class ProductsListStore {
  pageNumber = 1;
  pageSize = 100;
  name: string | null = null;
  isOpenAddEditProductModal = false;
  singleProduct: IProducts | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = (params: IGetProductsParams) =>
    productsApi.getProducts(params)
      .then(res => res)
      .catch(addNotification);

  getSingleProducts = (id: string) =>
    productsApi.getSingleProduct(id)
      .then(res => res)
      .catch(addNotification);

  getSingleSaleProducts = (params: ISingleSaleProductParams) =>
    productsApi.getSingleSaleProduct(params)
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  setName = (name: string | null) => {
    this.name = name;
  };

  setIsOpenAddEditProductModal = (isOpenAddEditProductModal: boolean) => {
    this.isOpenAddEditProductModal = isOpenAddEditProductModal;
  };

  setSingleProduct = (singleProduct: IProducts | null) => {
    this.singleProduct = singleProduct;
  };

  reset() {
    this.pageNumber = 1;
    this.pageSize = 100;
    this.name = null;
  }
}

export const productsListStore = new ProductsListStore();
