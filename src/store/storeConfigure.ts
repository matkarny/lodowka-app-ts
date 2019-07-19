import { createStore, Action } from 'redux';
import { Product } from '../common/interfaces/Product';

const initialState = {
  // products: []
  products: []
};

export const store = createStore(stateReducer, initialState);

function stateReducer(state = initialState, action) {
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

export function testPopulateProducts() {
  let productA: Product = {
    name: 'GOŁĄBKI',
    addedBy: 'USER1',
    expirationDate: { year: '2019', month: '6', day: '11' },
    tagPosition: { left: 400, top: 600 },
    id: 99,
    shownPopup: false
  };

  let productB: Product = {
    name: 'MIELONE',
    addedBy: 'USER2',
    expirationDate: { year: '2019', month: '11', day: '19' },
    tagPosition: { left: 530, top: 530 },
    id: 98,
    shownPopup: false
  };

  return store.dispatch({
    type: 'POPULATE_PRODUCTS',
    data: [productA, productB]
  });
}

export function addProduct(data) {
  console.log(data);
  return store.dispatch({
    type: 'ADD_PRODUCT',
    text: data
  });
}

export function deleteProduct(productId) {
  console.log('REDUX', productId);
  return store.dispatch({
    type: 'DELETE_PRODUCT',
    text: productId
  });
}

export function editProduct(data) {
  return store.dispatch({ type: 'EDIT_PRODUCT_NAME', text: data });
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

export default {
  dispatchAddImage,
  dispatchDeleteImage,
  getCurrentStore,
  store,
  deleteProduct,
  addProduct,
  testPopulateProducts
};
