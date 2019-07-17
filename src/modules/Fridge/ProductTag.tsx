import React from 'react';
import ListBtn from '../../common/components/ListBtn/ListBtn';

export interface ProductTagProps {
  tagPosTop: number;
  tagPosLeft: number;
  closePopup(id);
  togglePopup(id);
  deleteTag(id);
  shown: boolean;
  id: number;
}

export interface ProductTagState {
  showPopup: boolean;
  showInput: boolean;
  productRegistered: boolean;
  popupModifier: string;
  productName: string;
  productExpDate: string;
}

class ProductTag extends React.Component<ProductTagProps, ProductTagState> {
  state = {
    id: 0,
    showPopup: false,
    showInput: false,
    productRegistered: false,
    popupModifier: '',
    productName: 'Product name',
    productExpDate: 'DD/MM/YYYY'
  };

  setPopupModifier() {
    const clientHeight = document.documentElement.clientHeight;
    const diff = clientHeight - +this.props.tagPosTop;
    if (diff >= 395) this.setState({ popupModifier: '--rotated' });
  }

  configureProductName = () => {
    return (
      <input
        type="text"
        autoFocus
        autoComplete="off"
        maxLength={20}
        value={this.state.productName}
        onChange={e => {
          this.setState({ productName: e.target.value });
        }}
        onBlur={() => {
          // Delete ProductName's redundant whitespaces
          this.setState({
            showInput: !this.state.showInput,
            productName: this.state.productName.trim()
          });

          // Validate if ProductName is null or contains only whitespaces - if yes then replace with default name
          if (
            this.state.productName === null ||
            this.state.productName.match(/^[\s\n\r]*$/) !== null
          )
            this.setState({ productName: 'Product name' });
        }}
      />
    );
  };

  configureProductExpDate = () => {
    return (
      <input
        type="text"
        autoComplete="off"
        value={this.state.productExpDate}
        onChange={e => {
          this.setState({ productExpDate: e.target.value });
        }}
      />
    );
  };

  popup = () => {
    // return either Input for product name OR Div displaying product name (OnClick on both causes them to switch their visibility)
    // next return action buttons accordingly to current shown element
    return (
      <div className={`popup${this.state.popupModifier}`}>
        <div className="popup__inner">
          {this.state.showInput ? (
            <div className="product-tag__display ">
              <form autoComplete="off" className="product-tag__form">
                {this.configureProductName()}
              </form>
            </div>
          ) : (
            <div className="product-tag__display">
              <div className="product-tag__info">
                <div
                  className="product-tag__name"
                  onClick={() =>
                    this.setState({
                      showInput: !this.state.showInput
                    })
                  }
                >
                  {this.state.productName}
                </div>

                <div
                  className="product-tag__exp-date"
                  onClick={() =>
                    this.setState({
                      showInput: !this.state.showInput
                    })
                  }
                >
                  {this.state.productExpDate}
                </div>
              </div>

              <div className="product-tag__actions">
                <button className="product-tag__memo" onClick={null}>
                  TO DO
                </button>
                <button
                  className="product-tag__delete"
                  onClick={() => this.props.deleteTag(this.props.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* <button
            style={{ display: 'none' }}
            className="popup__close"
            onClick={() => this.props.closePopup(this.props.id)}
          >
            close
          </button> */}
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.setPopupModifier();
  }

  render() {
    return (
      <div
        className="product-tag"
        style={{
          position: 'absolute',
          top: `${this.props.tagPosTop}px`,
          left: `${this.props.tagPosLeft}px`,
          backgroundColor: 'gray'
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
