import * as React from 'react';
import { store } from '../../../store/storeConfigure'
import NoteLabel from '../NoteLabel/NoteLabel'
import { loadState , saveState} from "../../../store/globalLocalStorage"

export interface IMapNotesCompoentProps {
}

export default class MapNotesCompoent extends React.Component<IMapNotesCompoentProps> {
    componentDidMount () {
        setInterval(() =>  loadState(), 1000)
      }
      componentWillMount() {
        loadState();
      }

  public render() {
    return (
      <div>
        {store.getState().notes.map(note => <NoteLabel shortText={false} date={note.date} message={note.message} author={note.author}/>)}
      </div>
    );
  }
}
