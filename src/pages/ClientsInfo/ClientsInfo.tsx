import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {DownloadOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Tooltip, Typography} from 'antd';
import classNames from 'classnames';
import {clientsInfoApi, IClientsInfo} from '@/api/clients';
import {DataTable} from '@/components/Datatable/datatable';
import {clientsInfoStore} from '@/stores/clients-info';
import {addNotification} from '@/utils';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {useMediaQuery} from '@/utils/mediaQuery';
import {priceFormat} from '@/utils/priceFormat';
import {AddEditModal} from './AddEditModal';
import styles from './client-info.scss';
import {clientsColumns} from './constants';

const cn = classNames.bind(styles);

export const ClientsInfo = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [downloadLoading, setDownLoadLoading] = useState(false);

  const {data: clientsInfoData, isLoading: loading} = useQuery({
    queryKey: [
      'getClients',
      clientsInfoStore.pageNumber,
      clientsInfoStore.pageSize,
      clientsInfoStore.search,
    ],
    queryFn: () =>
      clientsInfoStore.getClients({
        pageNumber: clientsInfoStore.pageNumber,
        pageSize: clientsInfoStore.pageSize,
        search: clientsInfoStore.search!,
      }),
  });

  const handleAddNewClient = () => {
    clientsInfoStore.setIsOpenAddEditClientModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    clientsInfoStore.setSearch(e.currentTarget?.value);
    handlePageChange(1, 10);
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    clientsInfoStore.setPageNumber(page);
    clientsInfoStore.setPageSize(pageSize!);
  };

  useEffect(() => () => {
    clientsInfoStore.reset();
  }, []);

  const rowClassName = (record: IClientsInfo) =>
    record.debt > 0 ? 'error__row'
      : record.debt < 0
        ? 'info__row' : '';

  const handleDownloadExcel = () => {
    setDownLoadLoading(true);
    // TODO

    // clientsInfoApi.getUploadClients({
    //   pageNumber: clientsInfoStore.pageNumber,
    //   pageSize: clientsInfoStore.pageSize,
    //   search: clientsInfoStore.search!,
    // })
    //   .then(res => {
    //     const url = URL.createObjectURL(new Blob([res]));
    //     const a = document.createElement('a');

    //     a.href = url;
    //     a.download = 'mijozlar.xlsx';
    //     a.click();
    //     URL.revokeObjectURL(url);
    //   })
    //   .catch(addNotification)
    //   .finally(() => {
    //     setDownLoadLoading(false);
    //   });
  };

  return (
    <main>
      <div className={cn('client-info__head')}>
        <Typography.Title level={3}>Mijozlar</Typography.Title>
        <div className={cn('client-info__filter')}>
          <Input
            placeholder="Mijozlarni qidirish"
            allowClear
            onChange={handleSearch}
            className={cn('client-info__search')}
          />
          <Button
            onClick={handleAddNewClient}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Mijoz qo&apos;shish
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

      <DataTable
        columns={clientsColumns}
        data={clientsInfoData?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        rowClassName={rowClassName}
        pagination={{
          total: clientsInfoData?.data?.totalCount,
          current: clientsInfoStore?.pageNumber,
          pageSize: clientsInfoStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(clientsInfoData?.data?.totalCount),
        }}
      />

      {clientsInfoStore.isOpenAddEditClientModal && <AddEditModal />}
    </main>
  );
});
