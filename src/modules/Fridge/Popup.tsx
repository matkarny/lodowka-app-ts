import React from 'react';

export interface PopupProps {
  text: string;
  closePopup: any;
}

export interface PopupState {
  stuff: string;
}

class Popup extends React.Component<PopupProps, PopupState> {
  state = { stuff: '' };
  render() {
    return (
      <div className="popup">
        <button className="popup__child" onClick={this.props.closePopup}>
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default Popup;

/*      
 <div className="product-tag__popup-inner">
          <button onClick={this.props.closePopup}>close me</button>
        </div> 
        */
