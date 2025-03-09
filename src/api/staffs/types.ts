import {IPagination} from '../types';

export interface IStaffs {
  id: string;
  fullname: string;
  phone: string;
  actionIds: string[];
}

export interface IGetStaffsParams extends IPagination {
  search?: string;
}

export interface IAddStaff {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
  actionsToConnect: string[];
}

export interface IUpdateStaff {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
  actionsToConnect: string[];
  actionsToDisconnect: string[];
}

export interface IStaffPer {
  id: string;
  fullname: string;
}
