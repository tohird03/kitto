import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { addNotification } from '@/utils';
import { priceFormat } from '@/utils/priceFormat';
import { IAddEditProduct } from '@/api/products/types';
import { productsApi } from '@/api/products';
import { warehouseProductsStore } from '@/stores/warehouse-products';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { mutate: addNewProduct } =
    useMutation({
      mutationKey: ['addNewProduct'],
      mutationFn: (params: IAddEditProduct) => productsApi.addNewProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getProducts'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const { mutate: updateProduct } =
    useMutation({
      mutationKey: ['updateProduct'],
      mutationFn: (params: IAddEditProduct) => productsApi.updateProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getProducts'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (values: IAddEditProduct) => {
    setLoading(true);

    if (warehouseProductsStore?.singleWarehouseProduct) {
      updateProduct({
        ...values,
        id: warehouseProductsStore?.singleWarehouseProduct?.id!,
      });

      return;
    }
    addNewProduct(values);
  };

  const handleModalClose = () => {
    warehouseProductsStore.setSingleWarehouseProduct(null);
    warehouseProductsStore.setIsOpenAddEditProductModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (warehouseProductsStore.singleWarehouseProduct) {
      form.setFieldsValue({
        ...warehouseProductsStore.singleWarehouseProduct,
      });
    }
  }, [warehouseProductsStore.singleWarehouseProduct]);

  return (
    <Modal
      open={warehouseProductsStore.isOpenAddEditProductModal}
      title={warehouseProductsStore.singleWarehouseProduct ? 'Mahsulotni tahrirlash' : 'Mahsulotni qo\'shish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={warehouseProductsStore.singleWarehouseProduct ? 'Mahsulotni tahrirlash' : 'Mahsulotni qo\'shish'}
      cancelText="Bekor qilish"
      centered
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Sklad"
          rules={[{ required: true }]}
          name="warehouse"
        >
          <Select
            showSearch
            placeholder="Sklad"
            options={[]}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Mahsulot nomi"
          rules={[{ required: true }]}
          name="name"
        >
          <Input placeholder="Mahsulot nomi" />
        </Form.Item>
        <Form.Item
          label="O'ramlar soni"
          rules={[{ required: true }]}
          name="count"
        >
          <InputNumber
            placeholder="O'ramlar soni"
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
