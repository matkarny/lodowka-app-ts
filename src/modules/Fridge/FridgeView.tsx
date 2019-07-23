import React from 'react';
import './Fridge.scss';
import FridgeService from './FridgeService';
import Loader from 'react-loader-spinner';
import Store from '../../store/storeConfigure';
import ProductTag from './ProductTag';
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

  componentDidMount() {
    new FridgeService(this.getFridgeImage).getImageBase64();
    this.setState({ products: Store.getCurrentStore().products });
  }

  componentDidUpdate() {
    console.log(this.state.products);
  }

  removeAll = () => {
    Store.deleteProducts();
    this.setState({ products: Store.getCurrentStore().products });
  };

  addProduct = e => {
    e.preventDefault();

    const tagPosition = {
      top: e.nativeEvent.layerY,
      left: e.nativeEvent.layerX
    };

    const expirationDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    };

    let product: Product = {
      name: 'PRODUCT',
      tagPosition,
      addedBy: 'USER X',
      expirationDate,
      id: +('' + expirationDate.day + tagPosition.left + tagPosition.top),
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
          <ProductTag
            product={product}
            togglePopup={this.togglePopup}
            removeProduct={this.removeProduct}
            shownPopup={product.shownPopup}
            updateProduct={this.updateProduct}
          />
        </li>
      );
    });
  };

  /* Function passed to FridgeService */
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

  updateProduct = (data: Product) => {
    console.log('Data', data);
    Store.deleteProduct(data.id);
    Store.addProduct(data);
    console.log(Store.getCurrentStore().products);
  };

  render() {
    return (
      <div>
        <div className="popup__actions">
          <button className="product-tag__delete" onClick={this.removeAll}>
            Remove all
          </button>
        </div>
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
