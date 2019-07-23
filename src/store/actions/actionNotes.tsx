import { store } from '../storeConfigure';

function dispatchAddNote(data) {
  return store.dispatch({
    type: 'ADD_NOTE',
    note: data
  });
}

export default dispatchAddNote;
