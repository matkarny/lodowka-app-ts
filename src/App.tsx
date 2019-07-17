import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import {store} from './store/storeConfigure'

import DashboardModule from './modules/DashboardModule/DashboardModule';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Routes from '../src/common/constants/Routes';
import LoginModule from './modules/LoginModule/LoginModule';
import FridgeView from './modules/Fridge/FridgeView';
import ProductFullList from './modules/ProductFullList/ProductFullList';
import NotesModule from './modules/NotesModule/NotesModule'

const App: React.FC = () => {
  return (
      <div>
        <NotesModule />
      </div>

  );
};

export default App;
