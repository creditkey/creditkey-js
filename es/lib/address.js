function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function () {
  function Address(first_name, last_name, company_name, email, address1, address2, city, state, zip, phone_number) {
    _classCallCheck(this, Address);

    this.data = {
      first_name: first_name,
      last_name: last_name,
      company_name: company_name,
      email: email,
      address1: address1,
      address2: address2 || '',
      city: city,
      state: state,
      zip: zip,
      phone_number: phone_number || ''
    };
  }

  Address.prototype.is_valid_address = function is_valid_address() {
    for (var p in this.data) {
      if ((!this.data[p] || this.data[p] === '') && p !== 'address2') {
        return false;
      }
    }

    return true;
  };

  return Address;
}();

export { Address as default };