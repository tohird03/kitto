import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { IGetWarehouseParams, IWarehouse } from '@/api/warehouse/types';
import { warehouseApi } from '@/api/warehouse/warehouse';

class WarehouseStore {
  isOpenAddEditWarehouseModal = false;
  singleWarehouse: IWarehouse | null = null;
  pageNumber = 1;
  pageSize = 10;
  name: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getWarehouse = (params: IGetWarehouseParams) =>
    warehouseApi.getWarehouse(params)
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  setName = (name: string | null) => {
    this.name = name;
  };

  setIsOpenAddEditWarehouseModal = (isOpenAddEditWarehouseModal: boolean) => {
    this.isOpenAddEditWarehouseModal = isOpenAddEditWarehouseModal;
  };

  setSingleWarehouse = (singleWarehouse: IWarehouse | null) => {
    this.singleWarehouse = singleWarehouse;
  };

  reset() {
  }
}

export const warehousesStore = new WarehouseStore();
