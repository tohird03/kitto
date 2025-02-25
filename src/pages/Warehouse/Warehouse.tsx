import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Typography } from 'antd';
import classNames from 'classnames';
import { AddEditModal } from './AddEditModal';
import styles from './warehouse.scss';
import { warehouseColumns } from './constants';
import { warehousesStore } from '@/stores/warehouse';

const cn = classNames.bind(styles);

export const Warehouse = observer(() => {
  // const { data: clientsInfoData, isLoading: loading } = useQuery({
  //   queryKey: [
  //     'getClients',
  //     warehousesStore.pageNumber,
  //     warehousesStore.pageSize,
  //     warehousesStore.search,
  //   ],
  //   queryFn: () =>
  //     warehousesStore.getClients({
  //       pageNumber: warehousesStore.pageNumber,
  //       pageSize: warehousesStore.pageSize,
  //       search: warehousesStore.search!,
  //     }),
  // });

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
        dataSource={[]}
        // loading={loading}
        pagination={false}
      />

      {warehousesStore.isOpenAddEditWarehouseModal && <AddEditModal />}
    </main>
  );
});
