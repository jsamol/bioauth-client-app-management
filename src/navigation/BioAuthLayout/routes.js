import React from 'react';

const Dashboard = React.lazy(() => import('../../views/Dashboard/Dashboard'));
const Apps = React.lazy(() => import('../../views/AppList'));

const routes = {
  HOME: {
    path: '/',
    name: 'Home',
    exact: true
  },
  DASHBOARD: {
    path: '/dashboard',
    name: 'Dashboard',
    exact: true,
    component: Dashboard
  },
  APP_LIST: {
    path: '/apps',
    name: 'AppList',
    exact: true,
    component: Apps
  }
};

export default routes;
