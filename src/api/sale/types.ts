import {IClientsInfo} from '../clients';
import {IProducts} from '../products/types';
import {IStaffs} from '../staffs';
import {IPagination, IPaymentType} from '../types';
import {IWarehouse} from '../warehouse/types';

export interface IGetSaleParams extends IPagination {
  startDate?: string;
  endDate?: string;
}

export interface ISale {
  totalSum: number;
  debt: number;
  staff: IStaffs;
  client?: IClientsInfo;
  createdAt: string;
  products: ISaleProduct[];
}

export interface ISaleProductStorehouse {
  product: IProducts;
  storehouse: IWarehouse;
}

export interface ISaleProduct {
  quantity: number;
  productStorehouse: ISaleProductStorehouse;
}

export interface IAddSaleProducts {
  id: string;
  quantity: number;
}

export interface IAddSale {
  clientId?: string;
  totalSum: number;
  products: IAddSaleProducts[];
  payment?: IPaymentType;
}

export interface IAddSaleForm extends IPaymentType {
  clientId: string;
  totalSum: number;
}

export interface IGetTotalSaleStatistic {
  type: 'day' | 'week' | 'month' | 'year';
}

export interface ITotalSaleStatistic {
  date: string;
  sum: string;
}

export interface ITotalStatisticNumber {
  monthly: number;
  daily: number;
  weekly: number;
  yearly: number;
}
