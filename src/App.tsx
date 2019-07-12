import React from 'react';
import './App.css';
import DashboardModule from './modules/DashboardModule/DashboardModule';
import YoutubeWidget from './modules/YoutubeWidget/YoutubeWidget';
import DrawingComponent from './common/components/DrawingComponent/DrawingComponent';

const App: React.FC = () => {
  return (
    <div>    
      <DashboardModule> 
        <DrawingComponent />
        <YoutubeWidget />
      </DashboardModule>

    </div>
  );
}

export default App;