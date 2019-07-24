import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/storeConfigure';
import Auth from './session/Auth';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
};

export default App;
