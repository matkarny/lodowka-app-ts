import * as React from 'react';
import { format } from 'date-fns';
import "./AddNoteComponent.scss"

export interface IAddNoteComponentProps {
}

interface IState {
    date: any,
    message: string,
  }

export default class AddNoteComponent extends React.Component<IAddNoteComponentProps, IState> {

    constructor(props) {
        super(props);
        this.state = {
            date: format(new Date(),'DD/MM/YYYY'),
            message: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({message: event.target.value});
      }
    
      handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit} className="note-form">
            <label>
              <h2 className="note-form__title">Note: </h2>
              <textarea className="note-form__textarea" value={this.state.message} cols={30} rows={5} onChange={this.handleChange} required/>
            </label>
            <input className="note-form__submit" type="submit" value="Add note" />
          </form>
        );
      }
    }