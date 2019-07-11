import { createStore } from 'redux'

const initialState = {

    imgData: [],
}

const store = createStore(stateReducer, initialState)


function stateReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_IMAGE':
            return { imgData: [...state.imgData, action.text] }
        case 'DELETE_IMAGE':
            return { imgData: state.imgData.filter(image => image !== action.text)}
        default:
            return state
    }
}

export function dispatchAddImage(data) {
    return store.dispatch({
        type: 'ADD_IMAGE', text:
            data
    })
}

export function dispatchDeleteImage(data) {
    return store.dispatch({
        type: 'DELETE_IMAGE', text:
            data
    })
}

export function getCurrentStore(){
return store.getState()
}


export default { dispatchAddImage, dispatchDeleteImage, getCurrentStore }

//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e