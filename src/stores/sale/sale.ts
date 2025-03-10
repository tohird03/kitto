import { makeAutoObservable } from 'mobx';
import { addNotification } from '@/utils';
import { IClientsPayments, IGetClientsPaymentsParams } from '@/api/payment/types';
import { ISaleProduct, SalesData } from '@/pages/Sale/Sale';
import { saleApi } from '@/api/sale/sale';
import { IGetSaleParams, IGetTotalSaleStatistic } from '@/api/sale/types';

class SaleStore {
  #today = new Date().toISOString().split('T')[0];

  pageNumber = 1;
  pageSize = 10;
  search: string | null = null;
  isOpenAddEditSaleModal = false;
  activeSaleProducts: ISaleProduct[] = [];
  singleSale: IClientsPayments | null = null;
  startDate: string | null = this.#today;
  endDate: string | null = this.#today;
  sales: SalesData = { '1': [] };
  activeKey = '1';

  constructor() {
    makeAutoObservable(this);
  }

  getSales = (params: IGetSaleParams) =>
    saleApi.getSales(params)
      .then(res => res)
      .catch(addNotification);

  getSalesStatisticGraph = (params: IGetTotalSaleStatistic) =>
    saleApi.getSalesTotal(params)
      .then(res => res)
      .catch(addNotification);

  getSalesStatistic = () =>
    saleApi.getSalesStatistic()
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

  setIsOpenAddEditSaleModal = (isOpenAddEditSaleModal: boolean) => {
    this.isOpenAddEditSaleModal = isOpenAddEditSaleModal;
  };

  setActiveSaleProducts = (activeSaleProducts: ISaleProduct[]) => {
    this.activeSaleProducts = activeSaleProducts;
  };

  setSingleSale = (singleSale: IClientsPayments | null) => {
    this.singleSale = singleSale;
  };

  setStartDate = (startDate: string | null) => {
    this.startDate = startDate;
  };

  setEndDate = (endDate: string | null) => {
    this.endDate = endDate;
  };

  setSales = (sales: SalesData) => {
    this.sales = sales;
  };

  setActiveKey = (activeKey: string) => {
    this.activeKey = activeKey;
  };

  // TAB ACTIONS
  addTab = () => {
    const tabNumbers = Object.keys(this.sales).map(Number);
    const newKey = String(Math.max(...tabNumbers, 0) + 1);

    this.setSales({
      ...this.sales,
      [newKey]: [],
    });

    this.setActiveKey(newKey);
  };

  removeTab = (targetKey: string) => {
    const newSales: SalesData = {};
    const sortedKeys = Object.keys(this.sales).map(Number).sort((a, b) => a - b);

    let newActiveKey = this.activeKey;
    let newKeyCounter = 1;

    sortedKeys.forEach((key) => {
      if (String(key) !== targetKey) {
        newSales[String(newKeyCounter)] = this.sales[String(key)]; // Eski keyni yangi keyga o‘zgartirish
        if (this.activeKey === String(key)) {
          newActiveKey = String(newKeyCounter);
        }
        newKeyCounter++;
      }
    });

    if (Object.keys(newSales).length === 0) {
      newSales['1'] = [];
      newActiveKey = '1';
    }

    this.setSales(newSales);
    this.setActiveKey('1');
  };

  reset() {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.search = null;
  }
}

export const saleStore = new SaleStore();
