import * as React from 'react';
import ListLabel from '../../common/components/ListLabel/ListLabel';
import ListBtn from '../../common/components/ListBtn/ListBtn';
import ProductLabel from "../../common/components/ProductLabel/ProductLabel"
import ProductExpireChecker from "../../common/components/ProductExpireChecker/ProductExpireChecker"


export interface ProductListWidgetProps {
}

export default class ProductListWidget extends React.Component<ProductListWidgetProps> {

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
            }],}
        ;

    render() {
        return (
            <div>
                <ListLabel labelCount={this.exampleObject.products.length} labelTxt={"Products"}>
                    <a href="#"><ListBtn>VIEW ALL</ListBtn></a>
                    <a href="#"><ListBtn>+</ListBtn></a>
                </ListLabel>
                {Object.values(this.exampleObject.products).slice(0,4).map(product => <ProductLabel productName={product.name}> <ProductExpireChecker productDay={product.addedOn.day} productMounth={product.addedOn.mounth} productYear={product.addedOn.year} /> </ProductLabel>)}
            <button onClick={() => console.log(Object.values(this.exampleObject.products))}> Click</button>
            </div>


        );
    }
}
