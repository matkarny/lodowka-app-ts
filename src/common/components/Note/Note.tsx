import React, { Component } from 'react'
import './Note.scss'


export interface NoteProps {
    date: string;
    description: string; 
}
 
export interface NoteState {
    
}
 
class Note extends React.Component<NoteProps, NoteState> {
    constructor(props: NoteProps) {
        super(props);
        
    }
    render() { 
        return ( 
        <div className="note">
            <div className="note__date">{this.props.date}</div>
            <div className="note__description">{this.props.description}</div>
        </div>  );
    }
}
 
export default Note;
