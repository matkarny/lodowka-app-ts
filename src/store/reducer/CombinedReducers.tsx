import { combineReducers } from 'redux'
import notesReducer from "./NotesReducer"
import productReducer from './ProductsReducer'

export default combineReducers({
    notesReducer,
    // productReducer
})
