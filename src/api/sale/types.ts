import { IPagination, IPaymentType } from "../types";

export interface IGetSaleParams extends IPagination {
  startDate?: string;
  endDate?: string;
}

export interface ISale {
  totalSum: number;
}

export interface IAddSaleProducts {
  id: string;
  quantity: number;
}

export interface IAddSale {
  clientId: string,
  totalSum: number,
  products: IAddSaleProducts[],
  payment: IPaymentType,
}

export interface IAddSaleForm extends IPaymentType {
  clientId: string,
  totalSum: number,
}
