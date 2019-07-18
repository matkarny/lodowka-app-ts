import * as React from 'react';
import FullView from '../../common/components/FullView/FullView';
import AddNoteComponent from "../../common/components/AddNoteComponent/AddNoteComponent"
import { store } from '../../store/storeConfigure'
export interface INotesFullViewProps {
}

export default class NotesFullView extends React.Component<INotesFullViewProps> {
  public render() {
    return (
        <FullView startAtFirst={true} labelName={"Notes"} firstButtonName={"Show all notes"} secondButtonName={"Add new note"} firstComponent={<button > Store </button>} secondComponent={<AddNoteComponent />} />
    );
  }
}
