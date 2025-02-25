import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CalculatorOutlined,
  HomeOutlined,
  RetweetOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import {ROUTES} from '@/constants';
import {IAppRole, IMenuItems} from './types';

export const mainMenuList: IMenuItems[] = [
  {
    label: 'Sotuv',
    key: ROUTES.home,
    icon: <ShoppingCartOutlined />,
  },
  {
    label: 'Skladlar',
    key: ROUTES.warehouse,
    icon: <HomeOutlined />,
  },
  {
    label: 'Mahsulotlar',
    key: ROUTES.products,
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Mijozlar',
    key: ROUTES.clientsInfo,
    icon: <TeamOutlined />,
  },
  {
    label: 'Statistika',
    key: ROUTES.home,
    icon: <BarChartOutlined />,
  },
  {
    label: 'Mahsulotlarni ko\'chirish',
    key: ROUTES.home,
    icon: <RetweetOutlined />,
  },
  {
    label: 'To\'lovlar',
    key: ROUTES.home,
    icon: <CalculatorOutlined />,
  },
  {
    label: 'Sotuvchilar',
    key: ROUTES.home,
    icon: <UserSwitchOutlined />,
  },
];
