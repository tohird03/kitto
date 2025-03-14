/* eslint-disable import/namespace */
import React, {Suspense} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import {Loading} from '@/components';
import {ROUTES} from '@/constants';
import {Layout} from '@/modules/Layout';
import {
  ClientsInfo,
  Login,
  Payments,
  ProductsList,
  Sale,
  SaleHistory,
  Staffs,
  Statistic,
  Warehouse,
  WarehouseProductsList,
} from './lazy';
import {ProtectedRoutes} from './ProtectedRoutes';
import {PublicRoutes} from './PublicRoutes';

type Props = {
  isAuth: boolean | null;
};

export const Router = ({isAuth}: Props) => useRoutes([
  {
    path: ROUTES.home,
    element: <ProtectedRoutes isAuth={isAuth} />,
    children: [
      {
        path: ROUTES.home,
        element: <Layout />,
        children: [
          // ADMIN
          {
            element: <Suspense fallback={<Loading />}><Sale /></Suspense>,
            path: ROUTES.home,
            index: true,
          },
          {
            element: <Suspense fallback={<Loading />}><Statistic /></Suspense>,
            path: ROUTES.statistic,
          },
          {
            element: <Suspense fallback={<Loading />}><SaleHistory /></Suspense>,
            path: ROUTES.saleHistory,
          },
          {
            element: <Suspense fallback={<Loading />}><Warehouse /></Suspense>,
            path: ROUTES.warehouse,
          },
          {
            element: <Suspense fallback={<Loading />}><ClientsInfo /></Suspense>,
            path: ROUTES.clientsInfo,
          },
          {
            element: <Suspense fallback={<Loading />}><ProductsList /></Suspense>,
            path: ROUTES.products,
          },
          {
            element: <Suspense fallback={<Loading />}><WarehouseProductsList /></Suspense>,
            path: ROUTES.warehouseProducts,
          },
          {
            element: <Suspense fallback={<Loading />}><Staffs /></Suspense>,
            path: ROUTES.staffs,
          },
          {
            element: <Suspense fallback={<Loading />}><Payments /></Suspense>,
            path: ROUTES.payments,
          },
          // SETTING ROUTES
          {
            element: <Navigate to={ROUTES.home} />,
            path: '*',
          },
          {
            element: <Navigate to={ROUTES.home} />,
            path: '/',
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.signIn,
    element: <PublicRoutes isAuth={isAuth} />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><Login /></Suspense>,
      },
    ],
  },
]);
