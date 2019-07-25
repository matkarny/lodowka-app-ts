<<<<<<< HEAD
=======

>>>>>>> ba8ba3c567d6f5e9b0a072f6ec754cdb29f66c90
import { combineReducers } from 'redux';
import productReducer from './ProductsReducer';
import notesReducer from './NotesReducer';
import usersReducer from './UsersReducer';
import authReducer from './AuthReducer';

export default combineReducers({
  products: productReducer,
  notes: notesReducer,
  users: usersReducer,
  auth: authReducer
});
