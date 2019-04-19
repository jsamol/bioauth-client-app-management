import React, {Component, Suspense} from 'react'

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import sidebarNavigation from "../../navigation/BioAuthLayout/nav";
import routes from "../../navigation/BioAuthLayout/routes";
import {Container} from "reactstrap";
import {Redirect, Route, Switch} from "react-router-dom";
import {getApps} from "../../network";

const AppListHeader = React.lazy(() => import('./BioAuthHeader'));
const AppListFooter = React.lazy(() => import('./BioAuthFooter'));

class BioAuthLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apps: []
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  routeList = () => Object.keys(routes).map((key) => routes[key]);

  navigation = () => {
    const appsNavigation = this.state.apps.map((app) => {
      return {
        name: app.name,
        url: `/apps/${app.name.replace(/\s+/g,'')}`,
        icon: 'fa fa-android'
      }
    });
    return { items: [ ...sidebarNavigation, ...appsNavigation ] };
  };

  componentDidMount() {
    getApps((res) => {
      this.setState({
        apps: res.data
      })
    }, (error) => {
      // TODO: Handle error properly
      console.log(error);
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <AppListHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={this.navigation()} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={this.routeList()}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {this.routeList().map((route, idx) => {
                    let routeProps = {};

                    switch (route.name) {
                      case routes.APP_LIST.name:
                        routeProps.appList = this.state.apps;
                        break;
                      default:
                        break;
                    }

                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...routeProps} {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" exact={true} to="/dashboard" />
                  <Redirect from="/*" to="/not-found" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <AppListFooter />
          </Suspense>
        </AppFooter>
      </div>
    )
  }
}

export default BioAuthLayout;
