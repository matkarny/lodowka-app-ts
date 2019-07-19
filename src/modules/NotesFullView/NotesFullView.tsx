import * as React from 'react';
import FullView from '../../common/components/FullView/FullView';
import AddNoteComponent from "../../common/components/AddNoteComponent/AddNoteComponent"
import MapNotesCompoent from '../../common/components/MapNotesComponent/MapNotesComponent';

export interface INotesFullViewProps {
}

export default class NotesFullView extends React.Component<INotesFullViewProps> {
  //mapOfNotes = store.getState().notes.map(note => <NoteLabel date={note.date} message={note.message} />)


  
  public render() {
    return (    
       <FullView 
       startAtFirst={true} 
       labelName={"Notes"} 
       firstButtonName={"Show all notes"} 
       secondButtonName={"Add new note"} 
       firstComponent={<MapNotesCompoent />} 
       secondComponent={<AddNoteComponent />} />
    );
  }
}

