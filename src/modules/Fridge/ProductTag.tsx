import React from 'react';
import DatePicker from 'react-datepicker';

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
  showNameInput: boolean;
  showDateInput: boolean;
  productRegistered: boolean;
  popupModifier: string;
  productName: string;
  productExpDate: string;
  value: any;
}

class ProductTag extends React.Component<ProductTagProps, ProductTagState> {
  constructor(props) {
    super(props);
  }
  state = {
    id: 0,
    showPopup: false,
    showNameInput: false,
    showDateInput: false,
    productRegistered: false,
    popupModifier: '',
    productName: 'Product name',
    productExpDate: 'DD/MM/YYYY',
    value: null
  };

  setPopupModifier() {
    const clientHeight = document.documentElement.clientHeight;
    const diff = clientHeight - +this.props.tagPosTop;
    if (diff >= 695) this.setState({ popupModifier: '--rotated' });
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
            showNameInput: !this.state.showNameInput,
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
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    console.log(year, month, day);

    return (
      <input
        type="date"
        min={`${year}-0${month}-${day}`}
        // min="2019-07-17"

        autoFocus
        autoComplete="off"
        value={this.state.productExpDate}
        onChange={e => {
          this.setState({ productExpDate: e.target.value });
        }}
        onBlur={() => {
          this.setState({
            showDateInput: !this.state.showDateInput
          });
        }}
      />
    );
  };
  configureProductExpDate2 = () => {
    return (
      <div className="fridge">
        <div className="EXPDATE">
          <DatePicker
            disableCalendar="false"
            value={this.state.value}
            onChange={date => {
              console.log(date);
              this.setState({ value: date });
            }}
            minDate={new Date()}
          />
        </div>
      </div>
    );
  };

  handleExpDateChange = e => {
    this.setState({ value: e.target.value });
  };

  popup = () => {
    // return either Input for product name OR Div displaying product name (OnClick on both causes them to switch their visibility)
    // next return action buttons accordingly to current shown element
    return (
      <div className={`popup${this.state.popupModifier}`}>
        <div className="popup__inner">
          <div className="popup__details">
            <div className="name">
              {this.state.showNameInput ? (
                <div className="name__input">{this.configureProductName()}</div>
              ) : (
                <div className="name__display">
                  <div
                    className="product-tag__name"
                    onClick={() =>
                      this.setState({
                        showNameInput: !this.state.showNameInput
                      })
                    }
                  >
                    {this.state.productName}
                  </div>
                </div>
              )}
            </div>

            <div className="date">
              {this.state.showDateInput ? (
                <div className="date__input">
                  {this.configureProductExpDate()}
                </div>
              ) : (
                <div className="date__display">
                  <div
                    className="product-tag__date"
                    onClick={() =>
                      this.setState({
                        showDateInput: !this.state.showDateInput
                      })
                    }
                  >
                    {this.state.productExpDate}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="popup__actions">
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
