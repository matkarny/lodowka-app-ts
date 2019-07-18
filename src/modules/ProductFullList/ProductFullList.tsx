import * as React from 'react';
import "./ProductFullList.scss"
import ProductLabel from "../../common/components/ProductLabel/ProductLabel"
import ProductExpireChecker from '../../common/components/ProductExpireChecker/ProductExpireChecker'
import * as Routes from '../../common/constants/Routes'

export interface IProductFullListProps {
}

export default class ProductFullList extends React.Component<IProductFullListProps> {

    public exampleObject = {
        products: [
            {
                name: "Pomidor", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 16
                }
            },
            {
                name: "Pierogi z mięsem", addedOn: {
                    "year": 2019,
                    "mounth": 5,
                    "day": 10
                }
            },
            {
                name: "Sałatka z tuńczyka", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 20
                }
            },
            {
                name: "Groszek konserowy", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 18
                }
            },
            {
                name: "Szynka", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 30
                }
            },
            {
                name: "Pomidor", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 16
                }
            },
            {
                name: "Pierogi z mięsem", addedOn: {
                    "year": 2019,
                    "mounth": 5,
                    "day": 10
                }
            },
            {
                name: "Sałatka z tuńczyka", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 20
                }
            },
            {
                name: "Groszek konserowy", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 18
                }
            },
            {
                name: "Szynka", addedOn: {
                    "year": 2019,
                    "mounth": 6,
                    "day": 30
                }
            }],
    }


    public render() {
        return (
            <div className="product-list">
                <header className="product-list__header">
                    <a href={Routes.DASHBOARD} className="product-list__link"><div className="product-list__header product-list__arrow">🡠</div> </a>
                    <div className="product-list__middle-container">
                        <div className="product-list__middle-container-text">Your Products </div>
                        <div className="product-list__fridge-list-container">
                            <a href={Routes.FRIDGE} className="product-list__link product-list__fridge-list-container product-list__fridge-list-container-fridge product-list__link">Fridge</a>
                            <a href="#" className="product-list__link product-list__fridge-list-container product-list__fridge-list-container-list product-list__link">List</a>
                        </div>
                    </div>
                    <div></div>
                </header>
                <div className="product-list__products">
                {Object.values(this.exampleObject.products).map(product => <ProductLabel productName={product.name}> <ProductExpireChecker productDay={product.addedOn.day} productMounth={product.addedOn.mounth} productYear={product.addedOn.year}/> </ProductLabel>)}
                </div>
            </div>
        );
    }
}
