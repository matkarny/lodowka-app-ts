import React, { Component } from 'react'
import './ProductExpireChecker.scss'
import { expirationChecker } from './ProductExpireService'

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

    render() {
        return <div>
            <div>{expirationChecker(this.currentDate, this.productDate)}</div>
        </div>

    }
}