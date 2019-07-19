import { createStore } from 'redux';
import { loadState, saveState } from "./globalLocalStorage";

const persistedStore = loadState();
export const store = createStore(stateReducer, persistedStore)

function stateReducer(state = persistedStore, action) {
    switch (action.type) {
        case 'ADD_USER':
            state.users.push(action.text);

            return state;
        default:
            return state;
    }
}

export function dispatchAddUser(data) {
    return store.dispatch({
        type: 'ADD_USER',
        text: data
    });
}

export function dispatchDeleteUser(data) {
    return store.dispatch({
        type: 'DELETE_USER',
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
    dispatchAddUser,
    dispatchDeleteUser,
    getCurrentStore
};

//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
