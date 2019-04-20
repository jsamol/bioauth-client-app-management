import routes from './routes';

const sidebarNav = [
  {
    name: 'Dashboard',
    url: routes.DASHBOARD.path,
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Apps',
  },
  {
    name: 'All',
    url: routes.APP_LIST.path,
    icon: 'icon-list',
  },
  {
    name: 'New App',
    url: routes.NEW_APP.path,
    icon: 'icon-plus',
  },
];

export default sidebarNav;
