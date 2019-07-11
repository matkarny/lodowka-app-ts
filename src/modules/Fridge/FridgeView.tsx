import React from 'react';
import io from 'socket.io-client';

export interface FridgeViewProps {}

export interface FridgeViewState {
  stuff: string;
}

class FridgeView extends React.Component<FridgeViewProps, FridgeViewState> {
  state = { stuff: '' };
  test = () => {
    // let socket = io();
  };
  render() {
    return (
      <div>
        <img src="http://10.254.0.40:3000/" alt="fridge" />
      </div>
    );
  }
}

export default FridgeView;
