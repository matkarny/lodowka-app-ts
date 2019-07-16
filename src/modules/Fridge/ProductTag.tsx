import React from 'react';

export interface ProductTagProps {
  tagPosTop: number;
  tagPosLeft: number;
  closePopup(id);
  openPopup(id);
  togglePopup(id);
  deleteTag(id);
  shown: boolean;
  id: number;
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
    id: 0,
    showPopup: false,
    showRegister: false,
    productRegistered: false,
    popupModifier: '',
    productName: 'Product name'
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

  handleClick = () => {
    this.props.closePopup(this.props.id);
  };

  popup = () => {
    return (
      <div className={`popup${this.state.popupModifier}`}>
        <div className="popup__inner">
          {this.state.showRegister ? (
            <div id="register">{this.configureProduct()}</div>
          ) : (
            <div
              className="productName"
              id="productName"
              onClick={() =>
                this.setState({
                  showRegister: !this.state.showRegister
                })
              }
            >
              {this.state.productName}
            </div>
          )}

          <button onClick={() => this.props.closePopup(this.props.id)}>
            close
          </button>
          <button onClick={() => this.props.deleteTag(this.props.id)}>
            delete (todo)
          </button>
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
            autoFocus
            onChange={this.onChangeProductName}
            onBlur={() => {
              console.log('blur inp');
              this.setState({
                showRegister: !this.state.showRegister
              });
              console.log(this.state.showRegister);
            }}
            value={this.state.productName}
          />
          <input type="submit" value="Save product" formAction="/fridge/" />
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
          backgroundColor: '#70D9A8'
        }}
      >
        <button
          className="product-tag__circle "
          onClick={() => this.props.togglePopup(this.props.id)}
        />

        {this.props.shown ? <div>{this.popup()}</div> : null}
      </div>
    );
  }
}

export default ProductTag;
