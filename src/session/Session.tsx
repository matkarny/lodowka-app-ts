import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import * as Routes from '../common/constants/Routes';
import DashboardModule from '../modules/DashboardModule/DashboardModule';
import ProductFullList from '../modules/ProductFullList/ProductFullList';
import LoginModule from '../modules/LoginModule/LoginModule';
import NotesFullView from '../modules/NotesFullView/NotesFullView';
// import Login from '../modules/Login/Login';
import Login from '../modules/Login/Login';
import history from '../history';

export default function Session() {
  return (
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        {/* <ul style={{ backgroundColor: 'lightsalmon' }}>
          <li>
            <Link to={Routes.LOGIN}>Public Page - Login</Link>
          </li>
          <li>
            <Link to={Routes.DASHBOARD}>Protected Page - Dashboard</Link>
          </li>
        </ul> */}

        <Route exact path={Routes.LOGIN} component={Login} />
        <PrivateRoute path={Routes.PRODUCTS} component={ProductFullList} />
        <PrivateRoute path={Routes.NOTES} component={NotesFullView} />
        <PrivateRoute path={Routes.DASHBOARD} component={DashboardModule} />
      </div>
    </Router>
  );
}
