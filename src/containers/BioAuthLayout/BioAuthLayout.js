import React, {Component, Suspense} from 'react'
import {withRouter} from "react-router-dom";
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
import apiController from "../../network";
import Keycloak from "keycloak-js";

const AppListHeader = React.lazy(() => import('./BioAuthHeader'));
const AppListFooter = React.lazy(() => import('./BioAuthFooter'));

class BioAuthLayout extends Component {

  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);

    this.state = {
      keycloak: null,
      authenticated: false,
      userInfo: null,
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

  signOut() {
    if (this.state.keycloak) {
      this.state.keycloak.logout();
    }
  }

  componentDidMount() {
    const keycloak = Keycloak('keycloak.json');
    keycloak.init({
      onLoad: 'login-required'
    }).success((res) => {
      this.setState({
        keycloak: keycloak,
        authenticated: res
      });

      apiController.token = keycloak.token;

      this.loadUserInfo();
      this.loadApps();
    }).error(() => {
      // TODO: Handle error properly
      console.log('Authentication: error');
    });
  }

  loadUserInfo() {
    this.state.keycloak.loadUserInfo()
      .success((userInfo) => {
        this.setState({
          userInfo
        });
      }).error((error) => {
      // TODO: Handle error properly
      console.log(error)
    });
  }

  loadApps() {
    apiController.getApps((res) => {
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
            <AppListHeader email={this.state.userInfo ? this.state.userInfo.email : ""} onLogout={this.signOut}/>
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

export default withRouter(BioAuthLayout);
