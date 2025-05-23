import {IPagination} from '../types';
import {IWarehouseProducts} from '../warehouseProducts/types';

export interface IGetProductsParams extends IPagination {
  name?: string;
}


export interface IProducts {
  id: string;
  name: string;
  quantity: number;
  warningThreshold: number;
  createdAt: string;
  // Sotib olingan narx
  cost: number;
  // Sotuvda sotiladigan narxi
  price: number;
  // Foyda
  countInStorehouses: number;
  image: string;
  barcode: {
    code: number;
  };
}

export interface IProductOneForSelling extends IProducts {
  storehouses: IWarehouseProducts[];
}

export interface IAddEditProduct {
  id?: string;
  name: string;
  cost: number;
  price: number;
  quantity: number;
  warningThreshold: number;
}

export interface IProductTotalCalc {
  totalProductCount: number;
  totalProductCost: number;
  totalProductPrice: number;
}

export interface ISingleSaleProductParams {
  code: number;
  minQuantity: number;
}

export interface IProductTransferForm {
  fromStorehouseId: string;
  toStorehouseId: string;
  id: string;
  quantity: number;
}

export interface IProductTransfer {
  fromStorehouseId: string;
  toStorehouseId: string;
  products: {
    id: string;
    quantity: number;
  }[];
}
