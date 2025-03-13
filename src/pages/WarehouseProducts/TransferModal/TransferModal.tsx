import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {ArrowRightOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Col, Form, Input, InputNumber, Modal, Row, Select, Table} from 'antd';
import {productsApi} from '@/api/products';
import {IAddEditProduct} from '@/api/products/types';
import {warehouseProductsStore} from '@/stores/warehouse-products';
import {addNotification} from '@/utils';
import {priceFormat} from '@/utils/priceFormat';
import {transferProductsListColumn} from '../constants';

export const TransferModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: IAddEditProduct) => {
    // TODO
  };

  const handleModalClose = () => {
    // TODO
  };

  const handleModalOk = () => {
    form.submit();
  };

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
      style={{top: 0, padding: 0}}
      bodyStyle={{
        height: '85vh',
        overflow: 'auto',
        padding: '30px',
      }}
      width="100vw"
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Row style={{alignItems: 'center'}}>
          <Col span={11}>
            <Form.Item
              label="Skladdan"
              rules={[{required: true}]}
              name="warehouse"
            >
              <Select
                showSearch
                placeholder="Skladdan"
                options={[]}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={2} style={{textAlign: 'center'}}>
            <ArrowRightOutlined style={{fontSize: '30px'}} />
          </Col>
          <Col span={11}>
            <Form.Item
              label="Skladga"
              rules={[{required: true}]}
              name="warehouse"
            >
              <Select
                showSearch
                placeholder="Skladga"
                options={[]}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item
              label="Mahsulot nomi"
              rules={[{required: true}]}
              name="name"
            >
              <Input placeholder="Mahsulot nomi" />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item
              label="O'ramlar soni"
              rules={[{required: true}]}
              name="count"
            >
              <InputNumber
                placeholder="O'ramlar soni"
                style={{width: '100%'}}
                formatter={(value) => priceFormat(value!)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        columns={transferProductsListColumn}
        dataSource={[]}
      />
    </Modal>
  );
});
