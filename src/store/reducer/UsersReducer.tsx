import { ADD_USER } from "../actions/UsersActions"
import { StoreType } from '../../common/types/StoreType'


export default function usersReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];

    default:
      return state;
  }
}   
