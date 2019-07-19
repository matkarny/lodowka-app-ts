import * as FRIDGE from '../../common/constants/FridgeConstants';
import io from 'socket.io-client';

class FridgeService {
  getFridgeImage;

  constructor(getFridgeImage) {
    this.getFridgeImage = getFridgeImage;
  }

  getImageBase64 = () => {
    var socket = io(FRIDGE.SOCKET_ADDRESS);
    socket.on('image', image => {
      const src = `data:image/jpeg;base64,${image}`;
      this.getFridgeImage(src);
    });
  };
}

export default FridgeService;
