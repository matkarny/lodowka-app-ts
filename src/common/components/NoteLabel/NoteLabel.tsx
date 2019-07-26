import * as React from 'react';
import "./NoteLabel.scss"
import { connect } from 'react-redux';



export interface INoteLabelProps {
  date: any,
  message: any,
  author?: string,
  shortText: boolean 
}


const mapStateToProps = state => ({notes: state.notes})


class NoteLabel extends React.Component<INoteLabelProps> {

  state = {author: "",
            text: this.props.message}

  componentDidMount() {
  if(this.props.author){
    return this.setState({
      author: "Autor: "+ this.props.author
    })}
if(this.props.message.length<60 && this.props.shortText){
  return this.setState({
    text: this.props.message.substring(0,60) + "..."
  })}


}


    
  public render() {



    return (
      <div className="note-label">
       <div className="note-label__note-header">
      <div className="note-label__date">{this.props.date}</div>
       <div className="note-label__author">{this.state.author}</div>
       </div> 
        <div className="note-label__date note-label__message">{this.state.text}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NoteLabel)