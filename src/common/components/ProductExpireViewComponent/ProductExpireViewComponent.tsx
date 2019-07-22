import * as React from 'react';
import ProductLabel from "../ProductLabel/ProductLabel"
import ProductExpireChecker from "../ProductExpireChecker/ProductExpireChecker"

export interface IProductExpireViewComponentProps {
    numberShowedProducts?: any
}

export default class ProductExpireViewComponent extends React.Component<IProductExpireViewComponentProps> {
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

        private  numberShowedProducts: number 

        
numberOfShowedProducts() {
        if(!this.props.numberShowedProducts){
            this.numberShowedProducts = 0
        } else {
            this.numberShowedProducts = this.props.numberShowedProducts
        }
    }
 componentDidMount(){

    this.numberOfShowedProducts()
 }
    public render() {

    return (
      <div>
         {Object.values(this.exampleObject.products).splice(0,this.numberShowedProducts).map(product => <ProductLabel productName={product.name}> <ProductExpireChecker productDay={product.addedOn.day} productMounth={product.addedOn.mounth} productYear={product.addedOn.year} /> </ProductLabel>)}  
      </div>
    );
  }
}
