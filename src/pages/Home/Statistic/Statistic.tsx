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
import {getStartAndEndDate, getStartMonthEndDate} from '@/utils/getDateFormat';
import styles from './statistic.scss';

const cn = classNames.bind(styles);
const formatter = (value: number) => <CountUp duration={2} end={value} separator=" " />;

export const Statistic = observer(() => {
  const name = '';

  return (
    <div style={{backgroundColor: '#F5F5F5', padding: '30px'}}>
      s
    </div>
  );
});
