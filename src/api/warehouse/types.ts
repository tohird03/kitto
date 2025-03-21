import {IPagination} from '../types';

export interface IWarehouse {
  id: string;
  debt: number;
  name: string;
  hexColor: string;
  totalPackagesCount: number;
  totalPriceCount: string;
  totalCostCount: string;
}

export interface IGetWarehouseParams extends IPagination {
  name?: string;
}

export interface IAddOrEditWarehouse {
  name: string;
  hexColor: string;
  id?: string;
}
