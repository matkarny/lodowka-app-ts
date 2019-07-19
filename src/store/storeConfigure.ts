import { createStore, Action } from 'redux';
import { Product } from '../common/interfaces/Product';
import { saveState, loadState } from './globalLocalStorage';

const persistedStore = loadState();

export const store = createStore(stateReducer, persistedStore);

function stateReducer(state = persistedStore, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      // TO DO: Store must not accept 2 same products (same by position and id)
      return { products: [...state.products, action.text] };

    case 'DELETE_PRODUCT':
      return {
        products: state.products.filter(product => product.id !== action.text)
      };

    case 'POPULATE_PRODUCTS':
      return {
        products: action.data
      };

    default:
      return state;
  }
}

export function addProduct(data) {
  return store.dispatch({
    type: 'ADD_PRODUCT',
    text: data
  });
}

export function deleteProduct(productId) {
  return store.dispatch({
    type: 'DELETE_PRODUCT',
    text: productId
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

export function testPopulateProducts() {
  let productA: Product = {
    name: 'TRUSKAWKI',
    addedBy: 'USER1',
    expirationDate: { year: '2019', month: '6', day: '11' },
    tagPosition: { left: 400, top: 400 },
    id: 99,
    shownPopup: false
  };

  let productB: Product = {
    name: 'MLEKO',
    addedBy: 'USER2',
    expirationDate: { year: '2019', month: '11', day: '19' },
    tagPosition: { left: 530, top: 330 },
    id: 98,
    shownPopup: false
  };

  return store.dispatch({
    type: 'POPULATE_PRODUCTS',
    data: [productA, productB]
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
  addProduct,
  testPopulateProducts
};
