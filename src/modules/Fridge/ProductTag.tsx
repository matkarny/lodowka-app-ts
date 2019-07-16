import React from 'react';

export interface ProductTagProps {
  tagPosTop: number;
  tagPosLeft: number;
  closePopup();
  openPopup();
}
/*
TO DO: POPUPY:
1. ALBO Z TEGO POZIOMU EVENT.TARGET POROWNOAC CZY KLIKNIETY CZY OD RODZICA/DZIECKA
2. PRZENIESC TO DO FRIDGEVIEW
*/
export interface ProductTagState {
  showPopup: boolean;
  showRegister: boolean;
  productRegistered: boolean;
  popupModifier: string;
  productName: string;
}

class ProductTag extends React.Component<ProductTagProps, ProductTagState> {
  state = {
    showPopup: false,
    showRegister: false,
    productRegistered: false,
    popupModifier: '',
    productName: 'Product name'
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

  componentDidMount() {
    this.setPopupModifier();
  }

  handleBlur = () => {
    console.log('blur');
    this.setState({ showPopup: false });
  };

  popup = () => {
    return (
      <div className={`popup${this.state.popupModifier}`}>
        <div className="popup__inner">
          {this.state.showRegister ? (
            <p id="register">{this.configureProduct()}</p>
          ) : (
            <p
              className="productName"
              id="productName"
              onClick={() =>
                this.setState({
                  showRegister: !this.state.showRegister
                })
              }
            >
              {this.state.productName}
            </p>
          )}

          <button onClick={this.togglePopup}>close</button>
          <button onClick={null}>delete (todo)</button>
        </div>
      </div>
    );
  };

  configureProduct = () => {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder={this.state.productName}
            onChange={this.onChangeProductName}
            onBlur={() => {
              console.log('blur inp');
              this.setState({
                showRegister: !this.state.showRegister
              });
              console.log(this.state.showRegister);
            }}
          />
          <input type="submit" value="Save product" formAction="/fridge" />
        </form>
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

        {this.state.showPopup ? <div>{this.popup()}</div> : null}

        {this.state.productRegistered ? null : null}
      </div>
    );
  }
}

export default ProductTag;
