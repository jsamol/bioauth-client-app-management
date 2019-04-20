import React from 'react';

const Dashboard = React.lazy(() => import('../components/views/Dashboard'));
const AppList = React.lazy(() => import('../components/views/AppList'));
const NewApp = React.lazy(() => import('../components/views/NewApp'));

const routes = {
  HOME: {
    path: '/',
    name: 'Home',
    exact: true,
  },
  DASHBOARD: {
    path: '/dashboard',
    name: 'Dashboard',
    exact: true,
    component: Dashboard,
  },
  APP_LIST: {
    path: '/apps',
    name: 'AppList',
    exact: true,
    component: AppList,
  },
  NEW_APP: {
    path: '/apps/new',
    name: 'NewApp',
    exact: true,
    component: NewApp,
  },
};

export default routes;
