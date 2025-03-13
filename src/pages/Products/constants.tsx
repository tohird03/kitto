import React from 'react';
import {Image} from 'antd';
import {ColumnType} from 'antd/es/table';
import {umsStages} from '@/api/endpoints';
import {IProducts} from '@/api/products/types';
import {getFullDateFormat} from '@/utils/getDateFormat';
import {priceFormat} from '@/utils/priceFormat';
import {Action} from './Action';

export const productsListColumn: ColumnType<IProducts>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => (
      <Image
        width={50}
        src={`${umsStages?.apiUrl}/${record?.image}`}
      />
    ),
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Mahsulot nomi',
    align: 'center',
    render: (value, record) => record?.name,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Barcode raqami',
    align: 'center',
    render: (value, record) => record?.barcode?.code,
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'O\'ramlar qoldig\'i',
    align: 'center',
    render: (value, record) => `${record?.countInStorehouses} dona`,
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
    render: (value, record) => record?.cost,
  },
  {
    key: 'selling_price',
    dataIndex: 'selling_price',
    title: 'Sotilish narxi',
    align: 'center',
    render: (value, record) => record?.price,
  },
  {
    key: 'totalPrice',
    dataIndex: 'totalPrice',
    title: 'Umumiy sotib olingan qiymati',
    align: 'center',
    render: (value, record) => {
      const totalSellingPrice = record?.price * record?.quantity * record?.countInStorehouses;

      return priceFormat(totalSellingPrice);
    },
  },
  {
    key: 'totalPrice',
    dataIndex: 'totalPrice',
    title: 'Umumiy sotilish qiymati',
    align: 'center',
    render: (value, record) => {
      const totalSellingPrice = record?.cost * record?.quantity * record?.countInStorehouses;

      return priceFormat(totalSellingPrice);
    },
  },
  {
    key: 'min_amount',
    dataIndex: 'min_amount',
    title: 'Ogohlantirish',
    align: 'center',
    render: (value, record) => `${record?.warningThreshold} dona`,
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

export const UPLOAD_ACCEPT = 'image/png, image/gif, image/jpeg, image/jpg';
