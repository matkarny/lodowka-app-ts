import * as React from 'react';
import './DrawingComponent.scss';


interface props {
  mode: string;
  pen: string;
  lineWidth: number;
  penColor: string;
  penCoords: any;
  canvasImg: string;
}
//simple draw component made in react
class DrawingComponent extends React.Component<{}, props> {
  private canvasRef: any;
  public canvasImg: string;

  constructor(props: props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.settings();
  }
  componentDidUpdate() {
    this.canvasImg = this.saveFile('mycanvas').toDataURL('image/jpeg', 0.5);
  }


  settings() {
    this.setState({
      mode: 'draw',
      pen: 'up',
      lineWidth: 10,
      penColor: '#5F7891'
    });

    console.log(this.canvasRef);
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 480, 480);
    ctx.lineWidth = 10;
  }

  // draw(e) { //response to Draw button click
  //     this.setState({
  //         mode: 'draw'
  //     })
  // }

  drawing(e) {
    //if the pen is down in the canvas, draw/erase
    const ctx = this.canvasRef.current.getContext('2d');
    if (this.state.pen === 'down') {
      ctx.beginPath();
      ctx.lineWidth = this.state.lineWidth;
      ctx.lineCap = 'round';

      if (this.state.mode === 'draw') {
        ctx.strokeStyle = this.state.penColor;
      }

      if (this.state.mode === 'erase') {
        ctx.strokeStyle = '#ffffff';
      }

      ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1]); //move to old position
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //draw to new position
      ctx.stroke();

      this.setState({
        //save new position
        penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
      });
    }
  }

  penDown(e) {
    //mouse is down on the canvas
    this.setState({
      pen: 'down',
      penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
    });
  }

  penUp(e) {
    //mouse is up on the canvas
    this.setState({
      pen: 'up'
    });
  }

  erase(e) {
    //mouse is up on the canvas
    this.setState({
      mode: 'erase'
    });
  }

  saveFile(id) {
    let fileToSave: any = document.getElementById(id);
    return fileToSave;
  }

  render() {
    return (
      <div className="canvas-styling">
        <canvas
          id="mycanvas"
          ref={this.canvasRef}
          width="480px"
          height="480px"
          className="canvas-background"
          onMouseMove={e => this.drawing(e)}
          onMouseDown={e => this.penDown(e)}
          onMouseUp={e => this.penUp(e)}
        />
      </div>
    );
  }
}

export default DrawingComponent;
