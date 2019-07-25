import React from 'react';
import './App.css';

import { loadState, saveState } from './store/globalLocalStorage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combineReducers from './store/reducer/CombinedReducers';
import Session from './session/Session';

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
      <Session />
      {/* <Router onUpdate={() => window.scrollTo(0, 0)}>
        <div>
          <Route exact path={Routes.LOGIN} component={LoginModule} />
          <Route path={Routes.DASHBOARD} component={DashboardModule} />
          <Route path={Routes.PRODUCTS} component={ProductFullList} />
          <Route path={Routes.NOTES} component={NotesFullView} />
        </div>
      </Router> */}
    </Provider>
  );
};

export default App;
