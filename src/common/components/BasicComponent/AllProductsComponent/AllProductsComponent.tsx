import * as React from 'react';
import './AllProductsComponent.tsx'
import ProductLabel from "../../ProductLabel/ProductLabel"
import ProductExpireChecker from '../../ProductExpireChecker/ProductExpireChecker'

export interface AllProductsComponentProps {
}

export default class AllProductsComponent extends React.Component<AllProductsComponentProps> {

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
        <div className="all-products">
                {Object.values(this.exampleObject.products).map(product => <ProductLabel productName={product.name}> <ProductExpireChecker productDay={product.addedOn.day} productMounth={product.addedOn.mounth} productYear={product.addedOn.year}/> </ProductLabel>)}
            </div>
        );
    }
}
