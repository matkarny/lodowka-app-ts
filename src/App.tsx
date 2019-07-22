import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { store } from './store/storeConfigure';

import DashboardModule from './modules/DashboardModule/DashboardModule';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Routes from '../src/common/constants/Routes';
import ProductFullList from './modules/ProductFullList/ProductFullList';
import LoginModule from './modules/LoginModule/LoginModule';
import NotesFullView from './modules/NotesFullView/NotesFullView';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path={Routes.LOGIN} component={LoginModule} />
          <Route path={Routes.DASHBOARD} component={DashboardModule} />
          <Route path={Routes.PRODUCTS} component={ProductFullList} />
          <Route path={Routes.NOTES} component={NotesFullView} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
