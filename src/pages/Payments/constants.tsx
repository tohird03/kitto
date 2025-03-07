import React from 'react';
import {ColumnType} from 'antd/es/table';
import {Action} from './Action';
import { priceFormat } from '@/utils/priceFormat';
import { IClientsPayments } from '@/api/payment/types';
import { getFullDateFormat } from '@/utils/getDateFormat';
import { ClientNameLink } from '../ClientsInfo/ClientNameLink';

export const paymentsColumns: ColumnType<IClientsPayments>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'client',
    dataIndex: 'client',
    title: 'Mijoz',
    align: 'center',
    render: (value, record) => <ClientNameLink client={record?.client} />,
  },
  {
    key: 'cash',
    dataIndex: 'cash',
    title: 'Naqd to\'lov',
    align: 'center',
    width: '150px',
    render: (value, record) => priceFormat(record?.cash),
  },
  {
    key: 'card',
    dataIndex: 'card',
    title: 'Bank kartasi orqali to\'lov',
    align: 'center',
    width: 200,
    render: (value, record) => priceFormat(record?.card),
  },
  {
    key: 'other',
    dataIndex: 'other',
    title: 'Boshqa usullar bilan to\'lov',
    align: 'center',
    width: 200,
    render: (value, record) => priceFormat(record?.other),
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Ma\'lumot',
    align: 'center',
    width: 200,
    render: (value, record) => <span>{record?.description}</span>,
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'To\'lov vaqti',
    align: 'center',
    width: 200,
    render: (value, record) => getFullDateFormat(record?.createdAt),
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    width: 200,
    render: (value, record) => <Action clientPayment={record} />,
  },
];
