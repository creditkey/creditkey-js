import Network from '../utils/network';
import { api } from '../utils/platform';

export default class client {
  constructor(key, platform = 'production') {
    this.key = key;
    this.platform = platform;
    this.network = Network(api(platform));
  }

  is_displayed_in_checkout() {
    return new Promise((resolve, reject) => {
      this.network.post('ecomm/is_displayed_in_checkout', {
        public_key: this.key
      })
      .then(res => console.log(res));
    });
  }
}
