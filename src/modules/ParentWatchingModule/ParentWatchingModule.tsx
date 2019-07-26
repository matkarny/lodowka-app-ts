import * as React from 'react';
import ImageGallery from 'react-image-gallery'
import StoreType from '../../common/types/StoreType';
import { connect } from 'react-redux';

export interface IParentWatchingModuleProps extends Pick<StoreType, 'drawings'> {
}

const mapStateToProps = state => ({drawings: state.drawings})

class ParentWatchingModule extends React.Component<IParentWatchingModuleProps> {
   componentDidMount(){
    console.log(this.state)
   }
   
    // images = this.props.drawings.map(image =>image.canvasData)
 
    public render() {

    
    return (

      <div>
      {/* <ImageGallery items={this.images} />   */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ParentWatchingModule)