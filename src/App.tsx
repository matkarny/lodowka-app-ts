import React from 'react';
import './App.css';
import DashboardModule from './modules/DashboardModule/DashboardModule';
import WeatherWidgetView from './modules/WeatherWidget/WeatherWidgetView';
import YoutubeWidget from './modules/YoutubeWidget/YoutubeWidget';
import DrawingComponent from './common/components/DrawingComponent/DrawingComponent';

const App: React.FC = () => {
  return (
    <div>
      <DashboardModule>
        <DrawingComponent />
        <WeatherWidgetView />
        <YoutubeWidget />
      </DashboardModule>
    </div>
  );
};

export default App;
