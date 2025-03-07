import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IResponse} from '../types';
import { IAddOrEditWarehouse, IGetWarehouseParams, IWarehouse } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class WarehouseApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getWarehouse = (params: IGetWarehouseParams): Promise<IResponse<IWarehouse[]>> =>
    this.get(Endpoints.warehouseMany, {params});

  addNewWarehouse = (params: IAddOrEditWarehouse): Promise<AxiosResponse> =>
    this.post(Endpoints.warehouse, params);

  // updateWarehouse = (params: IAddEditProduct): Promise<AxiosResponse> =>
  //   this.patch(`${Endpoints.product}`, params);

  // deleteWarehouse = (id: string): Promise<AxiosResponse> =>
  //   this.delete(`${Endpoints.product}/${id}`);
}

export const warehouseApi = new WarehouseApi(config);
