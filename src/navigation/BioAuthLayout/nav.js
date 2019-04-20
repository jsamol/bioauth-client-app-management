import routes from "./routes";

export default [
  {
    name: 'Dashboard',
    url: routes.DASHBOARD.path,
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Apps',
    wrapper: {            // optional wrapper object
      element: '',        // required valid HTML5 element tag
      attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    },
    class: ''             // optional class names space delimited list for title item ex: "text-center"
  },
  {
    name: 'All',
    url: routes.APP_LIST.path,
    icon: 'icon-list'
  },
  {
    name: 'New App',
    url: routes.NEW_APP.path,
    icon: 'icon-plus'
  }
];
