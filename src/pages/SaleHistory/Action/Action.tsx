import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DownloadOutlined, EyeOutlined, PrinterOutlined} from '@ant-design/icons';
import {pdf, PDFDownloadLink} from '@react-pdf/renderer';
import {Button, Dropdown, Menu, Popconfirm} from 'antd';
import Item from 'antd/es/list/Item';
import {ISale} from '@/api/sale/types';
import {saleStore} from '@/stores/sale';
import {MyDocument} from './Pdf-save';

type Props = {
  sale: ISale;
};

export const Action: FC<Props> = observer(({sale}) => {

  const handleShowOrderProducts = () => {
    saleStore.setSingleOrderHistory(sale);
    saleStore.setIsOpenOrderProductsModal(true);
  };

  const handlePrint = () => {
    const doc = <MyDocument sale={sale} />;

    pdf(doc).toBlob().then((blob) => {
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');

      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.src = url;
      document.body.appendChild(iframe);
      iframe.contentWindow?.print();
    });
  };

  const menuSaveOptions = (
    <Menu style={{padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
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
          <DownloadOutlined style={{marginRight: '10px'}} /> Pdfda yuklash
        </PDFDownloadLink>
      </Item>
    </Menu>
  );

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleShowOrderProducts} type="primary" icon={<EyeOutlined />} />
      <Dropdown placement="bottomRight" overlay={menuSaveOptions} trigger={['click']}>
        <Button icon={<DownloadOutlined />} />
      </Dropdown>
    </div >
  );
});
