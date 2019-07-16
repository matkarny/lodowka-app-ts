import React from 'react';
import Popup from './Popup';
import './Popup.scss';
import './Fridge.scss';

export interface ProductTagProps {
  top: string;
  left: string;
}

export interface ProductTagState {
  showPopup: boolean;
}

class ProductTag extends React.Component<ProductTagProps, ProductTagState> {
  state = { showPopup: false };

  togglePopup = () => {
    console.log('toggle');
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  closePopup = () => {
    this.setState({ showPopup: false });

    console.log(this.state.showPopup);
  };

  showPopup = () => {
    this.setState({ showPopup: true });
  };

  registerProduct() {
    return (
      <div>
        fghafgs
        <form>
          <input type="text" placeholder="input name" />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div
        className="product-tag"
        style={{
          position: 'absolute',
          top: `${this.props.top}`,
          left: `${this.props.left}`,
          backgroundColor: `grey`
        }}
      >
        <div className="product-tag__button " onClick={this.togglePopup} />
        {this.state.showPopup ? (
          <Popup
            text="Close Me"
            closePopup={this.closePopup}
            useWith={this.registerProduct}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductTag;
