import Network from '../utils/network';

export default class client {
  constructor(key, platform = 'development') {
    this.key = key;
    this.network = Network(platform);
  }

  get key_param() {
    return '?public_key=' + this.key;
  }

  is_displayed_in_checkout() {
    return new Promise((resolve, reject) => {
      this.network.post('ecomm/is_displayed_in_checkout' + this.key_param)
        .then(res => res['is_displayed_in_checkout']);
    });
  }
}
