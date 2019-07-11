import React from 'react';
import './App.css';
import WeatherWidgetView from './modules/WeatherWidget/WeatherWidgetView';
import FridgeView from './modules/Fridge/FridgeView';

const App: React.FC = () => {
  return (
    <div className="App">
      APP
      <WeatherWidgetView />
      <FridgeView />
    </div>
  );
};

export default App;
