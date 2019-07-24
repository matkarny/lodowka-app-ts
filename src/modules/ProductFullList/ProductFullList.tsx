import * as React from 'react';
import './ProductFullList.scss';
import FullView from '../../common/components/FullView/FullView';
import FridgeView from '../Fridge/FridgeView';
import AllProductsComponent from '../../common/components/BasicComponent/AllProductsComponent/AllProductsComponent';

export interface IProductFullListProps {
  location: any,
}

export default class ProductFullList extends React.Component<
  IProductFullListProps
> {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props.location.state)
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  public render() {
    return (
      <FullView
        startAtFirst={this.props.location.state.startingAtFirst}
        labelName={'Your products'}
        firstButtonName={'Fridge'}
        secondButtonName={'List'}
        firstComponent={<FridgeView />}
        secondComponent={<AllProductsComponent />}
      />
    );
  }
}

// const mapStateToProps = (state) => ({
//   productsList: state.products,
// })

// export default connect(mapStateToProps)(ProductFullList);