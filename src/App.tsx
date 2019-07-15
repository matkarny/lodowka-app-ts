import React from 'react';
import './App.css';

import DashboardModule from './modules/DashboardModule/DashboardModule';
import YoutubeWidget from './modules/YoutubeWidget/YoutubeWidget';
import DrawingComponent from './common/components/DrawingComponent/DrawingComponent';
import TimeWidget from './modules/TimeWidget/TimeWidget';
import WeatherWidgetView from './modules/WeatherWidget/WeatherWidgetView';
import ProductExpireChecker from './actions/ProductExpireChecker/ProductExpireChecker';

const App: React.FC = () => {
  return (
    <div>
<ProductExpireChecker productDay={17} productMounth={9} productYear={2019} />

    </div>
  );
}

export default App;