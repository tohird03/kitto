import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Table, Typography} from 'antd';
import classNames from 'classnames';
import {warehousesStore} from '@/stores/warehouse';
import {AddEditModal} from './AddEditModal';
import {warehouseColumns} from './constants';
import styles from './warehouse.scss';

const cn = classNames.bind(styles);

export const Warehouse = observer(() => {
  const {data: warehouseData, isLoading: loading} = useQuery({
    queryKey: [
      'getWarehouses',
      warehousesStore.pageNumber,
      warehousesStore.pageSize,
      warehousesStore.name,
    ],
    queryFn: () =>
      warehousesStore.getWarehouse({
        pageNumber: warehousesStore.pageNumber,
        pageSize: warehousesStore.pageSize,
        name: warehousesStore.name!,
      }),
  });

  const handleAddNewWarehouse = () => {
    warehousesStore.setIsOpenAddEditWarehouseModal(true);
  };

  useEffect(() => () => {
    warehousesStore.reset();
  }, []);

  return (
    <main>
      <div className={cn('warehouse__head')}>
        <Typography.Title level={3}>Skladlar</Typography.Title>
        <div className={cn('warehouse__filter')}>
          <Button
            onClick={handleAddNewWarehouse}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Yangi qo&apos;shish
          </Button>
        </div>
      </div>

      <Table
        columns={warehouseColumns}
        dataSource={warehouseData?.data?.data || []}
        loading={loading}
        pagination={false}
      />

      {warehousesStore.isOpenAddEditWarehouseModal && <AddEditModal />}
    </main>
  );
});
