import * as React from 'react';
import './ProductLabel.scss'

export interface IAppProps {
    productName: string,
}

export interface IAppState {
    productName: string
}

export default class App extends React.Component<IAppProps, IAppState> {
state = {
        productName: this.props.productName
    }


render() {
    return (
        <div className="product-label">
        <h2 className="product-label__product-name">{this.state.productName}</h2>
        {this.props.children}
        </div>
    );
  }
}
