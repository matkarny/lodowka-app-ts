import { ADD_DRAWING, DELETE_DRAWING, DELETE_DRAWINGS } from "../actions/DrawingActions"


export function drawingReducer(state = [], action) {
  console.log(action, state);
  switch (action.type) {

    case ADD_DRAWING:
      // TO DO: Store must not accept 2 same products (same by position and id)
      return [...state, action.payload];

    case DELETE_DRAWING:
      return state.filter(
        drawing => drawing.id !== action.payload
      )
        ;

    case DELETE_DRAWINGS:
      return [];

    default:
      return state;
  }
}

export default drawingReducer
