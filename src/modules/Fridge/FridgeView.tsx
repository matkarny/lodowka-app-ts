import React from 'react';
import io from 'socket.io-client';
import './Fridge.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import ProductTag from './ProductTag';

interface ProductTagData {
  id: number;
  tagPosTop: string;
  tagPosLeft: string;
  vitalityColor: string;
  added: {};
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
      id: this.state.nextId,
      vitalityColor: FRIDGE.PRODUCT_FRESH,
      added: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), // '0' - styczen
        day: new Date().getDate()
      }
    };

    this.setState({ nextId: this.state.nextId + 1 });
    let { productTags } = this.state;
    productTags.push(product);
    this.setState({ productTags });
  };

  deleteThisTag = e => {
    e.preventDefault();
    const { productTags } = this.state;
    const newTagList = productTags.filter(tag => {
      return tag.id !== +e.target.id;
    });
    console.log(newTagList);
    this.setState({ productTags: newTagList });
  };

  listProductTags = () => {
    const { productTags } = this.state;

    return productTags.map(product => {
      return (
        <li key={`key-${product.tagPosLeft + product.tagPosTop}`}>
          <div
            id={product.id}
            className="fridge__tag"
            onClick={this.deleteThisTag}
            style={{
              position: 'absolute',
              top: `${product.tagPosTop - 30}px`,
              left: `${product.tagPosLeft - 30}px`,
              backgroundColor: product.vitalityColor
            }}
          />
        </li>
      );
    });
  };

  componentDidMount() {
    this.getImageBase64();
    //FridgeService.getImageBase64();
  }

  componentDidUpdate() {}

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
          <ul> {this.listProductTags()}</ul>
        </div>

        <div>
          <ProductTag top="150px" left="350px" />
          <ProductTag top="350px" left="550px" />
        </div>
      </div>
    );
  }
}

export default FridgeView;
