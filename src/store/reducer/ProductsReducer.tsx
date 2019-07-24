import { ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCTS, UPDATE_PRODUCT} from "../actions/ProductActions"
import { StoreType } from '../../common/types/StoreType'



export function productReducer (state = {} as StoreType, action) {
    switch (action.type) {

      case ADD_PRODUCT:
        // TO DO: Store must not accept 2 same products (same by position and id)
        return { ...state, products: [...state.products, action.payload] };
  
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(
            product => product.id !== action.payload
          )
        };
  
      case DELETE_PRODUCTS:
        return { ...state, products: [] };
  
      case UPDATE_PRODUCT: {
        let newProducts = state.products;
        newProducts.forEach(element => {
          if (element.id === action.payload.id) {
            console.log('TO UPDATE');
          }
        });
      }
  
      default:
        return state;
    }
  }
  
  export default productReducer
