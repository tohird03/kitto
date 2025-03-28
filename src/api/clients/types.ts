import {IPagination, IPayment} from '../types';

// THIS SELLER USER
export interface ISeller {
  id: string;
  name: string;
  phone: string;
}

// CLIENT
export interface IClientsInfo {
  id: string;
  fullname: string;
  phone: string;
  debt: number;
  lastSale: string;
}

export interface IGetClientsInfoParams extends IPagination {
  search?: string;
}

export interface IAddClientInfo {
  id?: string;
  fullname: string;
  phone: string;
}

export interface IUpdateClient {
  id: string;
  fullname: string;
  phone: string;
}

// SUPPLIER
export interface IGetSupplierInfoParams extends IPagination {
  search?: string;
}

export interface ISupplierInfo {
  id: string;
  name: string;
  phone: string;
  lastSale: string;
  debt: number;
}

export interface IAddSupplierInfo {
  id?: string;
  name: string;
  phone: string;
}

export interface IDeedPayment extends IPayment {
  type: 'payment';
  description: string;
}
