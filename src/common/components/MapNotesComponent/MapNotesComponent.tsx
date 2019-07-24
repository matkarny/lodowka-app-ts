import * as React from 'react';
import { store } from '../../../store/storeConfigure'
import NoteLabel from '../NoteLabel/NoteLabel'
import { loadState } from "../../../store/globalLocalStorage"

export interface IMapNotesCompoentProps {
  mapSize?: number
  shortText: boolean
}

export default class MapNotesCompoent extends React.Component<IMapNotesCompoentProps> {

  state = { arraySize: this.props.mapSize

  } 

    componentDidMount () {
        setInterval(() =>  loadState(), 1000)
        console.log(typeof store.getState().notes)

      }
      componentWillMount() {
        loadState();
      }


render() {
    return (
      <div>
        {store.getState().notes.slice(0, this.state.arraySize).map(note => <NoteLabel shortText={this.props.shortText} date={note.date} message={note.message} author={note.author}/>)}
      </div>
    );
  }
}
