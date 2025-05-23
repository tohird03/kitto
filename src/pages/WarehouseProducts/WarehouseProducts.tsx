import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {PlusCircleOutlined, RetweetOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Table, Typography} from 'antd';
import classNames from 'classnames';
import {IProducts} from '@/api/products/types';
import {IWarehouseProducts} from '@/api/warehouseProducts/types';
import {warehouseProductsStore} from '@/stores/warehouse-products';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {AddEditModal} from './AddEditModal';
import {warehouseProductsListColumn} from './constants';
import {TransferModal} from './TransferModal';
import styles from './warehouse-product.scss';

const cn = classNames.bind(styles);

export const WarehouseProductsList = observer(() => {
  const {data: productsStorehouseData, isLoading: loading} = useQuery({
    queryKey: [
      'getWarehouseProducts',
      warehouseProductsStore.pageNumber,
      warehouseProductsStore.pageSize,
      warehouseProductsStore.search,
    ],
    queryFn: () =>
      warehouseProductsStore.getProducts({
        pageNumber: warehouseProductsStore.pageNumber,
        pageSize: warehouseProductsStore.pageSize,
      }),
  });

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
        columns={warehouseProductsListColumn}
        dataSource={productsStorehouseData?.data?.data || []}
        loading={loading}
        pagination={{
          total: productsStorehouseData?.data?.totalCount,
          current: warehouseProductsStore?.pageNumber,
          pageSize: warehouseProductsStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(productsStorehouseData?.data?.totalCount),
          pageSizeOptions: [50, 100, 500, 1000],
        }}
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
