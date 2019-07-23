import * as React from 'react';
import ProductExpireChecker from '../ProductExpireChecker/ProductExpireChecker';
import ProductLabel from '../ProductLabel/ProductLabel'
import { loadState } from '../../../store/globalLocalStorage';
import { store } from '../../../store/storeConfigure';
import { cloneDeep } from "lodash"


export interface IMapProductsViewProps {
    arraySize?: number | undefined,
    sortProducts: boolean
}

export interface IMapProductsViewState {
    productList:  Object
}
export default class MapProductsView extends React.Component<IMapProductsViewProps> {

    public productObject = cloneDeep(store.getState().products)

    state = {
        productList: {}
    }
    componentDidMount() {
        setInterval(() => loadState(), 1000)
        this.cloneObject()

    }
    componentWillMount() {
        loadState();
        this.cloneObject()
    }

    cloneObject = () => {
        if (this.props.sortProducts) {
            this.productObject.sort(function compare(a, b) {
                var dateA: any = new Date(a.expirationDate.year, a.expirationDate.month, a.expirationDate.day);
                var dateB: any = new Date(b.expirationDate.year, b.expirationDate.month, b.expirationDate.day);
                return dateA - dateB;
            })
        } else {
            return this.productObject
        }
    
            }

    public render() {
        return (
            <div>
                {this.productObject.slice(0, this.props.arraySize)
                    .map(product => (
                        <ProductLabel productName={product.name}>
                            {' '}
                            <ProductExpireChecker
                                productDay={product.expirationDate.day}
                                productMounth={product.expirationDate.month}
                                productYear={product.expirationDate.year}
                            />{' '}
                        </ProductLabel>
                    ))}
            </div>
        );
    }
}
