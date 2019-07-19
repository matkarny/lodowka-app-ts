import { createStore } from 'redux';

const initialState = {
    notes: []
}



export const store = createStore(stateReducer, initialState)

function stateReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_NOTE':
            return { notes: [...state.notes, action.note]}
        default:
            return state
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

<<<<<<< HEAD
export function dispatchAddNote(data) {
    return store.dispatch({
        type: 'ADD_NOTE', note:
            data
    })
}

export function getCurrentStore(){
return store.getState()
}


export default { dispatchAddImage, dispatchDeleteImage, getCurrentStore, dispatchAddNote, store }

//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
=======
export function getCurrentStore() {
  return store.getState();
}

export default {
  dispatchAddImage,
  dispatchDeleteImage,
  getCurrentStore
};

//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
// export interface Product {
//   name: string;
//   addedOn: { year: string; month: string; day: string };
//   addedBy: string;
//   tagPosLeft: number;
//   tagPosTop: number;
//   vitalityColor: 'grey';
// }

// const initialState = {
//   productsList: []
// };

// function products(state = initialState, action) {
//   switch (action.type) {
//     case 'ADD_PRODUCT':
//       return [...state, action];
//     default:
//       return state;
//   }
// }
