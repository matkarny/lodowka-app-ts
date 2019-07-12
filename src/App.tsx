import React from 'react';
import './App.css';
import DashboardModule from './modules/DashboardModule/DashboardModule';
import WeatherWidgetView from './modules/WeatherWidget/WeatherWidgetView';
import YoutubeWidget from './modules/YoutubeWidget/YoutubeWidget';
import DrawingComponent from './common/components/DrawingComponent/DrawingComponent';
import FridgeView from './modules/Fridge/FridgeView';

const App: React.FC = () => {
  return (
    <div>
      <DashboardModule>
        <FridgeView />
      </DashboardModule>
    </div>
  );
};

export default App;
