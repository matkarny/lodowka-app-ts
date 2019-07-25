import * as React from 'react';
import './AllProductsComponent.tsx'
import MapProductsView from '../../MapProductsView/MapProductsView';

export interface AllProductsComponentProps {
}

export default class AllProductsComponent extends React.Component<AllProductsComponentProps> {


    public render() {
        return (
        <div className="all-products">
               <MapProductsView sortProducts={false} />
            </div>
        );
    }
}
