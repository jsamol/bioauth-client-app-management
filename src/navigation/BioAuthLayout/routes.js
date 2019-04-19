import React from 'react';

const Dashboard = React.lazy(() => import('../../views/Dashboard/Dashboard'));
const Apps = React.lazy(() => import('../../views/AppList'));

const routeName = {
  HOME: "Home",
  DASHBOARD: "Dashboard",
  APP_LIST: "AppList"
};

const routes = [
  { path: '/', exact: true, name: routeName.HOME },
  { path: '/dashboard', exact: true, name: routeName.DASHBOARD, component: Dashboard },
  { path: '/apps', exact: true, name: routeName.APP_LIST, component: Apps }
];

export { routes, routeName };
