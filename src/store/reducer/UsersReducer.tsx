import { ADD_USER } from '../actions/UsersActions';

export default function userReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];

    default:
      return state;
  }
}
