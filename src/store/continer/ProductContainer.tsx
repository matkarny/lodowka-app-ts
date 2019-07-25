import { connect } from 'react-redux';
import { IProduct } from '../../common/interfaces/Product';
import { ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCTS, UPDATE_PRODUCT} from "../actions/ProductActions"




const mapDispatchToProps = dispatch => {
    return {
      addProduct: (product: IProduct) => dispatch({ type: ADD_PRODUCT, payload: product }),
      deleteProduct: (productId: number) => dispatch({ type: DELETE_PRODUCT, payload: productId }),
      deleteProducts: () => dispatch({ type: DELETE_PRODUCTS}),
      updateProduct: (product: IProduct) => dispatch({ type: UPDATE_PRODUCT, payload: product }),

    }
  }

  // const mapDispatchToProps = dispatch => {
  //   return {
  //     addNote: (note) => dispatch({ type: ADD_NOTE, payload: note }), 
  //   }
  // }