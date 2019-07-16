import React from 'react';
import './App.css';

import DashboardModule from './modules/DashboardModule/DashboardModule';
import YoutubeWidget from './modules/YoutubeWidget/YoutubeWidget';
import DrawingComponent from './common/components/DrawingComponent/DrawingComponent';
import TimeWidget from './modules/TimeWidget/TimeWidget';
import WeatherWidgetView from './modules/WeatherWidget/WeatherWidgetView';
import ProductListWidget from './modules/ProductListWidget/ProductListWidget';

const App: React.FC = () => {
  return (
    <div className="App">
<ProductListWidget />
    

    </div>
  );
}

export default App;