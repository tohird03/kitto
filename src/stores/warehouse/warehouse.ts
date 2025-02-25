import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { IWarehouse } from '@/api/warehouse/types';

class WarehouseStore {
  isOpenAddEditWarehouseModal = false;
  singleWarehouse: IWarehouse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // getClients = (params: IGetClientsInfoParams) =>
  //   clientsInfoApi.getClientsInfo(params)
  //     .then(res => res)
  //     .catch(addNotification);

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
