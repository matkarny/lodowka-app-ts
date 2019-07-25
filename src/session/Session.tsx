import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import * as Routes from '../common/constants/Routes';
import DashboardModule from '../modules/DashboardModule/DashboardModule';
import ProductFullList from '../modules/ProductFullList/ProductFullList';
import LoginModule from '../modules/LoginModule/LoginModule';
import NotesFullView from '../modules/NotesFullView/NotesFullView';
// import Login from '../modules/Login/Login';
import Login from '../modules/Login/Login';

export default function Session() {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <ul style={{ backgroundColor: 'lightsalmon' }}>
          <li>
            <Link to={Routes.LOGIN}>Public Page - Login</Link>
          </li>
          <li>
            <Link to={Routes.DASHBOARD}>Protected Page - Dashboard</Link>
          </li>
        </ul>

        <Route path={Routes.LOGIN} component={Login} />
        <Route path={Routes.PRODUCTS} component={ProductFullList} />
        <Route path={Routes.NOTES} component={NotesFullView} />
        <PrivateRoute path={Routes.DASHBOARD} component={DashboardModule} />
      </div>
    </Router>
  );
}
