import React from 'react';
import {ColumnType} from 'antd/es/table';
import {IWarehouse} from '@/api/warehouse/types';
import {priceFormat} from '@/utils/priceFormat';
import {Action} from './Action';

export const warehouseColumns: ColumnType<IWarehouse>[] = [
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
    title: 'Nomi',
    align: 'center',
    render: (value, record) => <span>{record?.name}</span>,
  },
  {
    key: 'color',
    dataIndex: 'color',
    title: 'Rangi',
    align: 'center',
    render: (value, record) => <div style={{background: record?.hexColor, width: '100px', height: '20px', borderRadius: '8px', margin: '0 auto'}} />,
  },
  {
    key: 'totalPackages',
    dataIndex: 'totalPackages',
    title: 'Jami o\'ramlar soni',
    align: 'center',
    render: (value, record) => <span>{record?.totalPackagesCount}</span>,
    sorter: (a, b) => a?.totalPackagesCount - b?.totalPackagesCount,
  },
  {
    key: 'totalCost',
    dataIndex: 'totalCost',
    title: 'Jami sotib olingan narxi',
    align: 'center',
    render: (value, record) => <span>{priceFormat(record?.totalCostCount)}</span>,
  },
  {
    key: 'totalPrice',
    dataIndex: 'totalPrice',
    title: 'Jami sotish narxi',
    align: 'center',
    render: (value, record) => <span>{priceFormat(record?.totalPriceCount)}</span>,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action warehouse={record} />,
  },
];
