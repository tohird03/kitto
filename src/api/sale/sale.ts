import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse, IResponseSingle } from '../types';
import { IAddSale, IGetSaleParams, IGetTotalSaleStatistic, ISale, ITotalSaleStatistic, ITotalStatisticNumber } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class SaleApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getSales = (params: IGetSaleParams): Promise<IResponse<ISale[]>> =>
    this.get(Endpoints.saleMany, { params });

  // getSingleProduct = (id: string): Promise<IResponseSingle<IProducts>> =>
  //   this.get(`${Endpoints.product}`, { params: { id } });

  // getSingleSaleProduct = (params: ISingleSaleProductParams): Promise<IResponseSingle<IProductOneForSelling>> =>
  //   this.get(`${Endpoints.productOneSelling}`, { params: { id: params?.id, minQuantity: params?.minQuantity } });

  addNewSale = (params: IAddSale): Promise<AxiosResponse> =>
    this.post(Endpoints.sale, params);

  // STATISTIC
  getSalesTotal = (params: IGetTotalSaleStatistic): Promise<IResponseSingle<ITotalSaleStatistic[]>> =>
    this.get(Endpoints.saleStatisticGraph, { params });

  getSalesStatistic = (): Promise<IResponseSingle<ITotalStatisticNumber>> =>
    this.get(Endpoints.saleStatistic);

  getUploadSale = (params: IGetSaleParams): Promise<any> =>
    this.get(`${Endpoints.saleExcel}`, {
      params,
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/xlsx',
      },
    });
}

export const saleApi = new SaleApi(config);
