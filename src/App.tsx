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
    </Provider>
  );
};

export default App;
