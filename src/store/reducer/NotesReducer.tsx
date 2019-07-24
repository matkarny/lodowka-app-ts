import { ADD_NOTE } from "../actions/NotesActions"

function notesReducer(state = {notes:[]}, action) {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
  }
}   

export default notesReducer