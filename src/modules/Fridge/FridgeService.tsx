import React from 'react';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import io from 'socket.io-client';

class FridgeService {
  getImg;

  constructor(getImg) {
    this.getImg = getImg;
  }

  getImageBase64 = () => {
    var socket = io(FRIDGE.SOCKET_ADDRESS);
    socket.on('image', image => {
      const src = `data:image/jpeg;base64,${image}`;
      this.getImg(src);
    });
  };
}

export default FridgeService;
