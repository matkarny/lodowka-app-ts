import { ADD_NOTE } from "../actions/NotesActions"

export default function notesReducer(state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, action.payload];
      
      default:
        return state;
    }  
}   
