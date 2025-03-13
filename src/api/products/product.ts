import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IResponse, IResponseSingle} from '../types';
import {IAddEditProduct, IGetProductsParams, IProductOneForSelling, IProducts, IProductTotalCalc, ISingleSaleProductParams} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class ProductsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProducts = (params: IGetProductsParams): Promise<IResponse<IProducts[], IProductTotalCalc>> =>
    this.get(Endpoints.productsMany, {params});

  getSingleProduct = (id: string): Promise<IResponseSingle<IProducts>> =>
    this.get(`${Endpoints.product}`, {params: {id}});

  getSingleSaleProduct = (params: ISingleSaleProductParams): Promise<IResponseSingle<IProductOneForSelling>> =>
    this.get(`${Endpoints.productOneSelling}`, {params: {code: Number(params?.code), minQuantity: params?.minQuantity}});

  addNewProduct = (params: IAddEditProduct): Promise<AxiosResponse> =>
    this.post(Endpoints.product, params);

  updateProduct = (params: IAddEditProduct): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.product}`, params, {params: {id: params?.id}});

  deleteProduct = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.product}`, {params: {id}});

  getUploadProducts = (): Promise<any> =>
    this.get(`${Endpoints.productExcel}`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/xlsx',
      },
    });
}

export const productsApi = new ProductsApi(config);
