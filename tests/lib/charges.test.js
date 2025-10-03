import expect from 'expect'

import Charges from '../../src/lib/charges';

describe('Charges', () => {
  describe('charges validations', () => {
    it('rejects an invalid total charge', ()=> {
      const charge = new Charges('test', '8.95', 0, 0, 0);
      expect(charge.validate_charges()).toBe(false);
    });

    it('rejects an invalid grand total', () => {
      const charge = new Charges('100.00', '8.95', 0, 0, 'not a valid number');
      expect(charge.validate_charges()).toBe(false);
    });

    it('rejects an invalid shipping amount when present', () => {
      const charge = new Charges('100.00', 'invalid shipping', 0, 0, '108.95');
      expect(charge.validate_charges()).toBe(false);
    });

    it('rejects an invalid tax amount when present', () => {
      const charge = new Charges('100.00', '8.95', 'invalid tax amount', 0, '108.95');
      expect(charge.validate_charges()).toBe(false);
    });

    it('rejects an invalid discount amount when present', () => {
      const charge = new Charges('100.00', '8.95', 0, 'invalid discount amount', '108.95');
      expect(charge.validate_charges()).toBe(false);
    });

    it('accepts a valid set of charges', () => {
      const charge = new Charges('100.00', '8.95', '5.00', '10', '108.95');
      expect(charge.validate_charges()).toBe(true);
    });
  });
});
