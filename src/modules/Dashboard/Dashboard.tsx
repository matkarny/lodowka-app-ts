import React, { Component } from 'react'
import '../../common/components/Note/Note'
import './Dashboard.scss'




export interface DashboardProps {
  
}
 
export interface DashboardState {
  
}
 
class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    
  }
  render() { 
    return ( 
      <div className='dashboard'>
        
        <div className='dashboard__top'>
          <div className='top-item'>tu będzie component z datą</div>
        </div>
        <div className='dashboard__top'>
          <div className='top-item'>tu będzie component z button</div>
        </div>
        <div className='dashboard__widget'>
          <div className='widget-item'>tu będzie component Drawing</div>
         
          </div>
        <div className='dashboard__widget'>
          <div className='widget-item'>tu będzie widget latest activites
          </div>
        </div>
        <div className='dashboard__widget'>
          <div className='widget-item'>tu będzie widget products</div>
        </div>
        <div className='dashboard__widget'>
          <div className='widget-item'>tu będzie widget YT i weather</div>
        </div>
        <div className='dashboard__widget'>tu będzie  pusty </div>
        <div className='dashboard__widget'>
          <div className='widget-item'>tu będzie widget notes</div>
        </div>
        
      </div>
      
      );
  }
}
 
export default Dashboard;