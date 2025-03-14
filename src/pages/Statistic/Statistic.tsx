import React from 'react';
import Chart from 'react-apexcharts';
import CountUp from 'react-countup';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {CalendarOutlined, DollarOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Calendar, Card} from 'antd';
import classNames from 'classnames';
import {ROUTES} from '@/constants';
import {saleStore} from '@/stores/sale';
import {dateFormat, getStartAndEndDate, getStartMonthEndDate} from '@/utils/getDateFormat';
import styles from './statistic.scss';

const cn = classNames.bind(styles);
const formatter = (value: number) => <CountUp duration={2} end={value} separator=" " />;

export const Statistic = observer(() => {

  const navigate = useNavigate();
  const {data: saleGraphStatistic, isLoading: loading} = useQuery({
    queryKey: ['getOrdersStatisticGraph'],
    queryFn: () => saleStore.getSalesStatisticGraph({
      type: 'month',
    }),
  });

  const {data: saleStatistic} = useQuery({
    queryKey: ['getOrdersStatistic'],
    queryFn: () => saleStore.getSalesStatistic(),
  });

  const chartOptions = {
    options: {
      chart: {
        id: 'basic-bar',
        toolbar: {
          show: true,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      stroke: {
        stroke: {
          curve: 'smooth',
          dashArray: 0,
        },
        fill: {
          color: 'red',
          pattern: {
            strokeWidth: 10,
            style: 'none',
            width: 100,
          },
        },
      },
      xaxis: {
        categories: saleGraphStatistic?.data?.map(value => dateFormat(value?.date)),
      },
      yaxis: {
        tickAmount: 10,
      },
      markers: {
        size: 6,
        colors: ['#fff'],
        strokeColors: '#f18024',
        strokeWidth: 2,
        hover: {
          size: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#f18024'],
    },
    series: [
      {
        name: 'Sotuv',
        data: saleGraphStatistic?.data?.map(value => Number(value?.sum) || 0) || [],
      },
    ],
  };

  const handleClickTodayOrder = () => {
    // navigate(ROUTES.productsOrder);
  };

  const handleClickTodayWeek = () => {
    // navigate(ROUTES.productsOrder);
  };

  const handleClickMonth = () => {
    // navigate(ROUTES.productsOrder);
  };

  const handleClickClient = () => {
    // navigate(ROUTES.clientsInfo);
  };

  const handleClickSupplier = () => {
    // navigate(ROUTES.supplierInfo);
  };

  return (
    <div style={{backgroundColor: '#F5F5F5', padding: '30px'}}>
      <div className={cn('statistic__top-wrapper')}>
        <div className={cn('statistic__top-order')}>
          <h3 className={cn('statistic__top-heading')}>Sotuvlar</h3>
          <div className={cn('statistic__top-order-card')}>
            <Card onClick={handleClickTodayOrder} className={cn('statistic__top-card')}>
              <CalendarOutlined style={{fontSize: '40px', color: '#f18024', marginBottom: 5}} />
              <p className={cn('statistic__top-card-info')}>Bugun</p>
              <p className={cn('statistic__top-card-value')}>
                {formatter(saleStatistic?.data?.daily || 0)}
              </p>
            </Card>
            <Card onClick={handleClickTodayWeek} className={cn('statistic__top-card')}>
              <CalendarOutlined style={{fontSize: '40px', color: '#f18024', marginBottom: 5}} />
              <p className={cn('statistic__top-card-info')}>Shu hafta</p>
              <p className={cn('statistic__top-card-value')}>
                {formatter(saleStatistic?.data?.weekly || 0)}
              </p>
            </Card>
            <Card onClick={handleClickMonth} className={cn('statistic__top-card')}>
              <CalendarOutlined style={{fontSize: '40px', color: '#f18024', marginBottom: 5}} />
              <p className={cn('statistic__top-card-info')}>Shu oy</p>
              <p className={cn('statistic__top-card-value')}>
                {formatter(saleStatistic?.data?.monthly || 0)}
              </p>
            </Card>
          </div>
        </div>
        <div className={cn('statistic__top-order')}>
          <h3 className={cn('statistic__top-heading')}>Mijozlar</h3>
          <Card onClick={handleClickClient} className={cn('statistic__top-card')}>
            <div className={cn('statistic__debts')}>
              <div>
                <p className={cn('statistic__top-card-info')}>Bizga qarz</p>
                <p className={cn('statistic__top-card-value')}>
                  {formatter(0)}
                </p>
              </div>
              <div>
                <p className={cn('statistic__top-card-info')}>Bizning qarz</p>
                <p className={cn('statistic__top-card-value')}>
                  {formatter(0)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Card>
        <h1>Bir haftalik sotuv</h1>
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={350}
        />
      </Card>
    </div>
  );
});
