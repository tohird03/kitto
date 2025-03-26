import React, { FC, useRef } from 'react';
import { observer } from 'mobx-react';
import { DownloadOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, Dropdown, Menu, Popconfirm } from 'antd';
import Item from 'antd/es/list/Item';
import { ISale } from '@/api/sale/types';
import { saleStore } from '@/stores/sale';
import { Receipt } from '@/pages/Sale/Print/Print';
import { MyDocument } from './Pdf-save';
import { useReactToPrint } from 'react-to-print';

type Props = {
  sale: ISale;
};

export const Action: FC<Props> = observer(({ sale }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleShowOrderProducts = () => {
    saleStore.setSingleOrderHistory(sale);
    saleStore.setIsOpenOrderProductsModal(true);
  };

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const menuSaveOptions = (
    <Menu style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Item key="check">
        <Button
          onClick={handlePrint}
          icon={<PrinterOutlined />}
        >
          Chekka chiqarish
        </Button>
      </Item>
      <Item key="check">
        <PDFDownloadLink
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            padding: '4px 15px',
            fontWeight: '500',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          document={<MyDocument sale={sale} />}
          fileName={sale?.client?.fullname}
        >
          <DownloadOutlined style={{ marginRight: '10px' }} /> Pdfda yuklash
        </PDFDownloadLink>
      </Item>
    </Menu>
  );

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={handleShowOrderProducts} type="primary" icon={<EyeOutlined />} />
      <Dropdown placement="bottomRight" overlay={menuSaveOptions} trigger={['click']}>
        <Button icon={<DownloadOutlined />} />
      </Dropdown>

      <div style={{ display: 'none' }}>
        <Receipt ref={receiptRef} items={sale!} />
      </div>
    </div >
  );
});
