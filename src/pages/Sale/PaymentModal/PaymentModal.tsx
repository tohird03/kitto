import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Spin } from 'antd';
import { regexPhoneNumber } from '@/utils/phoneFormat';
import { IAddClientInfo } from '@/api/clients';
import { clientsInfoStore } from '@/stores/clients-info';
import { saleStore } from '@/stores/sale';
import { priceFormat } from '@/utils/priceFormat';
import { IAddSale, IAddSaleForm } from '@/api/sale/types';
import { saleApi } from '@/api/sale/sale';
import { addNotification } from '@/utils';

const filterOption = (input: string, option?: { label: string, value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const PaymentModal = observer(() => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchClients, setSearchClients] = useState<string | null>(null);

  // GET DATAS
  const { mutate: addNewSale } =
    useMutation({
      mutationKey: ['addNewSale'],
      mutationFn: (params: IAddSale) => saleApi.addNewSale(params),
      onSuccess: () => {
        handleModalClose();
        addNotification('Sotuv muvaffaqiyatli amalga oshirildi');
        saleStore.removeTab(saleStore.activeKey);
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const { data: clientsData, isLoading: loadingClients } = useQuery({
    queryKey: ['getClients', searchClients],
    queryFn: () =>
      clientsInfoStore.getClients({
        pageNumber: 1,
        pageSize: 15,
        search: searchClients!,
      }),
  });

  const handleSubmit = (values: IAddSaleForm) => {
    const addSaleData: IAddSale = {
      clientId: values?.clientId,
      totalSum: values?.totalSum,
      payment: {
        card: values?.card || 0,
        cash: values?.cash || 0,
        other: values?.other || 0,
        description: values?.description,
      },
      products: saleStore?.activeSaleProducts?.map(product => ({
        id: product?.storehouse?.id,
        quantity: product?.quantity,
      })),
    };

    addNewSale(addSaleData);
  };

  const handleModalClose = () => {
    saleStore.setActiveSaleProducts([]);
    saleStore.setIsOpenAddEditSaleModal(false);
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
    if (clientsInfoStore.singleClientInfo) {
      form.setFieldsValue({
        ...clientsInfoStore.singleClientInfo,
        phone: clientsInfoStore.singleClientInfo?.phone?.slice(3),
      });
    }
  }, [clientsInfoStore.singleClientInfo]);

  return (
    <Modal
      open={saleStore.isOpenAddEditSaleModal}
      title={'To\'lov qilish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={'Sotuvni saqlash'}
      cancelText="Bekor qilish"
      centered
      confirmLoading={loading}
      bodyStyle={{
        height: '50vh',
        overflow: 'auto',
        padding: '30px',
      }}
      width="50vw"
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Row style={{ alignItems: 'center', gap: '30px' }}>
          <Col span={11}>
            <Form.Item
              label="Mijoz"
              rules={[{ required: true }]}
              name="clientId"
            >
              <Select
                showSearch
                placeholder="Mijoz"
                loading={loadingClients}
                optionFilterProp="children"
                notFoundContent={loadingClients ? <Spin style={{ margin: '10px' }} /> : null}
                filterOption={filterOption}
                onSearch={handleSearchClients}
                onClear={handleClearClient}
                options={clientsOptions}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="totalSum"
              label="Umumiy narxi"
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="Umumiy narxi"
                defaultValue={0}
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value!)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left">Mijoz to&apos;lovi</Divider>
        <Row style={{ alignItems: 'center', gap: '30px' }}>
          <Col span={11}>
            <Form.Item
              label="Naqd to'lov"
              name="cash"
              initialValue={0}
            >
              <InputNumber
                placeholder="Bank kartasi orqali to'lov"
                defaultValue={0}
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value!)}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Bank kartasi orqali to'lov"
              name="card"
              initialValue={0}
            >
              <InputNumber
                placeholder="Bank kartasi orqali to'lov"
                defaultValue={0}
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value!)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ alignItems: 'center', gap: '30px' }}>
          <Col span={11}>
            <Form.Item
              label="Boshqa usullar bilan to'lov"
              name="other"
              initialValue={0}
            >
              <InputNumber
                placeholder="Boshqa usullar bilan to'lov"
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value!)}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="To'lov haqida ma'lumot"
              name="description"
            >
              <Input.TextArea
                placeholder="To'lov haqida ma'lumot"
                style={{ width: '100%' }}
                rows={4}
                maxLength={100}
                showCount
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
