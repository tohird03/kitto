import React from 'react';
import {ColumnType} from 'antd/es/table';
import {IProducts} from '@/api/products/types';
import {IWarehouseProducts} from '@/api/warehouseProducts/types';
import {getFullDateFormat} from '@/utils/getDateFormat';
import {priceFormat} from '@/utils/priceFormat';
import {Action} from './Action';

export const warehouseProductsListColumn: ColumnType<IWarehouseProducts>[] = [
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
    render: (value, record) => record?.product?.name,
  },
  {
    key: 'warehouse',
    dataIndex: 'warehouse',
    title: 'Skladi',
    align: 'center',
    render: (value, record) => record?.product?.name,
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'O\'ramlar qoldig\'i',
    align: 'center',
    render: (value, record) => `${record?.quantity} dona`,
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'O\'ramdagi mahsulotlar soni',
    align: 'center',
    render: (value, record) => `${record?.quantity} dona`,
  },
  {
    key: 'cost',
    dataIndex: 'cost',
    title: 'Sotib olingan narxi',
    align: 'center',
    render: (value, record) => record?.product?.cost,
  },
  {
    key: 'selling_price',
    dataIndex: 'selling_price',
    title: 'Sotilish narxi',
    align: 'center',
    render: (value, record) => record?.product?.price,
  },
  {
    key: 'totalPrice',
    dataIndex: 'totalPrice',
    title: 'Umumiy sotib olingan qiymati',
    align: 'center',
    render: (value, record) => {
      const totalSellingPrice = record?.product?.cost * record?.quantity;

      return priceFormat(totalSellingPrice);
    },
  },
  {
    key: 'min_amount',
    dataIndex: 'min_amount',
    title: 'Ogohlantirish',
    align: 'center',
    render: (value, record) => `${record?.product?.warningThreshold} dona`,
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Yaratilgan vaqti',
    align: 'center',
    render: (value, record) => getFullDateFormat(record?.product?.createdAt),
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action product={record?.product} />,
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
    render: (value, record) => `${record?.quantity} dona`,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action product={record} />,
  },
];
