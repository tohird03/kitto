import {IProducts} from '../products/types';
import {IPagination} from '../types';
import {IWarehouse} from '../warehouse/types';

export interface IGetWarehouseProductsParams extends IPagination {
  name?: string;
}

export interface IWarehouseProducts {
  id: string;
  quantity: number;
  product: IProducts;
  storehouse: IWarehouse;
}

export interface IAddEditWarehouseProduct {
  productId?: string;
  quantity: number;
  storehouseId: string;
}
