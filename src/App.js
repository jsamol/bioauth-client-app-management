import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { CookiesProvider } from 'react-cookie';
import BioAuthLayout from './components/layouts/BioAuth';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const AuthenticationProvider = React.lazy(() => import('./components/wrappers/AuthenticationProvider'));

const Page404 = React.lazy(() => import('./components/views/Page404'));
const Page500 = React.lazy(() => import('./components/views/Page500'));

class App extends Component {

  render() {
    return (
      <CookiesProvider>
        <React.Suspense fallback={loading()}>
          <AuthenticationProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path="/not-found" name="Page 404" render={props => <Page404 {...props}/>}/>
                <Route exact path="/error" name="Page 500" render={props => <Page500 {...props}/>}/>
                <Route path="/" name="Home" render={props => <BioAuthLayout {...props}/>}/>
              </Switch>
            </BrowserRouter>
          </AuthenticationProvider>
        </React.Suspense>
      </CookiesProvider>
    );
  }
}

export default App;
