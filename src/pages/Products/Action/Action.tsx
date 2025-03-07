import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {addNotification} from '@/utils';
import { productsApi } from '@/api/products';
import { IProducts } from '@/api/products/types';
import { productsListStore } from '@/stores/products-list';

type Props = {
  product: IProducts;
};

export const Action: FC<Props> = observer(({product}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteProduct} =
  useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: (id: string) => productsApi.deleteProduct(id!),
    onSuccess: () => {
      addNotification('Mahsulot o\'chirildi');
      queryClient.invalidateQueries({queryKey: ['getProducts']});
    },
    onError: addNotification,
  });

  const handleEdit = () => {
    productsListStore.setSingleProduct(product);
    productsListStore.setIsOpenAddEditProductModal(true);
  };

  const handleDelete = () => {
    deleteProduct(product?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEdit} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Mahsulotni o'chirish"
        description="Rostdan ham bu mahsulotni o'chirishni xohlaysizmi?"
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
