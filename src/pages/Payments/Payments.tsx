import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {DownloadOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, DatePicker, Input, Table, Tooltip, Typography} from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {paymentApi} from '@/api/payment';
import {paymentsStore} from '@/stores/payments';
import {addNotification} from '@/utils';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {AddEditModal} from './AddEditModal';
import {paymentsColumns} from './constants';
import styles from './payments.scss';

const cn = classNames.bind(styles);

export const ClientsPayments = observer(() => {
  const [downloadLoading, setDownLoadLoading] = useState(false);

  const {data: paymentsData, isLoading: loading} = useQuery({
    queryKey: [
      'getPayments',
      paymentsStore.pageNumber,
      paymentsStore.pageSize,
      paymentsStore.search,
      paymentsStore.startDate,
      paymentsStore.endDate,
    ],
    queryFn: () =>
      paymentsStore.getClientsPayments({
        pageNumber: paymentsStore.pageNumber,
        pageSize: paymentsStore.pageSize,
        search: paymentsStore.search!,
        startDate: paymentsStore?.startDate!,
        endDate: paymentsStore?.endDate!,
      }),
  });

  const handleAddNewPayment = () => {
    paymentsStore.setIsOpenAddEditPaymentModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    paymentsStore.setSearch(e.currentTarget?.value);
  };

  const handleDateChange = (values: any, dateFormat: any) => {
    if (dateFormat) {
      paymentsStore.setStartDate(dateFormat[0]);
      paymentsStore.setEndDate(dateFormat[1]);
    } else {
      paymentsStore.setStartDate(null);
      paymentsStore.setEndDate(null);
    }
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    paymentsStore.setPageNumber(page);
    paymentsStore.setPageSize(pageSize!);
  };

  const handleDownloadExcel = () => {
    setDownLoadLoading(true);
    paymentApi.getUploadPayments({
      pageNumber: paymentsStore.pageNumber,
      pageSize: paymentsStore.pageSize,
      search: paymentsStore.search!,
      startDate: paymentsStore?.startDate!,
      endDate: paymentsStore?.endDate!,
    })
      .then(res => {
        const url = URL.createObjectURL(new Blob([res]));
        const a = document.createElement('a');

        a.href = url;
        a.download = 'to\'lovlar.xlsx';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(addNotification)
      .finally(() => {
        setDownLoadLoading(false);
      });
  };

  useEffect(() => () => {
    paymentsStore.reset();
  }, []);

  return (
    <main>
      <div className={cn('clients-payments__head')}>
        <Typography.Title level={3}>To&apos;lovlar ro&apos;yxati</Typography.Title>
        <div className={cn('clients-payments__filter')}>
          <Input
            placeholder="Mijozlarni qidirish"
            allowClear
            onChange={handleSearch}
            className={cn('clients-payments__search')}
          />
          <DatePicker.RangePicker
            className={cn('promotion__datePicker')}
            onChange={handleDateChange}
            placeholder={['Boshlanish sanasi', 'Tugash sanasi']}
            defaultValue={[dayjs(paymentsStore.startDate), dayjs(paymentsStore.endDate)]}
          />
          <Button
            onClick={handleAddNewPayment}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Mijoz to&apos;lovi
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
        columns={paymentsColumns}
        dataSource={paymentsData?.data?.data || []}
        loading={loading}
        pagination={{
          total: paymentsData?.data?.totalCount,
          current: paymentsStore?.pageNumber,
          pageSize: paymentsStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(paymentsData?.data?.totalCount),
        }}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={2} index={1} />
            <Table.Summary.Cell index={2}>
              <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                Jami: {paymentsData?.calc?.totalCash}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                Jami: {paymentsData?.calc?.totalCard}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                Jami: {paymentsData?.calc?.totalTransfer}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                Jami: {paymentsData?.calc?.totalOther}
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />

      {paymentsStore.isOpenAddEditPaymentModal && <AddEditModal />}
    </main>
  );
});
