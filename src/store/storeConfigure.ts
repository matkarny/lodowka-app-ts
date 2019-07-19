import { createStore } from 'redux'
import { object, array } from 'prop-types';

const initialState = {

    users: [],
}

export const store = createStore(stateReducer, initialState)


function stateReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return { users: [...state.users, action.user] }
        default:
            return state
    }
}

export function dispatchAddUser(data) {
    return store.dispatch({
        type: 'ADD_USER', user:
            data
    })
}

export function dispatchDeleteImage(data) {
    return store.dispatch({
        type: 'DELETE_IMAGE', text:
            data
    })
}

export function getCurrentStore() {
    return store.getState()
}


export default { dispatchAddUser, getCurrentStore, store }

//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e