import React from 'react';
import io from 'socket.io-client';
import './Fridge.scss';
import './ProductPopup.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import FridgeService from './FridgeService';
import ProductPopup from './ProductPopup';
import ProductTag from './ProductTag';
// import * as FRIDGESTORE from '../../store/FridgeStore';

interface ProductTagData {
  id: number;
  tagTopValue: string;
  tagLeftValue: string;
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
    let tagTopValue = `${e.pageY}`;
    let tagLeftValue = `${e.pageX}`;
    let product = {
      tagTopValue,
      tagLeftValue,
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
        <div
          key={product.id}
          id={product.id}
          className="fridge__tag"
          onClick={this.deleteThisTag}
          style={{
            position: 'absolute',
            top: `${product.tagTopValue - 30}px`,
            left: `${product.tagLeftValue - 30}px`,
            backgroundColor: product.vitalityColor
          }}
        />
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
          {this.listProductTags()}
        </div>

        {/*
       <div
          className="tooltip-wrapper"
          style={{
            position: 'absolute',
            top: `350px`,
            left: `300px`,
            backgroundColor: `${FRIDGE.PRODUCT_FRESH}`
          }}
        >
          <span
            className=" tool"
            data-tip={`<div>`}
            onClick={this.deleteThisTag}
          >
            tool
          </span>
        </div>
*/}

        <div>
          <ProductTag />
        </div>
      </div>
    );
  }
}

export default FridgeView;
