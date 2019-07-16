import React, { Component } from 'react'
import './ProductExpireChecker.scss'
import { expirationChecker } from './ProductExpireService'

interface DateState {
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
        productYear: this.props.productYear,
        productMounth: this.props.productMounth,
        productDay: this.props.productDay,
    }

    render() {
        return <div>
            <div>{expirationChecker(this.props.productDay, this.props.productMounth, this.props.productYear)}</div>
        </div>

    }
}