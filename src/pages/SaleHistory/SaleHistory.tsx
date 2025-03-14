import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {DownloadOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, DatePicker, Table, Tooltip, Typography} from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {saleApi} from '@/api/sale/sale';
import {saleStore} from '@/stores/sale';
import {addNotification} from '@/utils';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {productsListColumn} from './constants';
import styles from './sale-history.scss';
import { OrderShowInfoModal } from './OrderShowInfoModal';

const cn = classNames.bind(styles);

export const SaleHistory = observer(() => {
  const [downloadLoading, setDownLoadLoading] = useState(false);

  const {data: saleData, isLoading: loading} = useQuery({
    queryKey: [
      'getSales',
      saleStore.pageNumber,
      saleStore.pageSize,
      saleStore.startDate,
      saleStore.endDate,
    ],
    queryFn: () =>
      saleStore.getSales({
        pageNumber: saleStore.pageNumber,
        pageSize: saleStore.pageSize,
        startDate: saleStore.startDate!,
        endDate: saleStore.endDate!,
      }),
  });

  const handleDateChange = (values: any, dateFormat: any) => {
    if (dateFormat) {
      saleStore.setStartDate(dateFormat[0]);
      saleStore.setEndDate(dateFormat[1]);
    } else {
      saleStore.setStartDate(null);
      saleStore.setEndDate(null);
    }
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    saleStore.setPageNumber(page);
    saleStore.setPageSize(pageSize!);
  };

  const handleDownloadExcel = () => {
    setDownLoadLoading(true);
    saleApi.getUploadSale({
      pageNumber: saleStore.pageNumber,
      pageSize: saleStore.pageSize,
    })
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
    saleStore.reset();
  }, []);

  return (
    <main>
      <div className={cn('sale-history__head')}>
        <Typography.Title level={3}>Sotuvlar</Typography.Title>
        <div className={cn('sale-history__filter')}>
          <Tooltip placement="top" title="Excelda yuklash">
            <DatePicker.RangePicker
              className={cn('promotion__datePicker')}
              onChange={handleDateChange}
              placeholder={['Boshlanish sanasi', 'Tugash sanasi']}
              defaultValue={[dayjs(saleStore.startDate), dayjs(saleStore.endDate)]}
            />
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
        dataSource={saleData?.data?.data || []}
        loading={loading}
        pagination={{
          total: saleData?.data?.totalCount,
          current: saleStore?.pageNumber,
          pageSize: saleStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(saleData?.data?.totalCount),
          pageSizeOptions: [50, 100, 500, 1000],
        }}
      // summary={() => (
      //   <Table.Summary.Row>
      //     <Table.Summary.Cell colSpan={2} index={1} />
      //     <Table.Summary.Cell index={2}>
      //       <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
      //         Umumiy:
      //         <p style={{margin: '0', fontWeight: 'bold'}}>{saleData?.totalCalc?.totalProductCount}</p>
      //       </div>
      //     </Table.Summary.Cell>
      //     <Table.Summary.Cell index={2}>
      //       <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '150px', margin: '0 auto' }}>
      //         Umumiy sotib olingan narxi:
      //         <p style={{margin: '0', fontWeight: 'bold'}}>{priceFormat(saleData?.totalCalc?.totalProductCost)}</p>
      //       </div>
      //     </Table.Summary.Cell>
      //     <Table.Summary.Cell index={3}>
      //       <div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '150px', margin: '0 auto' }}>
      //         Umumiy sotilish narxi:
      //         <p style={{margin: '0', fontWeight: 'bold'}}>{priceFormat(saleData?.totalCalc?.totalProductPrice)}</p>
      //       </div>
      //     </Table.Summary.Cell>
      //   </Table.Summary.Row>
      // )}
      />


      {saleStore.isOpenOrderProductsModal && <OrderShowInfoModal />}
    </main>
  );
});
