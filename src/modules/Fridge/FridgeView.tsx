import React from 'react';
import io from 'socket.io-client';
import './Fridge.scss';

interface Product {
  id: number;
  tagTopValue: string;
  tagLeftValue: string;
}
export interface FridgeViewProps {}

export interface FridgeViewState {
  src: string;
  nextId: number;
  product: {
    id: number;
    tagTopValue: string;
    tagLeftValue: string;
  };

  // tagList: [];
}

class FridgeView extends React.Component<FridgeViewProps, FridgeViewState> {
  state = {
    src: '',
    nextId: 0,
    product: {
      id: 0,
      tagTopValue: '',
      tagLeftValue: ''
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
    const tagTopValue = `${e.clientY - 25}px`;
    const tagLeftValue = `${e.clientX - 25}px`;
    let product = { tagTopValue, tagLeftValue, id: this.state.nextId };
    console.log('# clicked #', e.clientX, e.clientY);
    console.log('# product #', product);
    this.setState({ product: product });
    this.setState({ nextId: this.state.nextId + 1 });
  };

  listProductTags = () => {
    const { tagLeftValue, tagTopValue } = this.state.product;
    return (
      this.state.product && (
        <div
          className="fridge__tag"
          style={{ position: 'relative', top: tagTopValue, left: tagLeftValue }}
        />
      )
    );
  };

  componentDidMount() {
    this.getImageBase64();
  }

  componentDidUpdate() {
    //   console.log(this.state);
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
