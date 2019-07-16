import React from 'react';
import './App.css';

import DashboardModule from './modules/DashboardModule/DashboardModule';
import YoutubeWidget from './modules/YoutubeWidget/YoutubeWidget';
import DrawingComponent from './common/components/DrawingComponent/DrawingComponent';
import TimeWidget from './modules/TimeWidget/TimeWidget';
import WeatherWidgetView from './modules/WeatherWidget/WeatherWidgetView';
import ProductExpireChecker from './actions/ProductExpireChecker/ProductExpireChecker';
import ProductLabel from "./common/components/ProductLabel/ProductLabel"

const App: React.FC = () => {
  return (
    <div className="App">
<ProductLabel productName={"Makaron"}> <ProductExpireChecker productDay={1} productMounth={6} productYear={2019} /> </ProductLabel>
<ProductLabel productName={"Ryż"}> <ProductExpireChecker productDay={1} productMounth={7} productYear={2019} /> </ProductLabel>
    

    </div>
  );
}

export default App;