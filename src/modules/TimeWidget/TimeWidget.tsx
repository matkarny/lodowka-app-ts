import React, { Component } from 'react'

type ClockState = {
    time: Date
  }


  export class Clock extends Component<{}, ClockState> {

    tick() {
        this.setState({
          time: new Date()
        });
      }

      componentWillMount() {
        this.tick();
      }

      componentDidMount() {
        setInterval(() => this.tick(), 1000);
      }

      
    render() {
        return <p>The current time is {this.state.time.toLocaleTimeString()}</p>
    }
}
