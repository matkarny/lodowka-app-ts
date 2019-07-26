import React from 'react';
import './Fridge.scss';
import FridgeService from './FridgeService';
import Loader from 'react-loader-spinner';
import ProductTag from './ProductTag';
import { IProduct } from '../../common/interfaces/Product';
import { ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCTS, UPDATE_PRODUCT} from "../../store/actions/ProductActions"
import { connect } from 'react-redux';
import StoreType from '../../common/types/StoreType';
import { expirationColorChecker } from '../../common/components/ProductExpireChecker/ProductExpireService';

interface ProductTagData {
  name: '';
  tagPosTop: number;
  tagPosLeft: number;
  vitalityColor: string;
  addedOn: {};
  expireDate: Date;
}

export interface FridgeViewProps extends Pick<StoreType, 'products'> {
    addProduct, 
    deleteProduct,
    deleteProducts,
    updateProduct,
}

export interface FridgeViewState {
  src: any;
  nextId: number;
  productTags: ProductTagData[];
  value: any;
  products: IProduct[];
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: (product: IProduct) => dispatch({ type: ADD_PRODUCT, payload: product }),
    deleteProduct: (productId: number) => dispatch({ type: DELETE_PRODUCT, payload: productId }),
    deleteProducts: () => dispatch({ type: DELETE_PRODUCTS}),
    updateProduct: (product: IProduct) => dispatch({ type: UPDATE_PRODUCT, payload: product }),

  }
}


const mapStateToProps = state => ({products: state.products})

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
    this.setState({ products: this.props.products });
  }

  componentDidUpdate() {
    console.log(this.state.products);
    this.props.products.map(product => product.vitalityColor = expirationColorChecker(product.expirationDate.day, product.expirationDate.month, product.expirationDate.year));
  }

  removeAll = () => {
    this.props.deleteProducts();
    this.setState({ products: this.props.products });
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
const vitalityColorChecker = expirationColorChecker(expirationDate.day, expirationDate.month, expirationDate.year)
    let product: IProduct = {
      name: 'PRODUCT',
      tagPosition,
      addedBy: 'USER X',
      expirationDate,
      id: +('' + expirationDate.day + tagPosition.left + tagPosition.top),
      shownPopup: true,
      vitalityColor:  vitalityColorChecker,
    };

    let { products } = this.props;
    products.forEach(prod => {
      prod.shownPopup = false;
      console.log(prod.expirationDate)
      prod.vitalityColor = expirationColorChecker(prod.expirationDate.day, prod.expirationDate.month, prod.expirationDate.year)
console.log(prod.vitalityColor)    
    });
    
    
    this.props.addProduct(product);
    this.setState({
      nextId: this.state.nextId + 1,
      products: this.props.products
    });
  };

  listProductTags = () => {
    return this.props.products.map(product => {
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
    this.props.deleteProduct(id);
    this.setState({ products: this.props.products });
  };

  togglePopup = (id: number) => {
    let { products } = this.props;
    products.forEach(product => {
      if (product.id === id) product.shownPopup = !product.shownPopup;
      else product.shownPopup = false;
      product.vitalityColor = expirationColorChecker(product.expirationDate.day, product.expirationDate.month, product.expirationDate.year)
    });

    this.setState({ products });
  };

  updateProduct = (data: IProduct) => {
    console.log('Data', data);
    this.props.deleteProduct(data.id);
    this.props.addProduct(data);
    console.log(this.props.products);
  };

  render() {
    return (
      <div>
        <div className="popup__actions">
          {/* <button className="product-tag__delete" onClick={this.removeAll}>
            Remove all
          </button> */}
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

          <ul className="fridge__list">{this.state.src && this.listProductTags()}</ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FridgeView);