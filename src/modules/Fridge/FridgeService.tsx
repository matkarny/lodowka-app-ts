import io from 'socket.io-client';
import { createStore } from 'redux';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import * as FRIDGESTORE from '../../store/FridgeStore';

class FridgeService {
  async getImageBase64() {
    var socket = io(FRIDGE.SOCKET_ADDRESS);
    socket.on('image', image => {
      const src = `data:image/jpeg;base64,${image}`;
      //      this.setState({ src });
      //    FRIDGESTORE.dispatchFridge(src);
    });
  }
}
const fridgeService = new FridgeService();
export default fridgeService;
