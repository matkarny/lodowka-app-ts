import io from 'socket.io-client';
import * as FRIDGE from '../../common/constants/FridgeConstants';
const pro = async () => {
  new Promise(resolve => {
    var socket = io(FRIDGE.SOCKET_ADDRESS);
    socket.on('image', image => {
      return `data:image/jpeg;base64,${image}`;
    });
  }).then(data => console.log('data', data));
};
class FridgeService {
  // src = 'dfosuh';

  async getPRo() {
    try {
      const dupa = await pro;
      console.log('3', dupa);
      return dupa;
    } catch (e) {
      console.log(e);
    }
  }

  async getImageBase64() {
    let src = '';
    try {
      var socket = io(FRIDGE.SOCKET_ADDRESS);
      socket.on('image', image => {
        src = `data:image/jpeg;base64,${image}`;
      });
      return src;
    } catch (e) {
      console.log(e);
    }
  }
}
const fridgeService = new FridgeService();
export default fridgeService;
