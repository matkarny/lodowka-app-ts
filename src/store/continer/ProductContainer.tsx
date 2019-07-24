import { connect } from 'react-redux';
import { Product } from '../../common/interfaces/Product';
import { ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCTS, UPDATE_PRODUCT} from "../actions/ProductActions"




const mapDispatchToProps = dispatch => {
    return {
      addProduct: (product: Product) => dispatch({ type: ADD_PRODUCT, payload: product }),
      deleteProduct: (productId: number) => dispatch({ type: DELETE_PRODUCT, payload: productId }),
      deleteProducts: () => dispatch({ type: DELETE_PRODUCTS}),
      updateProduct: (product: Product) => dispatch({ type: UPDATE_PRODUCT, payload: product }),

    }
  }