import * as React from 'react';
import './ChildDrawingModule.scss';
import DrawingComponent from '../../common/components/DrawingComponent/DrawingComponent';

export interface ChildDrawingModuleProps {
}

export default class ChildDrawingModule extends React.Component<ChildDrawingModuleProps> {

  public render() {
    return (
      <div className="drawing-module">
      <DrawingComponent />
      </div>
    );
  }
}
