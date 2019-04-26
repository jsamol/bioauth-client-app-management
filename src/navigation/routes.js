import React from 'react';

const Dashboard = React.lazy(() => import('../components/views/Dashboard'));
const AppList = React.lazy(() => import('../components/views/AppList'));
const NewApp = React.lazy(() => import('../components/views/NewApp'));
const AppDetails = React.lazy(() => import('../components/views/AppDetails'));

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
    path: '/apps/all',
    name: 'Apps',
    exact: true,
    component: AppList,
  },
  NEW_APP: {
    path: '/apps/new',
    name: 'New App',
    exact: true,
    component: NewApp,
  },
  APP_DETAILS: {
    path: '/apps/:id/:name',
    name: 'App Details',
    exact: true,
    component: AppDetails,
  },
};

export default routes;
