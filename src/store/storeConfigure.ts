import { createStore, Action } from 'redux';
import { Product } from '../common/interfaces/Product';
import { saveState, loadState } from './globalLocalStorage';
const persistedStore = loadState();

export const store = createStore(stateReducer, persistedStore);

function stateReducer(state = persistedStore, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.note] };

    case 'ADD_PRODUCT':
      // TO DO: Store must not accept 2 same products (same by position and id)
      return { ...state, products: [...state.products, action.payload] };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload
        )
      };

    case 'DELETE_PRODUCTS':
      return { ...state, products: [] };

    case 'UPDATE_PRODUCT': {
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

export function addProduct(product: Product) {
  return store.dispatch({
    type: 'ADD_PRODUCT',
    payload: product
  });
}

export function deleteProduct(productId: number) {
  return store.dispatch({
    type: 'DELETE_PRODUCT',
    payload: productId
  });
}

export function deleteProducts() {
  return store.dispatch({
    type: 'DELETE_PRODUCTS'
  });
}

export function updateProduct(product: Product) {
  return store.dispatch({
    type: 'UPDATE_PRODUCT',
    payload: product
  });
}

export function dispatchAddNote(data) {
  return store.dispatch({
    type: 'ADD_NOTE',
    note: data
  });
}

export function dispatchAddImage(data) {
  return store.dispatch({
    type: 'ADD_IMAGE',
    text: data
  });
}

export function dispatchDeleteImage(data) {
  return store.dispatch({
    type: 'DELETE_IMAGE',
    text: data
  });
}

export function getCurrentStore() {
  return store.getState();
}

store.subscribe(() => {
  console.log('store has changed, new store:', store.getState());
  saveState(store.getState());
});

export default {
  dispatchAddImage,
  dispatchDeleteImage,
  getCurrentStore,
  store,
  deleteProduct,
  deleteProducts,
  addProduct,
  dispatchAddNote
};