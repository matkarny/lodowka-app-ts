import io from 'socket.io-client';
import * as FRIDGE from '../../common/constants/FridgeConstants';
import src from '*.jpg';

class FridgeService {
  async getImageBase64() {
    try {
      var socket = io('http://10.254.0.40:3000');
      socket.on('image', image => {
        const src = `data:image/jpeg;base64,${image}`;
      });
    //  console.log(src);
      return src;
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  getImage() {
    return this.getImageBase64();
  }
}

const fridgeService = new FridgeService();
export default fridgeService;
