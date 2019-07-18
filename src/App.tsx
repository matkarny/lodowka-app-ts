import React from 'react'
import { Provider } from 'react-redux'
import {store} from './store/storeConfigure'

import DashboardModule from './modules/DashboardModule/DashboardModule';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Routes from '../src/common/constants/Routes';
import LoginModule from './modules/LoginModule/LoginModule';
import FridgeView from './modules/Fridge/FridgeView';
import ProductFullList from './modules/ProductFullList/ProductFullList';
import NotesModule from './modules/NotesModule/NotesModule'
import FullView from './common/components/FullView/FullView';
import AllProductsComponent from './common/components/BasicComponent/AllProductsComponent/AllProductsComponent';
import AddNoteComponent from './common/components/AddNoteComponent/AddNoteComponent';

const App: React.FC = () => {
  return (
      <div>
        <AddNoteComponent />
        {/* <FullView labelName={"Dupa"} startAtFirst={true} firstButtonName={"1"} secondButtonName={"2"} firstComponent={<AllProductsComponent />} secondComponent={<FridgeView />}/> */}
      </div>

  );
};

export default App;
