import * as FRIDGE from '../../common/constants/FridgeConstants';
import io from 'socket.io-client';
import { noImgSrc } from './NoFridge';

class FridgeService {
  getFridgeImage;
  imgSrc = '';

  constructor(getFridgeImage) {
    this.getFridgeImage = getFridgeImage;
  }

  getImageBase64 = () => {
    var socket = io(FRIDGE.SOCKET_ADDRESS);
    socket.on('image', image => {
      const src = `data:image/jpeg;base64,${image}`;
      this.imgSrc = src;
      this.getFridgeImage(src);
    });

    window.setInterval(() => {
      if (this.imgSrc === '') {
        this.getFridgeImage(noImgSrc);
      }
    }, 10000);
  };
}

export default FridgeService;
