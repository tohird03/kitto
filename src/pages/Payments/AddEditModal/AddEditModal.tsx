import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Form, Input, InputNumber, Modal, Select, Spin} from 'antd';
import {paymentApi} from '@/api/payment';
import {IAddEditPaymentParams} from '@/api/payment/types';
import {clientsInfoStore} from '@/stores/clients-info';
import {paymentsStore} from '@/stores/payments';
import {addNotification} from '@/utils';
import {priceFormat} from '@/utils/priceFormat';

const filterOption = (input: string, option?: {label: string, value: string}) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [searchClients, setSearchClients] = useState<string | null>(null);

  // GET DATAS
  const {data: clientsData, isLoading: loadingClients} = useQuery({
    queryKey: ['getClients', searchClients],
    queryFn: () =>
      clientsInfoStore.getClients({
        pageNumber: 1,
        pageSize: 15,
        search: searchClients!,
      }),
  });

  const handleSubmit = (values: IAddEditPaymentParams) => {
    setLoading(true);

    if (paymentsStore?.singlePayment) {
      paymentApi.updatePayment({
        ...values,
        id: paymentsStore?.singlePayment?.id,
      })
        .then(() => {
          addNotification('To\'lov muvaffaqiyatli tahrirlandi!');
          queryClient.invalidateQueries({queryKey: ['getPayments']});
          handleModalClose();
        })
        .catch(addNotification)
        .finally(() => {
          setLoading(false);
        });

      return;
    }

    paymentApi.addPayment(values)
      .then(() => {
        addNotification('To\'lov muvaffaqiyatli qo\'shildi!');
        queryClient.invalidateQueries({queryKey: ['getPayments']});
        handleModalClose();
      })
      .catch(addNotification)
      .finally(() => {
        setLoading(false);
      });
  };

  const handleModalClose = () => {
    paymentsStore.setSinglePayment(null);
    paymentsStore.setIsOpenAddEditPaymentModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleSearchClients = (value: string) => {
    setSearchClients(value);
  };

  const handleClearClient = () => {
    setSearchClients(null);
  };

  const clientsOptions = useMemo(() => (
    clientsData?.data?.data.map((supplier) => ({
      value: supplier?.id,
      label: `${supplier?.fullname}: +${supplier?.phone}`,
    }))
  ), [clientsData]);

  useEffect(() => {
    if (paymentsStore.singlePayment) {
      setSearchClients(paymentsStore?.singlePayment?.client?.phone);

      form.setFieldsValue({
        ...paymentsStore.singlePayment,
        clientId: paymentsStore?.singlePayment?.client?.id,
      });
    }
  }, [paymentsStore.singlePayment]);

  return (
    <Modal
      open={paymentsStore.isOpenAddEditPaymentModal}
      title={paymentsStore.singlePayment ? 'To\'lovni tahrirlash' : 'To\'lov qo\'shish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={paymentsStore.singlePayment ? 'To\'lovni tahrirlash' : 'To\'lov qo\'shish'}
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
          label="Mijoz"
          rules={[{required: true}]}
          name="clientId"
        >
          <Select
            showSearch
            placeholder="Mijoz"
            loading={loadingClients}
            optionFilterProp="children"
            notFoundContent={loadingClients ? <Spin style={{margin: '10px'}} /> : null}
            filterOption={filterOption}
            onSearch={handleSearchClients}
            onClear={handleClearClient}
            options={clientsOptions}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Naqd to'lov"
          name="cash"
          initialValue={0}
        >
          <InputNumber
            placeholder="Bank kartasi orqali to'lov"
            defaultValue={0}
            style={{width: '100%'}}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Bank kartasi orqali to'lov"
          name="card"
          initialValue={0}
        >
          <InputNumber
            placeholder="Bank kartasi orqali to'lov"
            defaultValue={0}
            style={{width: '100%'}}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Boshqa usullar bilan to'lov"
          name="other"
          initialValue={0}
        >
          <InputNumber
            placeholder="Boshqa usullar bilan to'lov"
            style={{width: '100%'}}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="To'lov haqida ma'lumot"
          name="description"
        >
          <Input.TextArea
            placeholder="To'lov haqida ma'lumot"
            style={{width: '100%'}}
            rows={4}
            maxLength={100}
            showCount
            autoSize={{minRows: 2, maxRows: 6}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
