import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { store } from './store/storeConfigure'

import DashboardModule from './modules/DashboardModule/DashboardModule';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Routes from '../src/common/constants/Routes';
import ProductFullList from './modules/ProductFullList/ProductFullList';
import LoginModule from './modules/LoginModule/LoginModule';
import UserComponent from './common/components/UserComponent/UserComponent';

const App: React.FC = () => {
  return (
    <UserComponent chosenAvatar={{
      chosenAvatar: 1
    }}
      chosenColor={{
        chosencolor: 1
      }}
      username="Halina"
      bigger={true} />
  );
};

export default App