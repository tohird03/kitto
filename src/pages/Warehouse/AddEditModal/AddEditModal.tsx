import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColorPicker, Form, Input, Modal } from 'antd';
import { addNotification } from '@/utils';
import { IAddClientInfo, IUpdateClient, clientsInfoApi } from '@/api/clients';
import { warehousesStore } from '@/stores/warehouse';
import { warehouseApi } from '@/api/warehouse/warehouse';
import { IAddOrEditWarehouse } from '@/api/warehouse/types';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { mutate: addNewWarehouse } =
    useMutation({
      mutationKey: ['addNewWarehouse'],
      mutationFn: (params: IAddOrEditWarehouse) => warehouseApi.addNewWarehouse(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getWarehouses'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const { mutate: updateWarehouse } =
    useMutation({
      mutationKey: ['updateWarehouse'],
      mutationFn: (params: IAddOrEditWarehouse) => warehouseApi.updateWarehouse(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getWarehouses'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (values: IAddOrEditWarehouse) => {
    const valueControl = { ...values };

    setLoading(true);

    if (warehousesStore?.singleWarehouse) {
      updateWarehouse({
        ...valueControl,
        id: warehousesStore?.singleWarehouse?.id!,
      });

      return;
    }
    addNewWarehouse(valueControl);
  };

  const handleModalClose = () => {
    warehousesStore.setSingleWarehouse(null);
    warehousesStore.setIsOpenAddEditWarehouseModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (warehousesStore.singleWarehouse) {
      form.setFieldsValue(warehousesStore.singleWarehouse);
    }
  }, [warehousesStore.singleWarehouse]);

  return (
    <Modal
      open={warehousesStore.isOpenAddEditWarehouseModal}
      title={warehousesStore.singleWarehouse ? 'Tahrirlash' : 'Qo\'shish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={warehousesStore.singleWarehouse ? 'Tahrirlash' : 'Qo\'shish'}
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
          name="name"
          label="Nomi"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nomi" />
        </Form.Item>
        <Form.Item
          name="hexColor"
          label="Rangi"
          rules={[{ required: true }]}
        >
          <ColorPicker
            defaultValue="#1677ff"
            size="large"
            onChange={(color) => form.setFieldsValue({ hexColor: color.toHexString() })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
