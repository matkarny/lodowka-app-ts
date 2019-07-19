import * as React from 'react';
import "./NotesWidget.scss"


import ListBtn from "../../common/components/ListBtn/ListBtn"
import ListLabel from "../../common/components/ListLabel/ListLabel"
import { store } from '../../store/storeConfigure'
import NoteLabel from "../../common/components/NoteLabel/NoteLabel"
import * as Routes from "../../common/constants/Routes"

export interface INotesWidgetProps {
}

export default class NotesWidget extends React.Component<INotesWidgetProps> {

  public render() {
    return (
          <div className="note-list-widget">
                <ListLabel labelCount={store.getState().notes.length} labelTxt={"notes"}>
                    <a href={Routes.NOTES}><ListBtn>VIEW ALL</ListBtn></a>
                 <ListBtn>+</ListBtn>
                </ListLabel>
                {store.getState().notes.slice(0,4).map(note => <NoteLabel shortText={true} date={note.date} message={note.message}/>)}
            </div>
    );
  }
  }

