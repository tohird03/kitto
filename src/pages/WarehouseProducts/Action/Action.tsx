import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {productsApi} from '@/api/products';
import {IProducts} from '@/api/products/types';
import {warehouseProductsStore} from '@/stores/warehouse-products';
import {addNotification} from '@/utils';

type Props = {
  product: IProducts;
};

export const Action: FC<Props> = observer(({product}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteClient} =
  useMutation({
    mutationKey: ['deleteClient'],
    mutationFn: (id: string) => productsApi.deleteProduct(id!),
    onSuccess: () => {
      addNotification('Mahsulot o\'chirildi');
      queryClient.invalidateQueries({queryKey: ['getProducts']});
    },
    onError: addNotification,
  });

  const handleEditProcess = () => {
    warehouseProductsStore.setSingleWarehouseProduct(product);
    warehouseProductsStore.setIsOpenAddEditProductModal(true);
  };

  const handleDelete = () => {
    deleteClient(product?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEditProcess} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Xodimni o'chirish"
        description="Rostdan ham bu xodimni o'chirishni xohlaysizmi?"
        onConfirm={handleDelete}
        okText="Ha"
        okButtonProps={{style: {background: 'red'}}}
        cancelText="Yo'q"
      >
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </div>
  );
});
