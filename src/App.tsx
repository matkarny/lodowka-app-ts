import React from 'react';
import './App.css';
import Dashboard from './modules/Dashboard/Dashboard';
import Note from './common/components/Note/Note';

const App: React.FC = () => {
  return (
    <div className="App">
      <Dashboard/>
    </div>
    
  );
}
 
export default App;
