import { ISale } from '@/api/sale/types';
import { getFullDateFormat, getFullDateFormatWithOutTz } from '@/utils/getDateFormat';
import { priceFormat } from '@/utils/priceFormat';
import React from 'react';

export interface Item {
  name: string;
  price: number;
}

interface ReceiptProps {
  items: ISale;
}

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ items }, ref) => (
  <div ref={ref} style={{ width: '78mm', padding: '10px', fontFamily: 'monospace' }}>
    <h3 style={{ textAlign: 'center' }}>Kito</h3>
    <p>---------------------------------------------------</p>
    <p style={{ fontSize: '14px', margin: 0 }}>Sana: {getFullDateFormatWithOutTz(items?.createdAt)}</p>
    <p style={{ fontSize: '14px', margin: 0 }}>Sotuvchi: {items?.staff?.fullname}</p>
    <p>---------------------------------------------------</p>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items?.products.map((item, index) => (
        <li style={{ fontSize: '12px', marginBottom: '10px' }} key={index}>
          <p style={{margin: 0, fontWeight: 'bold'}}>
            {
              `${item?.productStorehouse?.product?.name}`
            }
          </p>
          <p style={{margin: 0, paddingLeft: '10px'}}>
            {`${item?.quantity} x ${item?.productStorehouse?.product?.quantity} X ${priceFormat(item?.productStorehouse?.product?.price)} ==
            ${priceFormat(item?.quantity * item?.productStorehouse?.product?.price * item?.productStorehouse?.product?.quantity)}`}
          </p>
        </li>
      ))}
    </ul>
    <p>---------------------------------------------------</p>
    <h4>Jami: {priceFormat(items?.totalSum)}</h4>
    <h4>Qarzga: {priceFormat(items?.debt)}</h4>
    <p style={{ textAlign: 'center' }}>Xaridingiz uchun rahmat!</p>
  </div>
));
