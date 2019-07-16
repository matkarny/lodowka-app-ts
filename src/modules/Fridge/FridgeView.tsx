import React from 'react';
import io from 'socket.io-client';
import './Fridge.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import ProductTag from './ProductTag';

interface ProductTagData {
  name: '';
  tagPosTop: number;
  tagPosLeft: number;
  vitalityColor: string;
  addedOn: {};
}

export interface FridgeViewProps {}

export interface FridgeViewState {
  src: any;
  nextId: number;
  productTags: ProductTagData[];
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
    let tagPosTop = `${e.pageY}`;
    let tagPosLeft = `${e.pageX}`;
    let product = {
      tagPosTop,
      tagPosLeft,
      name: '',
      vitalityColor: FRIDGE.PRODUCT_FRESH,
      addedOn: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      }
    };
    console.log(product);
    let { productTags } = this.state;
    productTags.push(product);
    this.setState({ productTags, nextId: this.state.nextId + 1 });
  };

  deleteThisTag = e => {
    e.preventDefault();
    const { productTags } = this.state;
    const newTagList = productTags.filter(tag => {
      return tag.id !== +e.target.id;
    });

    this.setState({ productTags: newTagList });
  };

  listProductTags = () => {
    const { productTags } = this.state;

    return productTags.map(product => {
      return (
        <li key={`key-${product.tagPosLeft + product.tagPosTop}`}>
          <ProductTag
            tagPosTop={product.tagPosTop - 30}
            tagPosLeft={product.tagPosLeft - 30}
          />
        </li>
      );
    });
  };

  componentDidMount() {
    this.getImageBase64();
  }

  render() {
    return (
      <div>
        <div className="fridge">
          <img
            src={this.state.src}
            id="image"
            className="fridge__image"
            onClick={this.setTag}
            alt="Fridge"
          />
          <ul className="fridge__list"> {this.listProductTags()}</ul>
        </div>
      </div>
    );
  }
}

export default FridgeView;
