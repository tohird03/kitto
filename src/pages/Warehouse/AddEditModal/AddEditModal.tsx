import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ColorPicker, Form, Input, InputNumber, Modal} from 'antd';
import {addNotification} from '@/utils';
import { IAddClientInfo, IUpdateUser, clientsInfoApi } from '@/api/clients';
import { warehousesStore } from '@/stores/warehouse';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {mutate: addNewClients} =
    useMutation({
      mutationKey: ['addNewClients'],
      mutationFn: (params: IAddClientInfo) => clientsInfoApi.addClients(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getClients']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const {mutate: updateClient} =
    useMutation({
      mutationKey: ['updateClient'],
      mutationFn: (params: IUpdateUser) => clientsInfoApi.updateClient(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getClients']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (values: IAddClientInfo) => {
    const valueControl = {
      ...values,
      phone: `998${values?.phone}`,
    };

    setLoading(true);

    // if (warehousesStore?.singleWarehouse) {
    //   updateClient({
    //     ...valueControl,
    //     id: warehousesStore?.singleWarehouse?.id!,
    //   });

    //   return;
    // }
    // addNewClients(valueControl);
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
          rules={[{required: true}]}
        >
          <Input placeholder="Nomi" />
        </Form.Item>
        <Form.Item
          name="color"
          label="Rangi"
          rules={[{required: true}]}
        >
          <ColorPicker defaultValue="#1677ff" size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
});
