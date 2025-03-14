import {makeAutoObservable, observable} from 'mobx';
import {MenuProps} from 'antd';
import {authApi} from '@/api';
import {ILoginForm} from '@/api/auth/types';
import {mainMenuList} from '@/modules/Layout/constants';
import {generateAllMenuItems} from '@/modules/Layout/utils';
import {addNotification} from '@/utils/addNotification';
import {TokenType} from './types';

class AuthStore {
  isAuth: boolean | null = false;
  token: TokenType | null = null;
  staffInfo: null | null = null;
  mainMenuItems: MenuProps['items'] | null = null;

  constructor() {
    makeAutoObservable(this, {
      isAuth: observable,
    });
  }

  getSignIn = (params: ILoginForm) =>
    authApi.getSignIn(params)
      .then(res => {
        if (res?.data) {
          this.setToken({
            accessToken: res.data?.data?.tokens?.accessToken,
          });
          this.setIsAuth(true);
        }

        return res;
      })
      .catch(addNotification);

  getProfile = () =>
    authApi.getUserProfile()
      .then(res => {
        if (res) {
          this.setStaffInfo(res);
        }
      })
      .catch(addNotification)
      .finally(() => {
        this.mainMenuItems = generateAllMenuItems(mainMenuList);
      });

  setMainMenuItems = (menuItems: MenuProps['items'] | null) => {
    this.mainMenuItems = menuItems;
  };

  setStaffInfo = (staffInfo: null) => {
    this.staffInfo = staffInfo;
  };

  setToken = (token: TokenType) => {
    this.token = token;
  };

  setIsAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  reset = () => {
    this.isAuth = null;
    this.token = null;
    this.staffInfo = null;
    window.localStorage.clear();
  };
}

export const authStore = new AuthStore();
