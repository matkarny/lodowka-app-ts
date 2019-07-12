import React from 'react';
import io from 'socket.io-client';
import './Fridge.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';

interface ProductTag {
  id: number;
  tagTopValue: string;
  tagLeftValue: string;
  vitalityColor: string;
}

export interface FridgeViewProps {}
export interface FridgeViewState {
  src: string;
  nextId: number;
  productTagList: ProductTag[];
}

class FridgeView extends React.Component<FridgeViewProps, FridgeViewState> {
  state = {
    src: '',
    nextId: 0,
    productTagList: []
  };

  // Get image from Socket and send it to state
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

  // Set ProductTag on click and add it to List in state
  onClick = e => {
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
    let { productTagList } = this.state;
    productTagList.push(product);
    this.setState({ productTagList });
    // console.log('# clicked #', e.clientX, e.clientY, '# product #', product);
  };

  listProductTags = () => {
    const { productTagList } = this.state;
    return productTagList.map(product => {
      console.log('# product', product);
      return (
        <div
          key={product.id}
          className="fridge__tag"
          style={{
            position: 'absolute',
            top: `${product.tagTopValue - 25}px`, // tag is of size 50px/50px and it wouldn't be centered on click pos
            left: `${product.tagLeftValue - 25}px`,
            backgroundColor: product.vitalityColor
          }}
        />
      );
    });
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
