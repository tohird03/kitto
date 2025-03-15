import React, {useEffect, useMemo, useRef, useState} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Divider, Input, InputNumber, List, notification, Popconfirm, Select, Table, Tabs} from 'antd';
import {ColumnType} from 'antd/es/table';
import {productsApi} from '@/api/products';
import {IWarehouseProducts} from '@/api/warehouseProducts/types';
import {productsListStore} from '@/stores/products-list';
import {saleStore} from '@/stores/sale';
import {priceFormat} from '@/utils/priceFormat';
import {PaymentModal} from './PaymentModal';
import useScanDetection from 'use-scan-detection';

export interface ISaleProduct {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  oneCount: number;
  storehouse: IWarehouseProducts;
  storehouses: IWarehouseProducts[];
}

export type SalesData = Record<string, ISaleProduct[]>;

export const Sale = observer(() => {
  const [searchProduct, setSearchProduct] = useState<string | null>(null);

  const {data: productsData, isLoading: loadingProducts} = useQuery({
    queryKey: ['getProducts', searchProduct],
    queryFn: () =>
      productsApi.getProducts({
        pageNumber: 1,
        pageSize: 15,
        name: searchProduct!,
      }),
  });

  useScanDetection({
    onComplete: (code: any) => {
      addProduct(String(code));
    },
  });

  // LOCAL STORAGE SALING
  useEffect(() => {
    const storedSales = localStorage.getItem('sales');

    if (storedSales) {
      saleStore.setSales(JSON.parse(storedSales));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(saleStore.sales));
  }, [saleStore.sales]);

  // PRODUCT ACTIONS
  const addProduct = async (barcode: string) => {
    const currentCart = saleStore.sales[saleStore.activeKey] || [];
    const existingProduct = currentCart.find((p) => p.barcode === barcode);

    const newQuantity = existingProduct ? existingProduct.quantity + 1 : 1;

    try {
      const findProduct = await productsListStore.getSingleSaleProducts({
        code: Number(barcode),
        minQuantity: newQuantity,
      });

      if (!findProduct) {
        notification.error({
          message: 'Bu mahsulot topilmadi',
        });

        return;
      }

      if (findProduct?.data?.storehouses?.length === 0) {
        notification.error({
          message: 'Bu mahsulotdan ushbu skladda qolmagan',
        });

        return;
      }

      const updatedCart = existingProduct
        ? currentCart.map((p) =>
          p.barcode === barcode
            ? {
              ...p,
              quantity: newQuantity,
              price: findProduct?.data?.price,
              barcode: String(findProduct?.data?.barcode?.code),
              oneCount: findProduct?.data?.quantity,
            }
            : p)
        : [
          ...currentCart,
          {
            id: findProduct?.data?.id,
            barcode: String(findProduct?.data?.barcode?.code),
            name: findProduct?.data?.name,
            storehouse: findProduct?.data?.storehouses[0],
            price: findProduct?.data?.price,
            oneCount: findProduct?.data?.quantity,
            storehouses: findProduct?.data?.storehouses,
            quantity: newQuantity,
          },
        ];

      const updateCard= {...saleStore.sales, [saleStore.activeKey]: updatedCart};

      saleStore.setSales(updateCard);
    } catch (error) {
      notification.error({
        message: 'Mahsulotni yuklashda xatolik yuz berdi',
      });
    }
  };


  // PRODUCT INPUT ACTIONS
  const handleSearchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(event?.currentTarget?.value);
  };

  // COLUMNS ACTION
  const handleChangeQuantity = async (value: number | null, barcode: string) => {
    if (!value) return;

    try {
      const findProduct = await productsListStore.getSingleSaleProducts({
        code: Number(barcode),
        minQuantity: value,
      });

      if (!findProduct) {
        notification.error({
          message: 'Mahsulot topilmadi!',
        });

        return;
      }

      if (findProduct?.data?.storehouses?.length === 0) {
        notification.error({
          message: 'Bu mahsulotdan ushbu skladda qolmagan',
        });

        return;
      }

      const updatedSales = {...saleStore.sales};
      const currentCart = updatedSales[saleStore.activeKey] || [];

      updatedSales[saleStore.activeKey] = currentCart.map((product) => {
        if (product.barcode !== barcode) return product;

        const selectedStorehouse = product.storehouse;
        const isEnoughInSelectedStorehouse = selectedStorehouse && value <= selectedStorehouse.quantity;

        return {
          ...product,
          quantity: value,
          storehouse: isEnoughInSelectedStorehouse ? selectedStorehouse : findProduct?.data?.storehouses[0],
          storehouses: findProduct?.data?.storehouses,
        };
      });
      saleStore.setSales(updatedSales);
    } catch (error) {
      notification.error({
        message: 'Mahsulot miqdorini o‘zgartirishda xatolik yuz berdi',
      });
    }
  };


  const handleChangePrice = (value: number | null, productId: string) => {
    if (!value) return;

    const updatedSales = {...saleStore.sales};
    const currentCart = updatedSales[saleStore.activeKey] || [];

    updatedSales[saleStore.activeKey] = currentCart.map((product) =>
      product.id === productId ? {...product, price: value} : product);

    saleStore.setSales(updatedSales);
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedSales = {...saleStore.sales};
    const currentCart = updatedSales[saleStore.activeKey] || [];

    updatedSales[saleStore.activeKey] = currentCart.filter((product) => product.id !== productId);

    saleStore.setSales(updatedSales);
  };

  const handleStorehouseChange = (value: string, productId: string) => {
    const updatedSales = {...saleStore.sales};
    const currentCart = updatedSales[saleStore.activeKey] || [];

    updatedSales[saleStore.activeKey] = currentCart.map((product) =>
      product.id === productId
        ? {
          ...product,
          storehouse: product.storehouses.find((sh) => sh.storehouse.id === value)!,
        }
        : product);

    saleStore.setSales(updatedSales);
  };


  // PRODUCT COLUMNS
  const productColumns: ColumnType<ISaleProduct>[] = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '#',
      align: 'center',
      render: (value, record, index) => index + 1,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Nomi',
      align: 'center',
      render: (value, record) => <span>{record?.name}</span>,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Skladi / Mahsulot soni',
      align: 'center',
      render: (value, record) =>
        record?.storehouses[0]?.storehouse
          ? (
            <Select
              style={{width: '200px'}}
              value={record?.storehouse?.storehouse?.id}
              onChange={(val) => handleStorehouseChange(val, record.id)}
              options={record?.storehouses?.map(storehouse => ({
                value: storehouse?.storehouse?.id,
                label: `${storehouse?.storehouse?.name} / ${storehouse?.quantity}`,
              }))}
            />)
          : <span style={{background: 'yellow'}}>Skladlarda qolmagan</span>,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'O\'ramlar soni',
      align: 'center',
      render: (value, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(val) => handleChangeQuantity(val, record.barcode)}
        />
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'O\'ramdagi mahsulotlar soni',
      align: 'center',
      render: (value, record) => <span>{record?.oneCount}</span>,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Narxi',
      align: 'center',
      render: (value, record) => (
        <InputNumber
          min={0}
          value={record.price}
          onChange={(val) => handleChangePrice(val, record.id)}
        />
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Jami mahsulotlar soni',
      align: 'center',
      render: (value, record) => <span>{priceFormat(record?.quantity * record?.oneCount)}</span>,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Jami narxi',
      align: 'center',
      render: (value, record) => <span>{priceFormat(record?.price * record?.quantity * record?.oneCount)}</span>,
    },
    {
      key: 'action',
      dataIndex: 'action',
      title: 'Action',
      align: 'center',
      render: (value, record) => (
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
          <Popconfirm
            title="Mahsulotni o'chirish"
            description="Rostdan ham bu mahsulotni o'chirishni xohlaysizmi?"
            onConfirm={handleDeleteProduct.bind(null, record?.id)}
            okText="Ha"
            okButtonProps={{style: {background: 'red'}}}
            cancelText="Yo'q"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleOpenPaymentModal = () => {
    const currentSaleProducts = saleStore.sales[saleStore.activeKey] || []; // Hozirgi tabdagi mahsulotlar

    if (currentSaleProducts.length === 0) {
      notification.warning({
        message: 'Sotuv ro\'yxati bo\'sh',
      });

      return;
    }

    saleStore.setActiveSaleProducts(currentSaleProducts); // Mahsulotlarni storega saqlash
    saleStore.setIsOpenAddEditSaleModal(true); // Modalni ochish
  };


  const getTotalPrice = useMemo(() =>
    (saleStore.sales[saleStore.activeKey]?.reduce((sum, product) => sum + product.price * product.quantity * product.oneCount, 0) || 0),
  [saleStore.sales, saleStore.activeKey]);

  const rowClassName = (record: ISaleProduct) =>
    record?.storehouses?.length === 0
      ? 'error__row'
      : '';

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <h2>Sotuv</h2>

      <Tabs
        type="editable-card"
        activeKey={saleStore.activeKey}
        onChange={saleStore.setActiveKey}
        onEdit={(key, action) => action === 'remove' ? saleStore.removeTab(key as string) : saleStore.addTab()}
        style={{flex: 1, overflow: 'auto'}}
      >
        {Object.keys(saleStore.sales).map((key) => (
          <Tabs.TabPane tab={`Sotuv ${key}`} key={key} closable>
            <Table
              columns={productColumns}
              dataSource={saleStore.sales[key]}
              rowClassName={rowClassName}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>

      <div style={{height: '30%', display: 'flex', alignItems: 'flex-start', gap: '100px'}}>
        <div style={{maxWidth: '700px', width: '100%', height: '100%'}}>
          <Divider orientation="left">Mahsulotlar</Divider>
          <Input
            onChange={handleSearchProduct}
            placeholder="Mahsulotlarni qidirish"
          />
          <List
            size="small"
            bordered
            loading={loadingProducts}
            dataSource={productsData?.data?.data}
            style={{overflow: 'auto', height: '100%'}}
            renderItem={(item) => (
              <List.Item>
                <div style={{display: 'flex', alignItems: 'center', maxWidth: '300px'}}>
                  <p>
                    {item?.name} -
                  </p>
                  {item?.quantity}talik
                </div>
                <Button onClick={addProduct.bind(null, String(item?.barcode?.code))} icon={<PlusOutlined />} />
              </List.Item>
            )}
          />
        </div>
        <div style={{maxWidth: '500px', width: '100%'}}>
          <Divider orientation="left">To&apos;lov</Divider>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <p style={{fontSize: '30px', fontWeight: 'bold'}}>Jami narxi: </p>
            <p style={{fontSize: '30px', fontWeight: 'bold'}}>{priceFormat(getTotalPrice)}</p>
          </div>
          <Button onClick={handleOpenPaymentModal} style={{width: '100%'}} type="primary">
            To&apos;lov qilib saqlash
          </Button>
        </div>
      </div>

      {saleStore.isOpenAddEditSaleModal && <PaymentModal />}
    </div >
  );
});
