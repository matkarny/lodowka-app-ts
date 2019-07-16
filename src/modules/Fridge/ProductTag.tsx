import React from 'react';

export interface ProductTagProps {
  tagPosTop: number;
  tagPosLeft: number;
}

export interface ProductTagState {
  showPopup: boolean;
  productRegistered: boolean;
  popupModifier: string;
  productName: string;
}

class ProductTag extends React.Component<ProductTagProps, ProductTagState> {
  state = {
    showPopup: false,
    productRegistered: false,
    popupModifier: '',
    productName: ' '
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  setPopupModifier() {
    const clientHeight = document.documentElement.clientHeight;
    const diff = clientHeight - +this.props.tagPosTop;

    if (diff >= 395)
      this.setState({
        popupModifier: '--rotated'
      });
  }

  onChangeProductName = e => {
    this.setState({ productName: e.target.value });
  };

  registerProduct = () => {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Product name"
            onChange={this.onChangeProductName}
          />
          <input type="submit" value="Save product" formAction="/fridge" />
        </form>
      </div>
    );
  };

  componentDidMount() {
    this.setPopupModifier();
  }

  handleBlur = () => {
    console.log('blur');
    this.setState({ showPopup: false });
  };

  tagPopup = (exec, modifier: string) => {
    return (
      <div className={`popup${modifier}`} onBlur={this.handleBlur}>
        <div className="popup__inner">
          {exec()}
          <button onClick={this.togglePopup}>close</button>
          <button onClick={null}>delete (todo)</button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        className="product-tag"
        style={{
          position: 'absolute',
          top: `${this.props.tagPosTop}px`,
          left: `${this.props.tagPosLeft}px`,
          backgroundColor: `grey`
        }}
      >
        <button className="product-tag__circle " onClick={this.togglePopup} />

        {this.state.showPopup ? (
          <div>
            {this.tagPopup(this.registerProduct, this.state.popupModifier)}
          </div>
        ) : null}

        {this.state.productRegistered ? null : null}
      </div>
    );
  }
}

export default ProductTag;

{
  /* {this.state.showPopup ? (
          <Popup
            modifier={this.state.popupModifier}
            text="Close Me"
            togglePopup={this.togglePopup}
            showWith={this.registerProduct}
            handleBlur={this.handleBlur}
          />
        ) : null} */
}
