import * as React from 'react';
import './DrawingComponent.scss';
import { connect } from 'react-redux';
// import { IDrawing } from '../../interfaces/Drawing';
import { ADD_DRAWING, DELETE_DRAWING } from '../../../store/actions/DrawingActions';

export interface state {
  mode: string;
  pen: string;
  lineWidth: number;
  penColor: string;
  penCoords: any;
  canvasImg: string;
}

export interface props {
  mode: string;
  pen: string;
  lineWidth: number;
  penColor: string;
  penCoords: any;
  canvasImg: string;
}

const mapDispatchToProps = dispatch => {
  return {
    addDrawing: (drawing) => dispatch({ type: ADD_DRAWING, payload: drawing }),
    deleteDrawing: (drawingId: number) => dispatch({ type: DELETE_DRAWING, payload: drawingId })
  }
}

const mapStateToProps = state => ({drawings: state.drawings})

//simple draw component made in react
export class DrawingComponent extends React.Component<props, state> {
  private canvasRef: any;
  public canvasImg: string;
  public positionX: any;
  public positionY: any;

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
    ctx.fillRect(0, 0, 400, 400);
    ctx.lineWidth = 10;
  }

  // draw(e) { //response to Draw button click
  //     this.setState({
  //         mode: 'draw'
  //     })
  // }

  drawing(e) {
    //if the pen is down in the canvas, draw/erase
    const ctx = this.canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
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

      ctx.moveTo(this.positionX, this.positionY); //move to old position
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //draw to new position
      ctx.stroke();
      ctx.beginPath();
      this.positionX = e.nativeEvent.offsetX;
      this.positionY = e.nativeEvent.offsetY;
    }
  }

  penDown(e) {
    //mouse is down on the canvas
    this.setState({
      pen: 'down',
      // penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
    });
    this.positionX = e.nativeEvent.offsetX;
      this.positionY = e.nativeEvent.offsetY;
  }

  penUp = (e) => {
    //mouse is up on the canvas
    this.setState({
      pen: 'up'
    });
  }


  saveFile(id) {
    let fileToSave: any = document.getElementById(id);
    return fileToSave;
  }
  changeColor = (color: string) => {
    //mouse is up on the canvas
    this.setState({
      penColor: color
    });
  }

  render() {
    console.log('render!');
    return (
      <div className="canvas-styling">
        <canvas
          id="mycanvas"
          ref={this.canvasRef}
          width="420px"
          height="420px"
          className="canvas-background"
          onMouseMove={e => this.drawing(e)}
          onMouseDown={e => this.penDown(e)}
          onMouseUp={this.penUp}
        />
      <div className="canvas-color-container">
      <button className="canvas-circle canvas-circle--grey"onClick={()=> this.changeColor('#5F7891')}>Grey</button>
      <button className="canvas-circle canvas-circle--black" onClick={()=> this.changeColor('black')}>Black</button>
      <button className="canvas-circle canvas-circle--red" onClick={()=> this.changeColor('red')}>Red</button>
      <button className="canvas-circle canvas-circle--blue " onClick={()=> this.changeColor('blue')}>Blue</button>
      <button className="canvas-erase"onClick={()=> this.changeColor('#ffffff')}>Erase</button>
      </div>
      <div className="canvas-button-container">
      <button className="canvas-save" onClick={this.saveFile("mycanvas")}>Save</button>
      <button className="canvas-save canvas-save--grey" onClick={this.erase}>Clear</button>
      <button className="canvas-save" onClick={() => console.log(this.state)}>Save</button>
      </div>
      
      </div>
      
      
  
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingComponent);


//simple draw component made in reac