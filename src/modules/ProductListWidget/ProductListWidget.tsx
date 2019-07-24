import * as React from 'react';
import ListLabel from '../../common/components/ListLabel/ListLabel';
import ListBtn from '../../common/components/ListBtn/ListBtn';
import './ProductListWidget.scss';
import * as Routes from '../../common/constants/Routes';
import { Link } from 'react-router-dom';
import MapProductsView from '../../common/components/MapProductsView/MapProductsView';
import { connect } from 'react-redux';
import StoreType from '../../common/types/StoreType';

export interface ProductListWidgetProps extends Pick<StoreType, 'products'> {}

const mapStateToProps = state => ({products: state.products})
class ProductListWidget extends React.Component<
  ProductListWidgetProps
> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="product-list-widget">
        <ListLabel
          labelCount={this.props.products.length}
          labelTxt={'Products'}
        >
          <Link
            to={{
              pathname: Routes.PRODUCTS,
              state: { startingAtFirst: false }
            }}
          >
            <ListBtn>VIEW ALL</ListBtn>
          </Link>
          <Link
            to={{ pathname: Routes.PRODUCTS, state: { startingAtFirst: true } }}
          >
            <ListBtn>+</ListBtn>
          </Link>
        </ListLabel>
       <MapProductsView arraySize={4} sortProducts={true} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductListWidget)