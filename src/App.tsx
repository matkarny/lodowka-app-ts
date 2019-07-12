import React from 'react';
import './App.css';
import DashboardModule from './modules/DashboardModule/DashboardModule';
import YoutubeWidget from './modules/YoutubeWidget/YoutubeWidget';
import DrawingComponent from './common/components/DrawingComponent/DrawingComponent';
import TimeWidget from './modules/TimeWidget/TimeWidget';

const App: React.FC = () => {
  return (
    <div>   
      <DashboardModule ><TimeWidget /></DashboardModule> 

    </div>
  );
}

export default App;