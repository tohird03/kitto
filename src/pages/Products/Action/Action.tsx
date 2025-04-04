import React, {FC, useEffect, useRef} from 'react';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined, PrinterOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {productsApi} from '@/api/products';
import {IProducts} from '@/api/products/types';
import {productsListStore} from '@/stores/products-list';
import {addNotification} from '@/utils';
import {priceFormat} from '@/utils/priceFormat';

type Props = {
  product: IProducts;
};

const pageStyle = `
  @page {
    size: 60mm 40mm;
    margin: 0;
  }
  @media print {
    body {
        margin: 0;
        padding: 0;
    }
    .barcodeContainer {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .barcodeContainer div {
      display: flex;
      justify-content: center;
      width: 100%;
  }
}
`;


export const Action: FC<Props> = observer(({product}) => {
  const queryClient = useQueryClient();
  const barcodeRef = useRef(null);

  const {mutate: deleteProduct} =
    useMutation({
      mutationKey: ['deleteProduct'],
      mutationFn: (id: string) => productsApi.deleteProduct(id!),
      onSuccess: () => {
        addNotification('Mahsulot o\'chirildi');
        queryClient.invalidateQueries({queryKey: ['getProducts']});
      },
      onError: addNotification,
    });

  const handleEdit = () => {
    productsListStore.setSingleProduct(product);
    productsListStore.setIsOpenAddEditProductModal(true);
  };

  const handleDelete = () => {
    deleteProduct(product?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <ReactToPrint
        trigger={() => <Button type="dashed" icon={<PrinterOutlined />} />}
        content={() => barcodeRef.current}
        pageStyle={pageStyle}
      />
      <Button onClick={handleEdit} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Mahsulotni o'chirish"
        description="Rostdan ham bu mahsulotni o'chirishni xohlaysizmi?"
        onConfirm={handleDelete}
        okText="Ha"
        okButtonProps={{style: {background: 'red'}}}
        cancelText="Yo'q"
      >
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Popconfirm>

      <div style={{display: 'none'}}>
        <div ref={barcodeRef} className="barcodeContainer">
          {/* Mahsulot nomi */}
          <h3
            style={{
              fontSize: '14px',
              margin: '0',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {product?.name}
          </h3>
          <h3
            style={{
              fontSize: '12px',
              margin: '0',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {product?.quantity} шт
          </h3>

          <p
            style={{
              fontSize: '14px',
              margin: '0',
              textAlign: 'center',
            }}
          >
            Narxi: {priceFormat(product?.price)}
          </p>
          <div>
            <Barcode
              value={`${product?.barcode?.code}`}
              width={2}
              height={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
