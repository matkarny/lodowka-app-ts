import { ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCTS} from "../actions/ProductActions"


export function productReducer (state =  [], action) {
    console.log(action, state);
    switch (action.type) {
      
      case ADD_PRODUCT:
        // TO DO: Store must not accept 2 same products (same by position and id)
        return [...state, action.payload];
  
      case DELETE_PRODUCT:
        return state.filter(
            product => product.id !== action.payload
          )
        ;
  
      case DELETE_PRODUCTS:
        return [];
  
      default:
        return state;
    }
  }
  
  export default productReducer