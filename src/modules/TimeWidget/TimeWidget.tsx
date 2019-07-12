import React, { Component } from 'react'
import './TimeWidget.scss'
type ClockState = {
    time: Date
}


export class TimeWidget extends Component<{}, ClockState> {

    currentDate() {
        this.setState({
            time: new Date()
        });
    }

    componentWillMount() {
        this.currentDate();
    }

    componentDidMount() {
        setInterval(() => this.currentDate(), 1000);
    }

    currentMounthInPl = () => {
        let mounthInPl = '';
        switch (this.state.time.getMonth())
          {
            case 0: mounthInPl = "stycznia"; break;
            case 1: mounthInPl = "lutego"; break;
            case 2: mounthInPl = "marca"; break;
            case 3: mounthInPl = "kwietnia"; break;
            case 4: mounthInPl = "maja"; break;
            case 5: mounthInPl = "czerwca"; break;
            case 6: mounthInPl = "lipca"; break;
            case 7: mounthInPl = "sierpnia"; break;
            case 8: mounthInPl = "września"; break;
            case 9: mounthInPl = "października"; break;
            case 10: mounthInPl = "listopada"; break;
            case 11: mounthInPl = "grudnia"; break;

            default:
                console.log('Unknown mounth')
        }
        return mounthInPl
    };
    
        
    dayOfWeek = () =>{
        const arrayOfNames=["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
     const currentDayInPl = arrayOfNames[this.state.time.getDay()]
     return currentDayInPl
 }
 

render() {
    return <div className='clock-widget'>
<div className='clock-widget__date'>{this.dayOfWeek()}, {this.state.time.getDate()} {this.currentMounthInPl()} {this.state.time.getFullYear()}</div>
<div className='clock-widget__time'>{this.state.time.getHours()}:{this.state.time.getMinutes()}</div>
    </div>

}
  };

export default TimeWidget