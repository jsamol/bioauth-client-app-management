import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const BioAuthLayout = React.lazy(() => import('./components/layouts/BioAuth'));

const Page404 = React.lazy(() => import('./components/views/Page404'));
const Page500 = React.lazy(() => import('./components/views/Page500'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/not-found" name="Page 404" render={props => <Page404 {...props}/>}/>
            <Route exact path="/error" name="Page 500" render={props => <Page500 {...props}/>}/>
            <Route path="/" name="Home" render={props => <BioAuthLayout {...props}/>}/>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
