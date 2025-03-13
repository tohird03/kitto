import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IResponse} from '../types';
import {IAddStaff, IGetStaffsParams, IStaffs, IUpdateStaff} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class StaffsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getStaffs = (params: IGetStaffsParams): Promise<IResponse<IStaffs[]>> =>
    this.get(Endpoints.StaffMany, {params});

  addNewStaff = (params: IAddStaff): Promise<AxiosResponse> =>
    this.post(Endpoints.Staff, params);

  updateStaff = (params: IUpdateStaff): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.Staff}`, params, {params: {id: params?.id}});

  deleteStaff = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.Staff}`, {params: {id}});

  getSingleStaffs = (id: string): Promise<AxiosResponse<IStaffs>> =>
    this.get(`${Endpoints.Staff}`, {params: {id}});
}

export const staffsApi = new StaffsApi(config);
