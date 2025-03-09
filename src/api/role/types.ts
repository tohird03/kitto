export interface IRole {
  id: string;
  name: string;
  actions: IPermission[];
}

export interface IPermission {
  id: string;
  name: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  description: string;
  url: string;
}
