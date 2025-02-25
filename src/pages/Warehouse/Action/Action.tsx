import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {addNotification} from '@/utils';
import { warehousesStore } from '@/stores/warehouse';
import { IWarehouse } from '@/api/warehouse/types';

type Props = {
  warehouse: IWarehouse;
};

export const Action: FC<Props> = observer(({warehouse}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteWarehouse} =
  useMutation({
    mutationKey: ['deleteWarehouse'],
    // mutationFn: (id: string) => clientsInfoApi.deleteWarehouse(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getClients']});
    },
    onError: addNotification,
  });

  const handleEditWarehouse = () => {
    warehousesStore.setSingleWarehouse(warehouse);
    warehousesStore.setIsOpenAddEditWarehouseModal(true);
  };

  const handleDeleteWarehouse = () => {
    // deleteWarehouse(client?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEditWarehouse} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Skladni o'chirish"
        description="Rostdan ham bu skladni o'chirishni xohlaysizmi?"
        onConfirm={handleDeleteWarehouse}
        okText="Ha"
        okButtonProps={{style: {background: 'red'}}}
        cancelText="Yo'q"
      >
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </div>
  );
});
