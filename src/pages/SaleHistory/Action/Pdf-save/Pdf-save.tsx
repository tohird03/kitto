import React, {forwardRef} from 'react';
import {Document, Font, Image, Page, Path, StyleSheet, Text, View} from '@react-pdf/renderer';
import {ISale} from '@/api/sale/types';
import CheckmarkIcon from '@/assets/img/check-mark.png';
import LogoImg from '@/assets/img/logo-all.png';
import {getFullDateFormat} from '@/utils/getDateFormat';
import {phoneFormat} from '@/utils/phoneFormat';
import {priceFormat} from '@/utils/priceFormat';

Font.register({
  family: 'NotoSans',
  src: '/fonts/noto.ttf',
  fontWeight: 'bold',
});

Font.register({
  family: 'NotoSansBold',
  fontWeight: 'bold',
  src: '/fonts/NotoSans-Bold.ttf',
});

type Props = {
  sale: ISale;
};

export const MyDocument = forwardRef<any, Props>(({sale}, ref) => (
  <Document ref={ref}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.topData}>
          <View style={styles.titleInfo}>
            <View style={styles.title}>
              <Text style={styles.titleSpan}>Sotuv vaqti</Text>
              <Text style={styles.titleSpanData}>{getFullDateFormat(sale?.createdAt)}</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleSpan}>Харидор:</Text>
              <Text style={styles.titleSpanData}>{sale?.client?.fullname}    {phoneFormat(sale?.client?.phone?.slice(3))}</Text>
            </View>
          </View>
        </View>

        {/* Jadval */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{...styles.tableHeaderCell, maxWidth: '30px'}}>№</Text>
            <Text style={{...styles.tableHeaderCell, maxWidth: '250px', minWidth: '250px'}}>Махсулот номи</Text>
            <Text style={{...styles.tableHeaderCell, maxWidth: '35px'}}>
              <Image src={CheckmarkIcon} style={{width: 10, height: 10}} />
            </Text>
            <Text style={{...styles.tableHeaderCell}}>Урам</Text>
            <Text style={{...styles.tableHeaderCell}}>Урам сони</Text>
            <Text style={{...styles.tableHeaderCell}}>Нархи</Text>
            <Text style={{...styles.tableHeaderCell}}>Сумма</Text>
          </View>
          {
            sale?.products?.map((product, index) => (
              <View key={product?.productStorehouse?.product?.id} style={styles.tableRow}>
                <Text style={{...styles.tableCell, maxWidth: '30px'}}>{index + 1}</Text>
                <Text style={{...styles.tableCell, maxWidth: '250px', minWidth: '250px', textAlign: 'left'}}>
                  {product?.productStorehouse?.product?.name}
                </Text>
                <Text style={{...styles.tableCell, maxWidth: '35px'}} />
                <Text style={{...styles.tableCell}}>{product?.quantity}</Text>
                <Text style={{...styles.tableCell}}>{product?.productStorehouse?.product?.quantity}</Text>
                <Text style={{...styles.tableCell}}>{product?.productStorehouse?.product?.price}</Text>
                <Text style={{...styles.tableCell}}>
                  {priceFormat(product?.quantity * product?.productStorehouse?.product?.price * product?.productStorehouse?.product?.quantity)}
                </Text>
              </View>
            ))
          }
        </View>

        <View>
          <View style={styles.totalCalcTextWrapper}>
            <Text style={styles.totalCalcText}>Sotilgan qiymati:</Text>
            <Text style={styles.totalCalcPriceText}>{sale?.totalSum}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
));

// PDF uchun stil
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    padding: 10,
  },
  logo: {
    textAlign: 'center',
    fontSize: '28px',
    fontFamily: 'NotoSansBold',
  },
  topData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleInfo: {
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontFamily: 'NotoSans',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
  },
  titleSpan: {
    fontSize: 12,
    fontFamily: 'NotoSansBold',
    fontWeight: 'bold',
    marginRight: 30,
  },
  titleSpanData: {
    fontSize: 12,
    fontFamily: 'NotoSans',
    maxWidth: '70%',
  },
  logoImage: {
    width: 120,
    height: 160,
    marginRight: 40,
  },
  content: {
    fontSize: 12,
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'NotoSansBold',
    fontSize: 10,
    padding: 3,
    borderRightWidth: 1,
    borderColor: 'black',
    fontWeight: 800,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 3,
    borderRightWidth: 1,
    borderColor: 'black',
    fontSize: 9,
  },
  totalCalcTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  totalCalcText: {
    textAlign: 'right',
    fontSize: 9,
    fontFamily: 'NotoSansBold',
    fontWeight: 'bold',
  },
  totalCalcPriceText: {
    textAlign: 'left',
    fontSize: 9,
    fontFamily: 'NotoSans',
    width: 100,
  },
});
