import React from 'react';
import './Fridge.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import ProductTag from './ProductTag';
import FridgeService from './FridgeService';

interface ProductTagData {
  name: '';
  tagPosTop: number;
  tagPosLeft: number;
  vitalityColor: string;
  addedOn: {};
  expireDate: Date;
}

export interface FridgeViewProps {}

export interface FridgeViewState {
  src: any;
  nextId: number;
  productTags: ProductTagData[];
  value: any;
}

class FridgeView extends React.Component<FridgeViewProps, FridgeViewState> {
  state = {
    src: '',
    nextId: 0,
    productTags: [],
    value: null
  };

  /* Set ProductTag on click and add it to List in state */
  setTag = e => {
    e.preventDefault();
    let tagPosTop = `${e.nativeEvent.layerY}`;
    let tagPosLeft = `${e.nativeEvent.layerX}`;
    let product = {
      id: this.state.nextId,
      tagPosTop,
      tagPosLeft,
      name: '',
      vitalityColor: FRIDGE.PRODUCT_FRESH,
      addedOn: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      },
      shown: true,
      expireDate: new Date()
    };

    let { productTags } = this.state;
    productTags.forEach(tag => {
      tag.shown = false;
    });

    productTags.push(product);
    this.setState({ productTags, nextId: this.state.nextId + 1 });
  };

  listProductTags = () => {
    const { productTags } = this.state;

    return productTags.map(product => {
      return (
        <li key={`key-${product.tagPosLeft + product.tagPosTop}`}>
          <ProductTag
            tagPosTop={product.tagPosTop - 30}
            tagPosLeft={product.tagPosLeft - 30}
            closePopup={this.closePopup}
            togglePopup={this.togglePopup}
            deleteTag={this.deleteTag}
            shown={product.shown}
            id={product.id}
          />
        </li>
      );
    });
  };

  getImg = (src: string) => {
    this.setState({ src });
  };

  /* Functions passed to ProductTag */
  deleteTag = (id: number) => {
    let productTags = this.state.productTags.filter(productTag => {
      return productTag.id !== id;
    });
    this.setState({ productTags });
  };

  closePopup = (id: number) => {
    let { productTags } = this.state;
    productTags.forEach(tag => {
      if (tag.id === id) tag.shown = false;
    });
    this.setState({ productTags });
  };

  togglePopup = (id: number) => {
    let { productTags } = this.state;
    productTags.forEach(tag => {
      if (tag.id === id) tag.shown = !tag.shown;
      else tag.shown = false;
    });
    this.setState({ productTags });
  };

  componentDidMount() {
    //  this.getImageBase64();
    new FridgeService(this.getImg).getImageBase64();
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
          <ul className="fridge__list">{this.listProductTags()}</ul>
        </div>
      </div>
    );
  }
}

export default FridgeView;
