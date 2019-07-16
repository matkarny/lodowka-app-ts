import React from 'react';

export interface PopupProps {
  text: string;
  useWith();
  closePopup();
}

export interface PopupState {
  stuff: string;
}

class Popup extends React.Component<PopupProps, PopupState> {
  state = { stuff: '' };

  render() {
    return (
      <div className="popup">
        <div className="popup__inner">
          <button onClick={this.props.closePopup}>{this.props.text}</button>
          {this.props.useWith()}
        </div>
      </div>
    );
  }
}

export default Popup;
