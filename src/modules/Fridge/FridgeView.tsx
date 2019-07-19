import React from 'react';
import './Fridge.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import ProductTag from './ProductTag';
import FridgeService from './FridgeService';
import Loader from 'react-loader-spinner';
import Store from '../../store/storeConfigure';
import ProductTagNEW from './ProductTagNEW';
import { Product } from '../../common/interfaces/Product';

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
  products: Product[];
}

class FridgeView extends React.Component<FridgeViewProps, FridgeViewState> {
  state = {
    src: '',
    nextId: 0,
    productTags: [],
    value: null,
    products: []
  };

  /* Set ProductTag on click and add it to List in state */
  addProduct = e => {
    e.preventDefault();
    const tagPosition = {
      top: e.nativeEvent.layerY,
      left: e.nativeEvent.layerX
    };

    const expirationDate = {
      year: '' + new Date().getFullYear(),
      month: '' + (new Date().getMonth() + 1),
      day: '' + new Date().getDate()
    };
    let product: Product = {
      name: 'PRODUCT',
      //  tagPosition: { top: +tagPosTop, left: +tagPosLeft },
      tagPosition,
      addedBy: 'USER X',
      // expirationDate: { year, month, day },
      expirationDate,
      id: this.state.nextId,
      shownPopup: true
    };

    let { products } = this.state;
    products.forEach(prod => {
      prod.shownPopup = false;
    });

    Store.addProduct(product);
    this.setState({
      nextId: this.state.nextId + 1,
      products: Store.getCurrentStore().products
    });
  };

  listProductTags = () => {
    return this.state.products.map(product => {
      return (
        <li key={`key-${product.tagPosition.left + product.tagPosition.top}`}>
          <ProductTagNEW
            product={product}
            togglePopup={this.togglePopup}
            removeProduct={this.removeProduct}
            shownPopup={product.shownPopup}
          />
        </li>
      );
    });
  };

  getFridgeImage = (src: string) => {
    this.setState({ src });
  };

  /* Functions passed to ProductTag */
  removeProduct = (id: number) => {
    Store.deleteProduct(id);
    this.setState({ products: Store.getCurrentStore().products });
  };

  togglePopup = (id: number) => {
    let { products } = this.state;
    products.forEach(product => {
      if (product.id === id) product.shownPopup = !product.shownPopup;
      else product.shownPopup = false;
    });

    this.setState({ products });
  };

  componentDidMount() {
    new FridgeService(this.getFridgeImage).getImageBase64();
    Store.testPopulateProducts();
    this.setState({ products: Store.getCurrentStore().products });
  }

  render() {
    return (
      <div>
        <div className="fridge">
          {this.state.src ? (
            <img
              src={this.state.src}
              id="image"
              className="fridge__image"
              onClick={this.addProduct}
              alt="Fridge"
            />
          ) : (
            <div className="fridge__loader">
              <Loader
                type="Triangle"
                color="#00C3FF"
                height="100"
                width="100"
              />
              LOADING FRIDGE IMAGE
            </div>
          )}

          <ul className="fridge__list">{this.listProductTags()}</ul>
        </div>
      </div>
    );
  }
}

export default FridgeView;
