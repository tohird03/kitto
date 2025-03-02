import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// @ts-ignore
import Barcode from 'react-barcode';
// @ts-ignore
import ReactToPrint from 'react-to-print';
import { Button } from 'antd';

declare global {
  interface Window {
    qz?: any;
  }
}

const pageStyle = `
  @page {
    size: auto
    margin: 0
  };
  @media all {
    .pageBreak {
      display: none
    }
  };
  @media print {
    .pageBreak {
      page-break-before: always
    }
  }
`;

export const Sale = observer(() => {
  const [barcode, setBarcode] = useState('');
  const barCodeRef = useRef<any>();

  // SCANNER
  useEffect(() => {
    let scannedCode = '';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setBarcode(scannedCode);
        scannedCode = '';
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
    <div>
      <h2>Scan Barcode</h2>
      <p>Scanned Code: {barcode}</p>

      <h2 className="text-lg font-bold mt-4">Barcode chiqarish</h2>
      <div className="p-4 border">
        <Barcode
          value="123321"
          width={1}
          height={40}
          ref={barCodeRef}
        />
      </div>
      <div className="mt-2">
        <ReactToPrint
          trigger={() => <Button type="dashed">Barcode Chop Etish</Button>}
          content={() => barCodeRef.current}
          pageStyle={pageStyle}
          documentTitle=""
        />
      </div>
    </div >
  );
});
