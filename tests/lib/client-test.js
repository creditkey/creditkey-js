import expect from 'expect'
import fetchMock from 'fetch-mock';
import { api } from '../../src/utils/platform';

import Client from '../../src/lib/client';
import Address from '../../src/lib/address';
import Charges from '../../src/lib/charges';

const host = api('development');
const key = '123456789';
const client = new Client(key);
const billingAddress = new Address('Test', 'Tester', 'Test Co', 'test@test.com', '1 Test Rd', '', 'Test City', 'XX', '01234');
const charges = new Charges('100.00', '10.00', 0, 0, '110.00');

describe('Client', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('begin checkout', () => {
    it('sets the key as a url param', ()=> {
      expect(client.key_param).toBe('?public_key=' + key);
    });

    it('rejects when missing required data', () => {
      return client.begin_checkout()
        .catch(e => expect(e).toBe('missing required data'));
    });

    it('rejects when cart items is not an array', () => {
      return client.begin_checkout({}, {}, {}, charges, 1, 1, 'http://', 'http://')
        .catch(e => expect(e).toBe('cart items must be an array of cart objects'));
    });

    it('sends a request with the expected payload', () => {
      const response = { checkout_url: 'http://localhost:9100' };
      fetchMock.post(host + '/ecomm/begin_checkout', response);

      return client.begin_checkout([], billingAddress, null, charges, 1, 1, 'http://', 'http://')
        .then(res => expect(res).toEqual(response));
    });
  });

  describe('is displayed in checkout', () => {
    it('sends a request for valid display', () => {
      const response = { is_displayed_in_checkout: true };
      fetchMock.post(host + '/ecomm/is_displayed_in_checkout?public_key=' + key, response);

      return client.is_displayed_in_checkout()
        .then(res => expect(res).toEqual(true));
    });

    it('sends a request for invalid display', () => {
      const response = { is_displayed_in_checkout: false };
      fetchMock.post(host + '/ecomm/is_displayed_in_checkout?public_key=' + key, response);

      return client.is_displayed_in_checkout()
        .catch(err => expect(err).toBe(false));
    });
  });
});
