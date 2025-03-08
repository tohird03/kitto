import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { IAddEditWarehouseProduct, IGetWarehouseProductsParams, IWarehouseProducts } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class WarehouseProductsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProducts = (params: IGetWarehouseProductsParams): Promise<IResponse<IWarehouseProducts[]>> =>
    this.get(Endpoints.WarehouseProductsMany, { params });

  addNewProduct = (params: IAddEditWarehouseProduct): Promise<AxiosResponse> =>
    this.post(Endpoints.WarehouseProducts, params);

  updateProduct = (params: IAddEditWarehouseProduct): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.WarehouseProducts}`, params, { params: { id: params?.productId } });

  deleteProduct = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.WarehouseProducts}`, {params: {id}});
}

export const warehouseProductsApi = new WarehouseProductsApi(config);
