import React from 'react';
import { POPUP_SWITCH_VALUE } from '../../common/constants/FridgeConstants';
import Store from '../../store/storeConfigure';

import { Product } from '../../common/interfaces/Product';
export interface ProductTagNEWProps {
  product: Product;
  togglePopup(id);
  removeProduct(id);
  shownPopup: boolean;
}

export interface ProductTagNEWState {
  showPopup: boolean;
  showNameInput: boolean;
  showDateInput: boolean;
  popupModifier: string;
  product: Product;
  inputedDate: string;
  expirationDate: { year: number; month: number; day: number };
}

class ProductTagNEW extends React.Component<
  ProductTagNEWProps,
  ProductTagNEWState
> {
  state = {
    showPopup: false,
    showNameInput: false,
    showDateInput: false,
    popupModifier: '',
    product: this.props.product,
    inputedDate: 'date',
    expirationDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    }
  };

  setPopupModifier() {
    const clientHeight = document.documentElement.clientHeight;
    const diff = clientHeight - +this.state.product.tagPosition;
    if (diff >= POPUP_SWITCH_VALUE)
      this.setState({ popupModifier: '--rotated' });
  }

  nameInput = () => {
    return (
      <input
        type="text"
        autoFocus
        autoComplete="off"
        maxLength={20}
        value={this.state.product.name}
        onChange={e => {
          this.setState(previousState => ({
            product: { ...previousState.product, name: e.target.value }
          }));
        }}
        onBlur={() => {
          /* Delete ProductName's redundant whitespaces */
          this.setState({
            showNameInput: !this.state.showNameInput
            //  productName: this.state.productName.trim()
          });

          this.setState(previousState => ({
            product: {
              ...previousState.product,
              name: this.state.product.name.trim()
            }
          }));

          /* Validate if ProductName is null or contains only whitespaces. If any is true then replace with default name */
          if (
            this.state.product.name === null ||
            this.state.product.name.match(/^[\s\n\r]*$/) !== null
          )
            this.setState(previousState => ({
              product: { ...previousState.product, name: 'Product name' }
            }));
        }}
      />
    );
  };

  expirationDateInput = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    return (
      <input
        type="date"
        min={`${year}-0${month}-${day}`}
        autoFocus
        autoComplete="off"
        value={this.state.inputedDate}
        onChange={this.handleChangeDateInput}
        onBlur={() => {
          this.setState({
            showDateInput: !this.state.showDateInput
          });
          if (this.state.product.name === null)
            this.setState({ inputedDate: 'date' });
        }}
      />
    );
  };

  handleChangeDateInput = e => {
    /* Transform from YYYY-MM-DD (given by html input value) to DD.MM.YYYY */
    let inputVal = e.target.value;
    let splittedVal = inputVal.split('-').reverse();
    let monthString = splittedVal[1].split('');

    let day = +splittedVal[0];
    let month: number;
    let year = +splittedVal[2];

    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();

    /* Set month format (cut off '0' when month is earlier/lower than 10) */
    if (monthString[0] === '0') month = +monthString[1] - 1;
    else month = +`${monthString[0]}${monthString[1]}` - 1;

    /* Check if given month and day are earlier than current date */
    if (month < currentMonth && day < currentDay) {
      month = currentMonth;
      day = currentDay;
    }

    /* Check if given month is earlier than current month*/
    if (month < currentMonth) {
      month = currentMonth;
    }

    /* Check if given day is earlier than current day this month */
    if (month === currentMonth && day < currentDay) {
      day = currentDay;
    }

    /* Create Date object applicable for Redux store and ProductExpireChecker */
    let expirationDate = {
      year,
      month,
      day
    };

    this.setState({
      expirationDate: expirationDate,
      inputedDate: e.target.value
    });
  };

  popup = () => {
    /*  Return Popup that shows - depending on show-Name/Date-Input - inputs or displays. OnClick on either input and display causes them to switch their visibility / places. Below that Popup shows Remove button.
     */

    let { year, month, day } = this.state.expirationDate;
    month++; // without this month values would be from 0 to 11
    let dateString = '';
    let monthString = '' + month;
    let dayString = '' + day;
    if (month < 10) monthString = '0' + month;
    if (day < 10) dayString = '0' + day;
    dateString += `${dayString}.${monthString}.${year}`;

    return (
      <div className={`popup${this.state.popupModifier}`}>
        <div className="popup__inner">
          <div className="popup__details">
            <div className="name">
              {this.state.showNameInput ? (
                <div className="name__input">{this.nameInput()}</div>
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
                    {this.state.product.name}
                  </div>
                </div>
              )}
            </div>

            <div className="date">
              {this.state.showDateInput ? (
                <div className="date__input">{this.expirationDateInput()}</div>
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
                    {dateString}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="popup__actions">
            <button
              className="product-tag__delete"
              onClick={() => this.props.removeProduct(this.state.product.id)}
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
          top: `${this.state.product.tagPosition.top - 30}px`,
          left: `${this.state.product.tagPosition.left - 30}px`,
          backgroundColor: 'gray'
        }}
      >
        <button
          className="product-tag__circle "
          onClick={() => this.props.togglePopup(this.state.product.id)}
        />

        {this.props.shownPopup ? <div>{this.popup()}</div> : null}
      </div>
    );
  }
}

export default ProductTagNEW;
