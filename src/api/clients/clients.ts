import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import {
  IAddClientInfo,
  IClientsInfo,
  IGetClientsInfoParams,
  IUpdateClient,
} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class ClientsInfoApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getClientsInfo = (params: IGetClientsInfoParams): Promise<IResponse<IClientsInfo[]>> =>
    this.get(Endpoints.ClientsMany, { params });

  addClients = (params: IAddClientInfo): Promise<AxiosResponse> =>
    this.post(Endpoints.Clients, params);

  updateClient = (params: IUpdateClient): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.Users}/${params?.id}`, params);

  //
  getSingleClient = (clientId: string): Promise<IClientsInfo> =>
    this.get(`${Endpoints.Users}/${clientId}`);

  deleteClient = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.Users}/${id}`);

  getUploadClients = (params: IGetClientsInfoParams): Promise<any> =>
    this.get(`${Endpoints.UploadClient}`, {
      params,
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/xlsx',
      },
    });
}

export const clientsInfoApi = new ClientsInfoApi(config);
