import * as React from 'react';
import { format } from 'date-fns';
import './AddNoteComponent.scss';
import dispatchAddNote from '../../../store/actions/actionNotes'; //'../../../store/storeConfigure';
import { store } from '../../../store/storeConfigure';
import { saveState, loadState } from '../../../store/globalLocalStorage';

export interface IAddNoteComponentProps {}

interface IState {
  date: any;
  message: string;
  author: string;
}

export default class AddNoteComponent extends React.Component<
  IAddNoteComponentProps,
  IState
> {
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

  componentDidMount() {
    loadState();
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    dispatchAddNote(this.state);
    // store.subscribe(() => {
    //   saveState(store.getState());
    // });
    event.preventDefault();
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
