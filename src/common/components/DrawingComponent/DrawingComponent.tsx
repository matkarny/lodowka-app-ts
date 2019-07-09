import React from "react";
import './drawing-component.css'

//simple draw component made in react
class DrawApp extends React.Component {

    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        this.settings()
    }

    settings() {
        this.setState({
            mode: 'draw',
            pen : 'up',
            lineWidth : 15,
            penColor : "#708090",

        })

        let canvasCore: any = this.ctx;

        this.ctx = this.refs.canvas.getContext('2d');
        this.ctx.fillStyle="white";
        this.ctx.fillRect(0,0,800,600);
        this.ctx.lineWidth = 10;
    }

    draw(e) { //response to Draw button click 
        this.setState({
            mode:'draw'
        })
    }

    drawing(e) { //if the pen is down in the canvas, draw/erase

        if(this.state.pen === 'down') {

            this.ctx.beginPath()
            this.ctx.lineWidth = this.state.lineWidth
            this.ctx.lineCap = 'round';


            if(this.state.mode === 'draw') {
                this.ctx.strokeStyle = this.state.penColor;
            }

            if(this.state.mode === 'erase') {
                this.ctx.strokeStyle = '#ffffff';
            }

            this.ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1]) //move to old position
            this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) //draw to new position
            this.ctx.stroke();

            this.setState({ //save new position 
                penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
            })
        }
    }

    penDown(e) { //mouse is down on the canvas
        this.setState({
            pen:'down',
            penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        })
    }

    penUp() { //mouse is up on the canvas
        this.setState({
            pen:'up'
        })
    }



    render() {
        return (
            <div class="canvas-styling">
                <canvas ref="canvas" width="800px" height="600px" class="canvas-background" 
                    onMouseMove={(e)=>this.drawing(e)} 
                    onMouseDown={(e)=>this.penDown(e)} 
                    onMouseUp={(e)=>this.penUp(e)}>
                </canvas>  
            </div>

        );
    }
}

  export default DrawApp;