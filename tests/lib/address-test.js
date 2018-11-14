import expect from 'expect'

import Address from '../../src/lib/address';

describe('Address', () => {
  describe('address validations', () => {
    it('rejects an address missing first name', () => {
      const address2 = new Address('', 'Tester', 'Test Co', 'test@test.com', 'Test Rd', null, 'Test Town', 'MA', '02130');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('rejects an address missing last name', () => {
      const address2 = new Address('Test', '', 'Test Co', 'test@test.com', 'Test Rd', null, 'Test Town', 'MA', '02130');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('rejects an address missing company name', () => {
      const address2 = new Address('Test', 'Tester', '', 'test@test.com', 'Test Rd', null, 'Test Town', 'MA', '02130');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('rejects an address missing email', () => {
      const address2 = new Address('Test', 'Tester', 'Test Co', '', 'Test Rd', null, 'Test Town', 'MA', '02130');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('rejects an address missing address 1', () => {
      const address2 = new Address('Test', 'Tester', 'Test Co', 'test@test.com', '', null, 'Test Town', 'MA', '02130');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('rejects an address missing city', () => {
      const address2 = new Address('Test', 'Tester', 'Test Co', 'test@test.com', 'Test Rd', null, null, 'MA', '02130');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('rejects an address missing state', () => {
      const address2 = new Address('Test', 'Tester', 'Test Co', 'test@test.com', 'Test Rd', null, 'Test Town', '', '02130');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('rejects an address missing zip', () => {
      const address2 = new Address('Test', 'Tester', 'Test Co', 'test@test.com', 'Test Rd', null, 'Test Town', 'MA', '');
      expect(address2.is_valid_address()).toBe(false);
    });

    it('accepts a valid address', () => {
      const address2 = new Address('Test', 'Tester', 'Test Co', 'test@test.com', 'Test Rd', null, 'Test Town', 'MA', '01230');
      expect(address2.is_valid_address()).toBe(true);
    });
  });
});
