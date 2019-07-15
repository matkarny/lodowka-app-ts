import React, { Component } from 'react'
import './ProductExpireChecker.scss'
import { number } from 'prop-types';

interface DateState {
    currentDate: Date,
    productYear: number,
    productMounth: number,
    productDay: number
}

interface PropsDateComponent {
    productYear: number,
    productMounth: number,
    productDay: number,
}

export default class ProductExpireChecker extends Component<PropsDateComponent, DateState> {

    state = {
        currentDate: new Date(),
        productYear: this.props.productYear,
        productMounth: this.props.productMounth,
        productDay: this.props.productDay,
    }

    todayDay = this.state.currentDate.getDate();
    todayMonth = this.state.currentDate.getMonth();
    todayYear = this.state.currentDate.getFullYear();



    public currentDate = new Date(this.todayYear, this.todayMonth, this.todayDay);
    public productDate = new Date(this.state.productYear, this.state.productMounth, this.state.productDay);

    countDaysLeft(currentDate, productDate): number {
        var oneDayInMilliseconds = 1000 * 60 * 60 * 24;

        var date1 = currentDate.getTime();
        var date2 = productDate.getTime();

        return (date2 - date1) / oneDayInMilliseconds
    }


    expirationChecker = days => {
        let daysToExpire = days
        switch (true) {
            case daysToExpire < 0:
                return <div className="expiration-style expiration-style__expiered" >{`Expired`}</div>
                break;
            case daysToExpire === 1:
                return <div className="expiration-style expiration-style__short-term">{`${days} DAY`}</div>
                break;
            case daysToExpire < 4:
                return <div className="expiration-style expiration-style__short-term">{`${days} DAYS`}</div>
                break;
            case daysToExpire < 10:
                return <div className="expiration-style" >{`${days} DAYS`}</div>
                break;
            default:
                return <div className="expiration-style">{`${String(this.state.productDay).padStart(2, "0")}/${String(this.state.productMounth).padStart(2, "0")}/${this.state.productYear}`}</div>

        }
    }


    render() {
        return <div>
            <button onClick={() => console.log(this.state)} > Click </button>
            <div>{this.expirationChecker(this.countDaysLeft(this.currentDate, this.productDate))}</div>
        </div>

    }
}