import { combineReducers } from 'redux'
import productReducer from './ProductsReducer'
import notesReducer from './NotesReducer'

export default combineReducers({
    products: productReducer,
    notes: notesReducer
})
