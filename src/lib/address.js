export default class Address {
  constructor(first_name, last_name, company_name, email, address1, address2, city, state, zip) {
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
    }
  }

  is_valid_address() {
    for (var p in this.address) {
      if ((!this.address[p] || this.address[p] === '') && p !== 'address2') {
        return false;
      }
    }

    return true;
  }
}
