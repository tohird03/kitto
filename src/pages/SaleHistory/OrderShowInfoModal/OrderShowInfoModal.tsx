import React, { useEffect } from 'react';
import { Button, Modal, Table, notification } from 'antd';
import { observer } from 'mobx-react';
import { saleStore } from '@/stores/sale';
import { orderProductsColumns } from '../constants';

export const OrderShowInfoModal = observer(() => {
  const handleModalClose = () => {
    saleStore.setSingleOrderHistory(null);
    saleStore.setIsOpenOrderProductsModal(false);
  };

  useEffect(() => {
    if (!saleStore?.singleOrderHistory) {
      notification.error({
        message: 'Bu sotuv topilmadi!',
        placement: 'topRight',
      });
      handleModalClose();
    }
  }, [saleStore?.singleOrderHistory]);

  return (
    <Modal
      open={saleStore.isOpenOrderProductsModal}
      title={'Sotuv mahsulotlari'}
      onCancel={handleModalClose}
      cancelText="Bekor qilish"
      centered
      style={{ top: 0, padding: 0 }}
      bodyStyle={{
        height: '85vh',
        overflow: 'auto',
      }}
      width="100vw"
      footer={
        <Button onClick={handleModalClose}>
          Yopish
        </Button>
      }
    >
      <Table
        columns={orderProductsColumns}
        dataSource={saleStore?.singleOrderHistory?.products || []}
        pagination={false}
      />
    </Modal>
  );
});
