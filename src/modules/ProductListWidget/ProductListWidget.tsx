import * as React from 'react';
import ListLabel from '../../common/components/ListLabel/ListLabel';
import ListBtn from '../../common/components/ListBtn/ListBtn';
import "./ProductListWidget.scss"
import * as Routes from '../../common/constants/Routes'
import { Link } from "react-router-dom"
import ProductExpireViewComponent from '../../common/components/ProductExpireViewComponent/ProductExpireViewComponent';


export interface ProductListWidgetProps {
}

export default class ProductListWidget extends React.Component<ProductListWidgetProps> {

    componentDidMount(){
        window.scrollTo(0,0);
       }

       componentDidUpdate() {
        window.scrollTo(0,0);
      }

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
            <div className="product-list-widget">
                <ListLabel labelCount={this.exampleObject.products.length} labelTxt={"Products"}>
                <Link to={{pathname: Routes.PRODUCTS, state: {startingAtFirst: false}}} ><ListBtn>VIEW ALL</ListBtn></Link>
                <Link to={{pathname: Routes.PRODUCTS, state: {startingAtFirst: true}}} ><ListBtn>+</ListBtn></Link>
                </ListLabel>
             <ProductExpireViewComponent />
            </div>
        );
    }
}
