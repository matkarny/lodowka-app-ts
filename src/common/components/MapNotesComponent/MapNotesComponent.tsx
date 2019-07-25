import * as React from 'react';
import NoteLabel from '../NoteLabel/NoteLabel';
import StoreType from '../../types/StoreType';
import { connect } from 'react-redux';
import { INote } from '../../interfaces/Notes';

export interface IMapNotesCompoentProps extends Pick<StoreType, 'notes'> {
  mapSize?: number;
  shortText: boolean;
  notes: INote[];
}

const mapStateToProps = state => ({ notes: state.notes });
class MapNotesCompoent extends React.Component<IMapNotesCompoentProps> {
  state = { arraySize: this.props.mapSize };

  render() {
    return (
      <div>
        {this.props.notes.slice(0, this.state.arraySize).map(note => (
          <NoteLabel
            shortText={this.props.shortText}
            date={note.date}
            message={note.message}
            author={note.author}
          />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MapNotesCompoent);
