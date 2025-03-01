import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { PlusCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { Button, Input, Table, Typography } from 'antd';
import classNames from 'classnames';
import { AddEditModal } from './AddEditModal';
import styles from './warehouse-product.scss';
import { productsListColumn } from './constants';
import { IProducts } from '@/api/products/types';
import { warehouseProductsStore } from '@/stores/warehouse-products';
import { TransferModal } from './TransferModal';

const cn = classNames.bind(styles);

export const WarehouseProductsList = observer(() => {
  // const { data: productsData, isLoading: loading } = useQuery({
  //   queryKey: [
  //     'getProducts',
  //     warehouseProductsStore.pageNumber,
  //     warehouseProductsStore.pageSize,
  //     warehouseProductsStore.search,
  //   ],
  //   queryFn: () =>
  //     warehouseProductsStore.getProducts({
  //       pageNumber: warehouseProductsStore.pageNumber,
  //       pageSize: warehouseProductsStore.pageSize,
  //       search: warehouseProductsStore.search!,
  //     }),
  // });

  const handleAddNewProduct = () => {
    warehouseProductsStore.setIsOpenAddEditProductModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    warehouseProductsStore.setSearch(e.currentTarget?.value);
  };

  const handleTransferModal = () => {
    warehouseProductsStore.setIsOpenTransferModal(true);
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    warehouseProductsStore.setPageNumber(page);
    warehouseProductsStore.setPageSize(pageSize!);
  };

  useEffect(() => () => {
    warehouseProductsStore.reset();
  }, []);

  const rowClassName = (record: IProducts) =>
    record.count < 0 ? 'error__row'
      : record.count < record?.min_amount
        ? 'warning__row' : '';

  return (
    <main>
      <div className={cn('product-list__head')}>
        <Typography.Title level={3}>Skladlar bo&apos;yicha Mahsulotlar</Typography.Title>
        <div className={cn('product-list__filter')}>
          <Input
            placeholder="Mahsulotni qidirish"
            allowClear
            onChange={handleSearch}
            className={cn('product-list__search')}
          />
          <Button
            onClick={handleTransferModal}
            type="primary"
            icon={<RetweetOutlined />}
          >
            Skladdan skaladga mahsulot ko&apos;chirish
          </Button>
          <Button
            onClick={handleAddNewProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Skladga mahsulot qo&apos;shish
          </Button>
        </div>
      </div>

      <Table
        columns={productsListColumn}
        dataSource={[]}
        // loading={loading}
        rowClassName={rowClassName}
        // pagination={{
        //   total: productsData?.totalCount,
        //   current: warehouseProductsStore?.pageNumber,
        //   pageSize: warehouseProductsStore?.pageSize,
        //   showSizeChanger: true,
        //   onChange: handlePageChange,
        //   ...getPaginationParams(productsData?.totalCount),
        //   pageSizeOptions: [50, 100, 500, 1000],
        // }}
        // summary={() => (
        //   <Table.Summary.Row>
        //     <Table.Summary.Cell colSpan={2} index={1} />
        //     <Table.Summary.Cell index={2}>
        //       <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        //         Umumiy:
        //         <p style={{margin: '0', fontWeight: 'bold'}}>{productsData?.totalCalc?.totalProductCount}</p>
        //       </div>
        //     </Table.Summary.Cell>
        //     <Table.Summary.Cell index={2}>
        //       <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '150px', margin: '0 auto' }}>
        //         Umumiy sotib olingan narxi:
        //         <p style={{margin: '0', fontWeight: 'bold'}}>{priceFormat(productsData?.totalCalc?.totalProductCost)}</p>
        //       </div>
        //     </Table.Summary.Cell>
        //     <Table.Summary.Cell index={3}>
        //       <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '150px', margin: '0 auto' }}>
        //         Umumiy sotilish narxi:
        //         <p style={{margin: '0', fontWeight: 'bold'}}>{priceFormat(productsData?.totalCalc?.totalProductPrice)}</p>
        //       </div>
        //     </Table.Summary.Cell>
        //   </Table.Summary.Row>
        // )}
      />


      {warehouseProductsStore.isOpenAddEditProductModal && <AddEditModal />}
      {warehouseProductsStore.isOpenTransferModal && <TransferModal />}
    </main>
  );
});
