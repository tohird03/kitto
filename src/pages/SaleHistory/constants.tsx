import React from 'react';
import {ColumnType} from 'antd/es/table';
import {ISale, ISaleProduct, ISaleProductStorehouse} from '@/api/sale/types';
import {getFullDateFormat, getFullDateFormatWithOutTz} from '@/utils/getDateFormat';
import {priceFormat} from '@/utils/priceFormat';
import {ClientNameLink} from '../ClientsInfo/ClientNameLink';
import {Action} from './Action';

export const productsListColumn: ColumnType<ISale>[] = [
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
    title: 'Umumiy narxi',
    align: 'center',
    render: (value, record) => priceFormat(record?.totalSum),
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Qarzga',
    align: 'center',
    render: (value, record) => priceFormat(record?.debt),
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Mijoz',
    align: 'center',
    render: (value, record) => record?.client ? <ClientNameLink client={record?.client} /> : null,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Xodim',
    align: 'center',
    render: (value, record) => record?.staff?.fullname,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Sotuv vaqti',
    align: 'center',
    render: (value, record) => getFullDateFormatWithOutTz(record?.createdAt),
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    width: 200,
    render: (value, record) => <Action sale={record} />,
  },
  // {
  //   key: 'count',
  //   dataIndex: 'count',
  //   title: 'O\'ramlar qoldig\'i',
  //   align: 'center',
  //   render: (value, record) => `${record?.countInStorehouses} dona`,
  // },
  // {
  //   key: 'count',
  //   dataIndex: 'count',
  //   title: 'O\'ramdagi mahsulotlar soni',
  //   align: 'center',
  //   render: (value, record) => `${record?.quantity} dona`,
  // },
  // {
  //   key: 'cost',
  //   dataIndex: 'cost',
  //   title: 'Sotib olingan narxi',
  //   align: 'center',
  //   render: (value, record) => record?.cost,
  // },
  // {
  //   key: 'selling_price',
  //   dataIndex: 'selling_price',
  //   title: 'Sotilish narxi',
  //   align: 'center',
  //   render: (value, record) => record?.price,
  // },
  // {
  //   key: 'totalPrice',
  //   dataIndex: 'totalPrice',
  //   title: 'Umumiy sotib olingan qiymati',
  //   align: 'center',
  //   render: (value, record) => {
  //     const totalSellingPrice = record?.price * record?.quantity * record?.countInStorehouses;

  //     return priceFormat(totalSellingPrice);
  //   },
  // },
  // {
  //   key: 'totalPrice',
  //   dataIndex: 'totalPrice',
  //   title: 'Umumiy sotilish qiymati',
  //   align: 'center',
  //   render: (value, record) => {
  //     const totalSellingPrice = record?.cost * record?.quantity * record?.countInStorehouses;

  //     return priceFormat(totalSellingPrice);
  //   },
  // },
  // {
  //   key: 'min_amount',
  //   dataIndex: 'min_amount',
  //   title: 'Ogohlantirish',
  //   align: 'center',
  //   render: (value, record) => `${record?.warningThreshold} dona`,
  // },
  // {
  //   key: 'createdAt',
  //   dataIndex: 'createdAt',
  //   title: 'Yaratilgan vaqti',
  //   align: 'center',
  //   render: (value, record) => getFullDateFormat(record?.createdAt),
  // },
  // {
  //   key: 'action',
  //   dataIndex: 'action',
  //   title: 'Action',
  //   align: 'center',
  //   render: (value, record) => <Action product={record} />,
  // },
];

export const orderProductsColumns: ColumnType<ISaleProduct>[] = [
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
    render: (value, record) => record?.productStorehouse?.product?.name,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'O\'ramlar soni',
    align: 'center',
    render: (value, record) => record?.quantity,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'O\'ramdagi mahsulotlar soni',
    align: 'center',
    render: (value, record) => record?.productStorehouse?.product?.quantity,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Jami mahsulot soni',
    align: 'center',
    render: (value, record) => record?.quantity * record?.productStorehouse?.product?.quantity,
  },
];
