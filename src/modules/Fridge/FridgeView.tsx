import React from 'react';
import io from 'socket.io-client';
import './Fridge.scss';
import { Coord } from '../../common/interfaces/WeatherInterfaces';

export interface FridgeViewProps {}

export interface FridgeViewState {
  src: string;
  nextId: number;
  product: {
    id: number;
    topValue: string;
    leftValue: string;
  };
}

class FridgeView extends React.Component<FridgeViewProps, FridgeViewState> {
  state = {
    src: '',
    nextId: 0,
    product: {
      id: 0,
      topValue: '',
      leftValue: ''
    }
  };
  getImageBase64() {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js';
    script.async = true;
    document.body.appendChild(script);

    var socket = io('http://10.254.0.40:3000');
    socket.on('image', image => {
      this.setState({ src: `data:image/jpeg;base64,${image}` });
    });
  }

  onClick = e => {
    e.preventDefault();
    const topValue = `${e.clientY - 25}px`;
    const leftValue = `${e.clientX - 25}px`;
    let product = { topValue, leftValue, id: this.state.nextId };
    console.log('# product #', product);
    this.setState({ product: product });
    this.setState({ nextId: this.state.nextId + 1 });
  };

  listProductTags = () => {
    const { leftValue, topValue } = this.state.product;
    return (
      this.state.product && (
        <div
          className="fridge__tag"
          style={{ position: 'relative', top: topValue, left: leftValue }}
        />
      )
    );
  };

  componentDidMount() {
    this.getImageBase64();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="fridge">
        <img
          src={this.state.src}
          id="image"
          className="fridge__image"
          onClick={this.onClick}
        />
        {this.listProductTags()}
      </div>
    );
  }
}

export default FridgeView;
