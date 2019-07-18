import { createStore } from 'redux';
import * as LOCALSTORAGE from './localStorage';
import throttle from 'lodash';

const initialState = {
  fridgeSrc: ''
};

//const store = createStore(stateReducer, initialState);
const persistedFridge = LOCALSTORAGE.loadLocalStorage();
const store = createStore(stateReducer, persistedFridge);
store.subscribe(() => {
  LOCALSTORAGE.saveLocalStorage({ fridgeSrc: store.getState().fridgeSrc });
});

function stateReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FRIDGE_IMG':
      return { fridgeSrc: action.text };
    default:
      return state;
  }
}

export function dispatchFridge(data) {
  setInterval(() => {
    console.log('DISPATCHING FRIDGE');
    return store.dispatch({
      type: 'ADD_FRIDGE_IMG',
      text: data
    });
  }, 10000);
}

export function getCurrentStore() {
  return store.getState();
}

export default {
  dispatchFridge,
  getCurrentStore
};

//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
