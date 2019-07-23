import { Product } from '../../common/interfaces/Product';
import { store } from '../storeConfigure';

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

export default { addProduct, deleteProduct, deleteProducts, updateProduct };
