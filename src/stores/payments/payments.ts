import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { IClientsPayments, IGetClientsPaymentsParams } from '@/api/payment/types';
import { paymentApi } from '@/api/payment';

class PaymentsStore {
  #today = new Date().toISOString().split('T')[0];

  pageNumber = 1;
  pageSize = 10;
  search: string | null = null;
  isOpenAddEditPaymentModal = false;
  singlePayment: IClientsPayments | null = null;
  startDate: string | null = this.#today;
  endDate: string | null = this.#today;

  constructor() {
    makeAutoObservable(this);
  }

  getClientsPayments = (params: IGetClientsPaymentsParams) =>
    paymentApi.getPayments(params)
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

  setIsOpenAddEditPaymentModal = (isOpenAddEditPaymentModal: boolean) => {
    this.isOpenAddEditPaymentModal = isOpenAddEditPaymentModal;
  };

  setSinglePayment = (singlePayment: IClientsPayments | null) => {
    this.singlePayment = singlePayment;
  };

  setStartDate = (startDate: string | null) => {
    this.startDate = startDate;
  };

  setEndDate = (endDate: string | null) => {
    this.endDate = endDate;
  };

  reset() {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.search = null;
  }
}

export const paymentsStore = new PaymentsStore();
