import { createStore } from 'redux';
import { loadState, saveState } from "./globalLocalStorage";

const persistedStore = loadState();
export const store = createStore(stateReducer, persistedStore)

function stateReducer(state = persistedStore, action) {
    switch (action.type) {
        case 'ADD_USER':
            state.users.id = action.text.id
            state.users.usersList.push(action.text);
            return state;
        case 'LOG_USER':
            state.loggedUser = action.payload
            return state;
        default:
            return state;
    }
}

export function addUser(data) {
    return store.dispatch({
        type: 'ADD_USER',
        payload: data
    });
}
export function logUser(data) {
    return store.dispatch({
        type: 'LOG_USER',
        payload: data
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
    addUser,
    dispatchDeleteUser,
    getCurrentStore
};

//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
