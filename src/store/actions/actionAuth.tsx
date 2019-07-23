import { store } from '../storeConfigure';

export function login(userId) {
  return store.dispatch({
    type: 'LOGIN',
    payload: userId
  });
}
