import React from 'react';
import {ColumnType} from 'antd/es/table';
import {Action} from './Action';
import { getFullDateFormat } from '@/utils/getDateFormat';
import { priceFormat } from '@/utils/priceFormat';
import { IProducts } from '@/api/products/types';

export const productsListColumn: ColumnType<IProducts>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Mahsulot nomi',
    align: 'center',
    render: (value, record) => record?.name,
  },
  {
    key: 'warehouse',
    dataIndex: 'warehouse',
    title: 'Skladi',
    align: 'center',
    render: (value, record) => record?.name,
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'O\'ramlar qoldig\'i',
    align: 'center',
    render: (value, record) => `${record?.count} dona`,
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'O\'ramdagi mahsulotlar soni',
    align: 'center',
    render: (value, record) => `${record?.count} dona`,
  },
  {
    key: 'cost',
    dataIndex: 'cost',
    title: 'Sotib olingan narxi',
    align: 'center',
    render: (value, record) => record?.cost,
  },
  {
    key: 'selling_price',
    dataIndex: 'selling_price',
    title: 'Sotilish narxi',
    align: 'center',
    render: (value, record) => record?.selling_price,
  },
  {
    key: 'totalPrice',
    dataIndex: 'totalPrice',
    title: 'Umumiy sotib olingan qiymati',
    align: 'center',
    render: (value, record) => {
      const totalSellingPrice = record?.selling_price * record?.count;

      return priceFormat(totalSellingPrice);
    },
  },
  {
    key: 'min_amount',
    dataIndex: 'min_amount',
    title: 'Ogohlantirish',
    align: 'center',
    render: (value, record) => `${record?.min_amount} dona`,
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Yaratilgan vaqti',
    align: 'center',
    render: (value, record) => getFullDateFormat(record?.createdAt),
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action product={record} />,
  },
];

export const transferProductsListColumn: ColumnType<IProducts>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Mahsulot nomi',
    align: 'center',
    render: (value, record) => record?.name,
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'O\'ramlar soni',
    align: 'center',
    render: (value, record) => `${record?.count} dona`,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action product={record} />,
  },
];
