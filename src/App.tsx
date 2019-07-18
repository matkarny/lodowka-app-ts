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
import NotesWidget from './modules/NotesWidget/NotesWidget'
import FullView from './common/components/FullView/FullView';
import AllProductsComponent from './common/components/BasicComponent/AllProductsComponent/AllProductsComponent';
import AddNoteComponent from './common/components/AddNoteComponent/AddNoteComponent';
import FullNotesView from './modules/NotesFullView/NotesFullView'
import NoteLabel from './common/components/NoteLabel/NoteLabel';

const App: React.FC = () => {
  return (
      <div>
        <FullNotesView />
      </div>

  );
};

export default App;
