import React from 'react';
import { MenuProps } from 'antd';
import { IMenuItems } from './types';

export type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  label,
  key,
  icon,
  children,
} as MenuItem);

export const generateAllMenuItems = (list: IMenuItems[] | undefined): MenuProps['items'] =>
  list?.map(item => item) as MenuItem[];
