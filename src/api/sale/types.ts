import { IStaffs } from '../staffs';
import {IPagination, IPaymentType} from '../types';

export interface IGetSaleParams extends IPagination {
  startDate?: string;
  endDate?: string;
}

export interface ISale {
  totalSum: number;
  staff: IStaffs;
  createdAt: string;
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
