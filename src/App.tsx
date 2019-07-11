import React from 'react';
import './App.css';

import DrawComponent from "./common/components/DrawingComponent/DrawingComponent"
import DashboardModule from './modules/DashboardModule/DashboardModule'
    
const App: React.FC = () => {
  return (
    <div >
    <DrawComponent />
    <DashboardModule />
   </div>
  );
}

export default App;
