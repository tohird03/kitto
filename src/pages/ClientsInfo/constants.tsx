import React from 'react';
import {ColumnType} from 'antd/es/table';
import {IClientsInfo} from '@/api/clients';
import {getFullDateFormat} from '@/utils/getDateFormat';
import {formatPhoneNumber} from '@/utils/phoneFormat';
import {priceFormat} from '@/utils/priceFormat';
import {Action} from './Action';
import {ClientNameLink} from './ClientNameLink';

export const clientsColumns: ColumnType<IClientsInfo>[] = [
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
    title: 'Mijoz',
    align: 'center',
    render: (value, record) => <ClientNameLink client={record} />,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Telefon raqami',
    align: 'center',
    render: (value, record) => `+${formatPhoneNumber(record?.phone)}`,
  },
  {
    key: 'debt',
    dataIndex: 'debt',
    title: 'Mijoz qarzi',
    align: 'center',
    render: (value, record) => priceFormat(record?.debt),
    sorter: (a, b) => a?.debt - b?.debt,
  },
  {
    key: 'lastSale',
    dataIndex: 'lastSale',
    title: 'Oxirgi sotuv',
    align: 'center',
    render: (value, record) => record?.lastSale ? getFullDateFormat(record?.lastSale) : null,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action client={record} />,
  },
];
