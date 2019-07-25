import * as React from 'react';
import { format } from 'date-fns';
import './AddNoteComponent.scss';

import { connect } from 'react-redux';

import { ADD_NOTE } from '../../../store/actions/NotesActions';
import StoreType from '../../types/StoreType';
import { INote } from '../../interfaces/Notes';

export interface IAddNoteComponentProps extends Pick<StoreType, 'notes'> {
  addNote: (note: INote) => void;
}

const mapStateToProps = state => ({ notes: state.notes });
const mapDispatchToProps = dispatch => {
  return {
    addNote: (note: INote) => dispatch({ type: ADD_NOTE, payload: note })
  };
};

class AddNoteComponent extends React.Component<IAddNoteComponentProps, INote> {
  constructor(props) {
    super(props);
    this.state = {
      date: format(new Date(), 'DD/MM/YYYY'),
      message: '',
      author: 'Manio'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUpdate(){
    console.log(this.state)
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
    console.log(this.state)
  }

  handleSubmit(event) {
    this.props.addNote(this.state);
    event.preventDefault();
    this.setState({ message: "" });
    console.log(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="note-form">
        <label>
          <h2 className="note-form note-form__title">Your note: </h2>
          <textarea
            className="note-form__textarea"
            value={this.state.message}
            cols={30}
            rows={5}
            onChange={this.handleChange}
            required
          />
        </label>
        <input className="note-form__submit" type="submit" value="Add note" />
      </form>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNoteComponent);
