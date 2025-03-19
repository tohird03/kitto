import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {DownloadOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Table, Tooltip, Typography} from 'antd';
import classNames from 'classnames';
// @ts-ignore
import useScanDetection from 'use-scan-detection';
import {productsApi} from '@/api/products';
import {IProducts} from '@/api/products/types';
import {productsListStore} from '@/stores/products-list';
import {addNotification} from '@/utils';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {AddEditModal} from './AddEditModal';
import {productsListColumn} from './constants';
import styles from './product.scss';

const cn = classNames.bind(styles);

export const ProductsList = observer(() => {
  const [downloadLoading, setDownLoadLoading] = useState(false);
  const [scannedCode, setScannedCode] = useState<string>('');

  const {data: productsData, isLoading: loading} = useQuery({
    queryKey: [
      'getProducts',
      productsListStore.pageNumber,
      productsListStore.pageSize,
      productsListStore.name,
    ],
    queryFn: () =>
      productsListStore.getProducts({
        pageNumber: productsListStore.pageNumber,
        pageSize: productsListStore.pageSize,
        name: productsListStore.name!,
      }),
  });

  const handleAddNewProduct = () => {
    productsListStore.setIsOpenAddEditProductModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    productsListStore.setName(e.currentTarget?.value);
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    productsListStore.setPageNumber(page);
    productsListStore.setPageSize(pageSize!);
  };

  const handleDownloadExcel = () => {
    setDownLoadLoading(true);
    productsApi.getUploadProducts()
      .then(res => {
        const url = URL.createObjectURL(new Blob([res]));
        const a = document.createElement('a');

        a.href = url;
        a.download = 'mahsulotlar.xlsx';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(addNotification)
      .finally(() => {
        setDownLoadLoading(false);
      });
  };

  useEffect(() => () => {
    productsListStore.reset();
  }, []);

  const rowClassName = (record: IProducts) =>
    record?.countInStorehouses < 0 ? 'error__row'
      : record.countInStorehouses < record?.warningThreshold
        ? 'warning__row' : '';

  useEffect(() => {
    let scannedCode = '';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log('📌 Skaner kodi:', scannedCode);
        scannedCode = ''; // Tozalash
      } else {
        scannedCode += event.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main>
      <div className={cn('product-list__head')}>
        <Typography.Title level={3}>Mahsulotlar</Typography.Title>
        <div className={cn('product-list__filter')}>
          <Input
            placeholder="Mahsulotni qidirish"
            allowClear
            onChange={handleSearch}
            className={cn('product-list__search')}
          />
          <Button
            onClick={handleAddNewProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Mahsulot qo&apos;shish
          </Button>
          <Tooltip placement="top" title="Excelda yuklash">
            <Button
              onClick={handleDownloadExcel}
              type="primary"
              icon={<DownloadOutlined />}
              loading={downloadLoading}
            >
              Exelda Yuklash
            </Button>
          </Tooltip>
        </div>
      </div>

      <Table
        columns={productsListColumn}
        dataSource={productsData?.data?.data || []}
        loading={loading}
        rowClassName={rowClassName}
        pagination={{
          total: productsData?.data?.totalCount,
          current: productsListStore?.pageNumber,
          pageSize: productsListStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(productsData?.data?.totalCount),
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


      {productsListStore.isOpenAddEditProductModal && <AddEditModal />}
    </main>
  );
});
