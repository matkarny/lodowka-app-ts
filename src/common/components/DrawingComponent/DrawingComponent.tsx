import * as React from 'react';
import './DrawingComponent.scss';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash'
// import { IDrawing } from '../../interfaces/Drawing';
import { ADD_DRAWING, DELETE_DRAWING } from '../../../store/actions/DrawingActions';
import StoreType from '../../types/StoreType';

export interface state  {
  mode: string;
  pen: string;
  lineWidth: number;
  penColor: string;
  penCoords: any;
  canvasImg: string;
  authorID: string;
  authorName: string;
  canvasData;
}
export interface props extends Pick<StoreType, 'auth' | 'users'> {
  mode: string;
  pen: string;
  lineWidth: number;
  penColor: string;
  penCoords: any;
  canvasImg: string;
  addDrawing,
  deleteDrawing
}

const mapDispatchToProps = dispatch => {
  return {
    addDrawing: (drawing) => dispatch({ type: ADD_DRAWING, payload: drawing }),
    deleteDrawing: (drawingId: number) => dispatch({ type: DELETE_DRAWING, payload: drawingId })
  }
}

const mapStateToProps = state => ({auth: state.auth,
users: state.users})

//simple draw component made in react
class DrawingComponent extends React.Component<props, state> {
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

  
  // searchForAuthor(){
  //   let idNumber = this.props.auth
  //   let coppyNumber = cloneDeep(idNumber);
  //   let number = coppyNumber[0];
  //   console.log(number)
  //   let currentUsers = cloneDeep(this.props.users)
  //   let currentUser = currentUsers.find(x => x.id === number).username
  //   console.log(currentUser)
  //   this.setState({ authorID: number,
  //   authorName: currentUser });
  //   }

  settings() {
    this.setState({
      mode: 'draw',
      pen: 'up',
      lineWidth: 10,
      penColor: '#5F7891',
      authorID: "id",
      authorName: "name",
      canvasData: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAGkAaQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAgH/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="
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
  
public  drawingPack = {
    // personId: this.state.authorID,
    // name: this.state.authorName,
    // drawingData: this.state.canvasImg
  }
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
      this.setState({
        canvasData: this.canvasImg
      })
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
      <button className="canvas-save" onClick={() => this.props.addDrawing(this.state)}>Save</button>
      <button className="canvas-save" onClick={() => console.log(this.state)}>Save</button>
      </div>     
      </div>
      
      
  
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingComponent);


//simple draw component made in reac

//data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAGkAaQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAgH/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=