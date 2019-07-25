import { combineReducers } from 'redux'
import productReducer from './ProductsReducer'
import notesReducer from './NotesReducer'
import usersReducer from './UsersReducer'

export default combineReducers({
    products: productReducer,
    notes: notesReducer,
    users: usersReducer,
})
