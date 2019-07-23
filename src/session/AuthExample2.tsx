import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Login from './Login';
import AuthButton from './AuthButton';
import PrivateRoute from './PrivateRoute';
import { Public } from './Public';
import { Protected } from './Protected';
import * as Routes from '../../src/common/constants/Routes';
import DashboardModule from '../modules/DashboardModule/DashboardModule';
import ProductFullList from '../modules/ProductFullList/ProductFullList';
import LoginModule from '../modules/LoginModule/LoginModule';
import NotesFullView from '../modules/NotesFullView/NotesFullView';

export default function AuthExample() {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <AuthButton />
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
