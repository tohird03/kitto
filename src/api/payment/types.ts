import {IClientsInfo} from '../clients';
import {IPagination, IPaymentType} from '../types';

export interface IClientsPayments extends IPaymentType {
  id: string;
  createdAt: string;
  order: any;
  client: IClientsInfo;
}

export interface IGetClientsPaymentsParams extends IPagination {
  search?: string;
  startDate?: string;
  endDate?: string;
  clientId?: string;
}

export interface IAddEditPaymentParams {
  id?: string;
  orderId?: string;
  clientId: string;
  cash: number;
  card: number;
  transfer: number;
  other: number;
  sendUser?: boolean;
}

export interface ITotalPayment {
  totalPay: number;
  totalCard: number;
  totalCash: number;
  totalTransfer: number;
  totalOther: number;
}
