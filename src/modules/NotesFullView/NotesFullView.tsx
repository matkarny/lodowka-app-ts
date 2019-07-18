import * as React from 'react';
import FullView from '../../common/components/FullView/FullView';
import AddNoteComponent from "../../common/components/AddNoteComponent/AddNoteComponent"
import { store } from '../../store/storeConfigure'
import NoteLabel from '../../common/components/NoteLabel/NoteLabel'

export interface INotesFullViewProps {
}

export default class NotesFullView extends React.Component<INotesFullViewProps> {
  public render() {
    return (
      <div>
      <NoteLabel  date={"18/07/2019"} message={"aSaxqwXASxwqsadasdsadasdasdasd"} />
      </div>
    );
  }
}
