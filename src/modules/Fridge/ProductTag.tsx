import React from 'react';
import Popup from './Popup';
import './Popup.scss';
import './Fridge.scss';
import * as FRIDGE from '../../common/constants/FridgeConstants';

export interface ProductTagProps {}

export interface ProductTagState {
  showPopup: boolean;
}

class ProductTag extends React.Component<ProductTagProps, ProductTagState> {
  state = { showPopup: false };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    return (
      <div
        className="wrapper "
        onClick={this.togglePopup}
        style={{
          position: 'absolute',
          top: `350px`,
          left: `300px`,
          backgroundColor: `grey`
        }}
      >
        {this.state.showPopup ? (
          <Popup text="Close Me" closePopup={this.togglePopup} />
        ) : null}
      </div>
    );
  }
}

export default ProductTag;

/*
    return (
      <div className="product-tag">
        <div
          className="product-tag__wrapper "
          onClick={this.togglePopup}
          style={{
            position: 'absolute',
            top: `350px`,
            left: `300px`,
            backgroundColor: `grey`
          }}
        />

        {this.state.showPopup ? (
          <Popup text="Close Me" closePopup={this.togglePopup} />
        ) : null}
      </div>
    );
*/
