'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function () {
  function Address(first_name, last_name, company_name, email, address1, address2, city, state, zip) {
    _classCallCheck(this, Address);

    this.address = {
      first_name: first_name,
      last_name: last_name,
      company_name: company_name,
      email: email,
      address1: address1,
      address2: address2 || '',
      city: city,
      state: state,
      zip: zip
    };
  }

  Address.prototype.is_valid_address = function is_valid_address() {
    for (var p in this.address) {
      if ((!this.address[p] || this.address[p] === '') && p !== 'address2') {
        return false;
      }
    }

    return true;
  };

  return Address;
}();

exports.default = Address;
module.exports = exports['default'];