import React from 'react';
import io from 'socket.io-client';
import './Fridge.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import FridgeService from './FridgeService';

interface ProductTag {
  id: number;
  tagTopValue: string;
  tagLeftValue: string;
  vitalityColor: string;
}

export interface FridgeViewProps {}
export interface FridgeViewState {
  src: any;
  nextId: number;
  productTags: ProductTag[];
}

class FridgeView extends React.Component<FridgeViewProps, FridgeViewState> {
  state = {
    src: '',
    nextId: 0,
    productTags: []
  };

  // Get image from Socket and send it to state
  getImageBase64() {
    var socket = io(FRIDGE.SOCKET_ADDRESS);
    socket.on('image', image => {
      const src = `data:image/jpeg;base64,${image}`;
      this.setState({ src });
    });
  }

  // Set ProductTag on click and add it to List in state
  setTag = e => {
    e.preventDefault();
    let tagTopValue = `${e.clientY}`;
    let tagLeftValue = `${e.clientX}`;
    let product = {
      tagTopValue,
      tagLeftValue,
      id: this.state.nextId,
      vitalityColor: FRIDGE.PRODUCT_FRESH
    };
    this.setState({ nextId: this.state.nextId + 1 });
    let { productTags } = this.state;
    productTags.push(product);
    this.setState({ productTags });
  };

  listProductTags = () => {
    const { productTags } = this.state;
    return productTags.map(product => {
      return (
        <div
          key={product.id}
          className="fridge__tag"
          style={{
            position: 'absolute',
            top: `${product.tagTopValue - 5}px`,
            left: `${product.tagLeftValue - 30}px`,
            backgroundColor: product.vitalityColor
          }}
        />
      );
    });
  };

  componentDidMount() {
    this.getImageBase64();
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="fridge">
        <img
          src={this.state.src}
          id="image"
          className="fridge__image"
          onClick={this.setTag}
          alt="Fridge"
        />
        {this.listProductTags()}
      </div>
    );
  }
}

export default FridgeView;
