import { createStore } from 'redux';
import { loadState, saveState } from "./globalLocalStorage"
 
const initialState = {
    notes: [
    ],
}

const persistedStore = loadState();


export const store = createStore(stateReducer,  persistedStore)

function stateReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_NOTE':
            return { notes: [...state.notes, action.note]}
        default:
            return state
    }
}

// export function dispatchAddImage(data) {
//   return store.dispatch({
//     type: 'ADD_IMAGE',
//     text: data
//   });
// }

// export function dispatchDeleteImage(data) {
//   return store.dispatch({
//     type: 'DELETE_IMAGE',
//     text: data
//   });
// }

export function dispatchAddNote(data) {
    return store.dispatch({
        type: 'ADD_NOTE', note: data
    })
}

store.subscribe(() => {
    console.log('store has changed, new store:', store.getState());
    saveState(store.getState());
  });

export default {dispatchAddNote, store }

// export default { dispatchAddImage, dispatchDeleteImage, dispatchAddNote, store }


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
