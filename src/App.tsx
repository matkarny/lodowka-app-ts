import React, { Fragment } from 'react';
import './App.css';

import DashboardModule from './modules/DashboardModule/DashboardModule';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Routes from '../src/common/constants/Routes';
import LoginModule from './modules/LoginModule/LoginModule';
import FridgeView from './modules/Fridge/FridgeView';
import ProductFullList from './modules/ProductFullList/ProductFullList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Route exact path={Routes.LOGIN} component={LoginModule} />
        <Route path={Routes.DASHBOARD} component={DashboardModule} />
        <Route path={Routes.FRIDGE} component={FridgeView} />
        <Route path={Routes.PRODUCTS} component={ProductFullList} />
      </div>
    </Router>
  );
};

export default App;
