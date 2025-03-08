import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal, Select, Spin } from 'antd';
import { addNotification } from '@/utils';
import { priceFormat } from '@/utils/priceFormat';
import { IAddEditProduct } from '@/api/products/types';
import { productsApi } from '@/api/products';
import { warehouseProductsStore } from '@/stores/warehouse-products';
import { warehouseApi } from '@/api/warehouse/warehouse';
import { IAddEditWarehouseProduct } from '@/api/warehouseProducts/types';
import { warehouseProductsApi } from '@/api/warehouseProducts/warehouse-products';

const filterOption = (input: string, option?: { label: string, value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState<string | null>(null);

  // GET DATAS
  const { data: warehouseData, isLoading: loadingWarehouse } = useQuery({
    queryKey: ['getWarehouses'],
    queryFn: () =>
      warehouseApi.getWarehouse({
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

  const { mutate: addNewProduct } =
    useMutation({
      mutationKey: ['addNewProduct'],
      mutationFn: (params: IAddEditWarehouseProduct) => warehouseProductsApi.addNewProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getWarehouseProducts'] });
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
      mutationFn: (params: IAddEditWarehouseProduct) => warehouseProductsApi.updateProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getWarehouseProducts'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (values: IAddEditWarehouseProduct) => {
    setLoading(true);

    if (warehouseProductsStore?.singleWarehouseProduct) {
      updateProduct({
        ...values,
        productId: warehouseProductsStore?.singleWarehouseProduct?.id!,
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
          name="storehouseId"
        >
          <Select
            showSearch
            placeholder="Sklad"
            loading={loadingWarehouse}
            optionFilterProp="children"
            notFoundContent={loadingWarehouse ? <Spin style={{ margin: '10px' }} /> : null}
            filterOption={filterOption}
            options={warehouseOptions}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Mahsulot"
          rules={[{ required: true }]}
          name="productId"
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
