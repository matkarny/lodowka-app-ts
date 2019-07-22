import React from 'react';
import { POPUP_SWITCH_VALUE } from '../../common/constants/FridgeConstants';
import Store from '../../store/storeConfigure';

import { Product } from '../../common/interfaces/Product';
import { threadId } from 'worker_threads';
export interface ProductTagProps {
  product: Product;
  togglePopup(id);
  removeProduct(id);
  updateProduct(data);
  shownPopup: boolean;
}

export interface ProductTagState {
  showPopup: boolean;
  showNameInput: boolean;
  showDateInput: boolean;
  popupModifier: string;
  product: Product;
  inputedDate: string;
  inputedDateObject: { year: number; month: number; day: number };
}

class ProductTag extends React.Component<ProductTagProps, ProductTagState> {
  state = {
    showPopup: false,
    showNameInput: false,
    showDateInput: false,
    popupModifier: '',
    product: this.props.product,
    inputedDate: 'date',
    inputedDateObject: {
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

  /*== Product Name input and value ==*/
  nameInput = () => {
    return (
      <input
        type="text"
        autoFocus
        autoComplete="off"
        maxLength={20}
        value={this.state.product.name}
        onChange={e => this.handleNameChange(e)}
        onBlur={this.handleNameBlur}
      />
    );
  };

  handleNameChange = e => {
    this.setState({
      product: {
        name: e.target.value,
        tagPosition: this.state.product.tagPosition,
        addedBy: this.state.product.name,
        expirationDate: this.state.product.expirationDate,
        id: this.state.product.id
      }
    });
  };

  handleNameBlur = () => {
    /* Delete ProductName's redundant whitespaces. 
    Then validate if product name is null or contains only whitespaces - if any is true then replace with default name */
    let { name } = this.state.product;
    name = name.trim();
    if (name === null || name.match(/^[\s\n\r]*$/) !== null) name = 'PRODUCT';

    this.setState({
      showNameInput: !this.state.showNameInput,
      product: {
        name: name,
        tagPosition: this.state.product.tagPosition,
        addedBy: this.state.product.name,
        expirationDate: this.state.product.expirationDate,
        id: this.state.product.id
      }
    });

    // Update in Store
    this.props.updateProduct(this.state.product);
  };

  /*== Product Expiration Date input and value ==*/
  dateInput = () => {
    let minDate = `${new Date().getFullYear()}-0${new Date().getMonth() +
      1}-${new Date().getDate()}`;

    return (
      <input
        type="date"
        min={minDate}
        autoFocus
        autoComplete="off"
        value={this.state.inputedDate}
        onChange={e => this.handleDateChange(e)}
        onBlur={this.handleDateBlur}
      />
    );
  };

  handleDateChange = e => {
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
    let inputedDateObject = {
      year,
      month,
      day
    };

    let inputedDateObjectString = {
      year: '' + year,
      month: month + '',
      day: day + ''
    };

    this.setState({
      inputedDateObject: inputedDateObject,
      inputedDate: e.target.value,
      product: {
        name: this.state.product.name,
        tagPosition: this.state.product.tagPosition,
        addedBy: this.state.product.name,
        expirationDate: inputedDateObjectString,
        id: this.state.product.id
      }
    });

    this.props.updateProduct(this.state.product);
  };

  handleDateBlur = () => {
    this.setState({
      showDateInput: !this.state.showDateInput
    });

    // Update in Store
    this.props.updateProduct(this.state.product);
  };

  /*== Popup ==*/
  popup = () => {
    /*  Return Popup that shows - depending on show-Name/Date-Input - inputs or displays. OnClick on either input and display causes them to switch their visibility / places. Below that Popup shows Remove button.
     */

    let { year, month, day } = this.state.inputedDateObject;
    month++; // without this month values would be from 0 to 11
    let dateString = '';
    let monthString = '' + month;
    let dayString = '' + day;
    if (month < 10) monthString = '0' + month;
    if (day < 10) dayString = '0' + day;
    dateString += `${dayString}.${monthString}.${year}`;
    console.log('dateString', dateString, this.state.inputedDateObject);
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
                <div className="date__input">{this.dateInput()}</div>
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

  componentDidUpdate() {
    console.log('UPDATE', this.state.inputedDate, this.state.inputedDateObject);
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

export default ProductTag;
