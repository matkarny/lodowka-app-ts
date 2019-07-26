import React from 'react';
import WeatherCard from './WeatherCard';
import { PreparedData } from '../../common/interfaces/WeatherInterfaces';
import WeatherService from './WeatherService';

export interface WeatherProps {}

interface WeatherState {
  data: PreparedData | null;
}

class WeatherWidgetView extends React.Component<WeatherProps, WeatherState> {
  interval = null;
  state: WeatherState = {
    data: null
  };

  async getData() {
    try {
      let data = await WeatherService.getWeatherData();
      this.setState({ data: data });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    this.getData();

    try {
      this.interval = setInterval(() => this.getData(), 60000);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    console.log('# current state #', this.state.data);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        {this.state.data ? (
          <WeatherCard
            icon={this.state.data.icon}
            description={this.state.data.description}
            temperature={this.state.data.temperature}
            wind={this.state.data.wind}
          />
        ) : (
          <WeatherCard icon="na" description="??" temperature="?? " wind={0} />
        )}
      </>
    );
  }
}

export default WeatherWidgetView;
