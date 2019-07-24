import React from 'react';
import './App.css';

import DashboardModule from './modules/DashboardModule/DashboardModule';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Routes from '../src/common/constants/Routes';
import ProductFullList from './modules/ProductFullList/ProductFullList';
import LoginModule from './modules/LoginModule/LoginModule';
import NotesFullView from './modules/NotesFullView/NotesFullView';

import { loadState, saveState } from './store/globalLocalStorage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combineReducers from './store/reducer/CombinedReducers';

const persistedStore = loadState();
const store = createStore(combineReducers, persistedStore);
window['getState'] = store.getState;

const App: React.FC = () => {
  store.subscribe(() => {
    console.log('store has changed, new store:', store.getState());
    saveState(store.getState());
  });

  return (
    <Provider store={store}>
      <Router onUpdate={() => window.scrollTo(0, 0)}>
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
