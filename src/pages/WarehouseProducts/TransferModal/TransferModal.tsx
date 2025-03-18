import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Form, Input, InputNumber, Modal, Row, Select, Spin, Table } from 'antd';
import { productsApi } from '@/api/products';
import { IAddEditProduct, IProductTransfer, IProductTransferForm } from '@/api/products/types';
import { warehouseProductsStore } from '@/stores/warehouse-products';
import { addNotification } from '@/utils';
import { priceFormat } from '@/utils/priceFormat';
import { warehouseApi } from '@/api/warehouse/warehouse';

const filterOption = (input: string, option?: { label: string, value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const TransferModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState<string | null>(null);

  // GET DATAS
  const { data: warehouseData, isLoading: loadingWarehouse } = useQuery({
    queryKey: ['getWarehouses'],
    queryFn: () =>
      warehouseApi.getWarehouse({
        pagination: false,
      }),
  });

  const { data: productsData, isLoading: loadingProducts } = useQuery({
    queryKey: ['getProducts', searchProduct],
    queryFn: () =>
      productsApi.getProducts({
        pageNumber: 1,
        pageSize: 15,
        name: searchProduct!,
      }),
  });

  const { mutate: transferProduct } =
    useMutation({
      mutationKey: ['transferProduct'],
      mutationFn: (params: IProductTransfer) => productsApi.transferProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getWarehouseProducts'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (values: IProductTransferForm) => {
    const transferData: IProductTransfer = {
      fromStorehouseId: values?.fromStorehouseId,
      toStorehouseId: values?.toStorehouseId,
      products: [{
        id: values?.id,
        quantity: values?.quantity,
      }],
    };

    transferProduct(transferData);
  };

  const handleModalClose = () => {
    warehouseProductsStore.setIsOpenTransferModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleSearchProducts = (value: string) => {
    setSearchProduct(value);
  };

  const handleClearProducts = () => {
    setSearchProduct(null);
  };

  const warehouseOptions = useMemo(() => (
    warehouseData?.data?.data.map((warehouse) => ({
      value: warehouse?.id,
      label: `${warehouse?.name}`,
    }))
  ), [warehouseData]);

  const productsOptions = useMemo(() => (
    productsData?.data?.data.map((product) => ({
      value: product?.id,
      label: `${product?.name}`,
    }))
  ), [productsData]);

  return (
    <Modal
      open={warehouseProductsStore.isOpenTransferModal}
      title={'Mahsulotni ko\'chirish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={'Mahsulotni ko\'chirish'}
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
        <Row style={{ alignItems: 'center' }}>
          <Col span={11}>
            <Form.Item
              label="Skladdan"
              rules={[{ required: true }]}
              name="fromStorehouseId"
            >
              <Select
                showSearch
                placeholder="Skladdan"
                options={warehouseOptions}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            <ArrowRightOutlined style={{ fontSize: '30px' }} />
          </Col>
          <Col span={11}>
            <Form.Item
              label="Skladga"
              rules={[{ required: true }]}
              name="toStorehouseId"
            >
              <Select
                showSearch
                placeholder="Skladga"
                options={warehouseOptions}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Mahsulot nomi"
          rules={[{ required: true }]}
          name="id"
        >
          <Select
            showSearch
            placeholder="Mahsulot"
            loading={loadingProducts}
            optionFilterProp="children"
            notFoundContent={loadingProducts ? <Spin style={{ margin: '10px' }} /> : null}
            filterOption={filterOption}
            onSearch={handleSearchProducts}
            onClear={handleClearProducts}
            options={productsOptions}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="O'ramlar soni"
          rules={[{ required: true }]}
          name="quantity"
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
