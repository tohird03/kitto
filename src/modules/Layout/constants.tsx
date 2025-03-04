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
    label: 'Mahsulotlar',
    key: ROUTES.products,
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Mahsulotlarni ko\'chirish',
    key: ROUTES.warehouseProducts,
    icon: <RetweetOutlined />,
  },
  {
    label: 'Skladlar',
    key: ROUTES.warehouse,
    icon: <HomeOutlined />,
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
    label: 'To\'lovlar',
    key: ROUTES.payments,
    icon: <CalculatorOutlined />,
  },
  {
    label: 'Sotuvchilar',
    key: ROUTES.staffs,
    icon: <UserSwitchOutlined />,
  },
];
