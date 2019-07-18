import * as React from 'react';
import "./NoteLabel.scss"
export interface INoteLabelProps {
  date: any,
  message: any
}

export default class NoteLabel extends React.Component<INoteLabelProps> {
  public render() {

    return (
      <div className="note-label">
        <div className="note-label__date">{this.props.date}</div>
        <div className="note-label__date note-label__message">{this.props.message}</div>
      </div>
    );
  }
}
