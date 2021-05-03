# Credit Key Javascript SDK

## Table of Contents

- [Support](#support)
- [Requirements](#requirements)
- [Install](#install)
- [Overview](#overview)
- [Models](#models)
- [Check for Credit Key Checkout](#check-for-credit-key-checkout)
- [Obtain Checkout URL](#obtain-checkout-url)
- [Configuring Checkout Display](#configuring-checkout-display)
- [Configuring Apply Now Display](#configuring-apply-now-display)
- [Configuring Checkout and Product Page Display](#configuring-marketing-display)
- [Configuring User Total Line of Credit Display](#configuring-user-total-line-of-credit-display)

## Support
----------

You should have been put in contact with an Implementation Support Engineer at Credit Key.  You can directly contact your Support Engineer with any questions or to receive implementation assistance.

## Requirements
---------------
The `get_pdp_display` method takes one argument:

charges - Required - A Charges object

At this time, only checkout and product page displays are supported.
When a charges object is supplied, with subtotal, shipping, tax, discount and grand total amounts, then the returned text calculates and displays the monthly payment amount.

```javascript
import ck from 'creditkey-js';

const client = new ck.Client(your_credit_key_public_key, 'production');

let pdpBanner;

client.get_pdp_display()
  .then(res => pdpBanner = res);
```

The `get_cart_display` method takes three argument:

charges - Required - A Charges object <br />
desktop - Optional - “left”, “right”, “centered” <br />
mobile - Optional - “left”, “right”, “centered”

At this time, only checkout and product page displays are supported.
When a charges object is supplied, with subtotal, shipping, tax, discount and grand total amounts, then the returned text calculates and displays the monthly payment amount.
 
 ```javascript
import ck from 'creditkey-js';

const client = new ck.Client(your_credit_key_public_key, 'production');

let cartBanner;

client.get_cart_display()
  .then(res => cartBanner = res);
```

The Credit Key Javascript SDK requires Node 8.x or higher and NPM 5.x or higher. Depending on your setup the following dependencies may also need to be present: 

`babel-loader` <br /> `@babel/core` <br /> `@babel/preset-env` <br /> `node-sass`

## Install
----------

```
npm install creditkey-js
```

The Credit Key Javascript SDK can also be installed via a script tag using the UNPKG CDN.  It is then available as a global variable `ck` or as a UMD module.

```javascript
<script crossorigin src="https://unpkg.com/creditkey-js@<latest-version>/umd/creditkey-js.js"></script>
```

## Overview
-----------

[Credit Key](https://www.creditkey.com) checkout works similarly as services like [PayPal](https://www.paypal.com) in the sense that the user will be redirected to special checkout pages hosted on [creditkey.com](https://www.creditkey.com) to complete the checkout process.

A real world example of Credit Key implemented in a React app is available [here](https://github.com/creditkey/ck-react).

The Credit Key [Merchant Implementation Guide](https://github.com/creditkey/docs/blob/master/implementation-guide.md) guide should be reviewed before performing a merchant integration with Credit Key via SDK. It should familiarize you with the general requirements of a merchant implementation.


## Models
---------

### Address

This object is used to represent either a billing or shipping address.  All arguments are required except `address2`

```javascript
import ck from 'creditkey-js';

const billingAddress = new ck.Address(first_name, last_name, company_name, email, address1, address2, city, state, zip, phone_number);

billingAddress.data.first_name;
billingAddress.data.last_name;
...
```

### Charges

This object represents total order charges, discounts applied, tax and shipping amounts. ```total``` refers to the subtotal (without shipping and taxes), and ```grandTotal``` refers to the grand total after shipping, taxes, and discounts applied.  Each field should be a floating point value.

```shipping```, ```tax```, and ```discountAmount``` can be ```null``` or ```0``` if the value is not applicable to this purchase.

```javascript
import ck from 'creditkey-js';
const charges = new ck.Charges(total, shipping, tax, discountAmount, grandTotal)

charges.data.total;
charges.data.shipping;
...
```

### CartItem

This object represents a product in the user's shopping cart. ```sku```, ```size```, and ```color``` are all optional and can be ```null```.  The ```merchantProductId``` is the key referring to the product on the merchant system.

```javascript
import ck from 'creditkey-js';

const item = new ck.CartItem(merchantProductId, name, price, sku, quantity, size, color);

item.data.merchant_id;
item.data.name;
...
```

## Check for Credit Key Checkout
--------------------------------

Credit key Checkout must be enabled on a per merchant basis. It is advisable to check that Credit Key Checkout is available prior to displaying it.

NOTE: The Client method take an optional platform argument.  This can be 'staging' or 'production' and determines the appropriate Credit Key API to use when sending requests. Default is 'development' and expects a local Credit Key API at 'localhost:9100'.

```javascript
import ck from 'creditkey-js';

const client = new ck.Client(your_credit_key_public_key, 'production');

let isCreditKeyDisplayed = false,
    cartItems = [new ck.CartItem(...), new ck.CartItem(...)];

client.is_displayed_in_checkout(cartItems)
  .then(response => isCreditKeyDisplayed = response);
```

## Obtain Checkout URL
---------------------------------------------

The Credit Key API provides an endpoint to start a checkout experience.  A valid request to this endpoint returns a url to be used when displaying the Credit Key Checkout experience, either as a modal or redirect.

```javascript
import ck from 'creditkey-js';

const client = new ck.Client(your_credit_key_public_key, 'production');
const billingAddress = new ck.Address(...);
const shippingAddress = new ck.Address(...);
const charges = new ck.Charges(...);
const cartItems = [new ck.CartItem(...), new ck.CartItem(...), ...];
const remoteId = your_order_id;
const customerId = your_customer_id;
const returnUrl = 'your url to send the customer back to after completing credit key checkout';
const cancelUrl = 'your url to return the customer to if they cancel out of the credit key checkout';

// Optional
const mode = 'modal';

const merchantData = {
  myDataKey: 'my value'
};

client.begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, mode, merchantData);
  .then(response => ck.checkout(response.checkout_url));
```


## Configuring Checkout Display
-------------------------------

The `checkout` method takes two arguments:

* **url** - Required - The url to load Credit Key Checkout.
* **type** - Optional - The type of Checkout experience, can be 'modal' or 'redirect', defaults to 'modal'

```javascript
import ck from 'creditkey-js';

ck.checkout(url, type)
```

## Configuring Apply Now Display
-------------------------------

The `apply` method takes three arguments:

* **key** - Required - Your Credit Key public key
* **type** - Optional - The type of Apply Now experience, can be 'modal' or 'redirect', defaults to 'modal'
* **platform** - Optional - The platform to load the Apply Now experience from, can be 'development', 'staging' or 'production', defaults to 'production'

```javascript
import ck from 'creditkey-js';

ck.apply(key);
```

## Configuring Marketing Display
--------------------------------

The `get_marketing_display` method takes four arguments:

* **charges** - Optional - A Charges object
* **type** - Optional - Type of marketing copy to retrieve, defaults to 'checkout', options are 'checkout' and 'pdp'
* **display** - Optional - Type of marketing display to retrieve, defaults to 'button', options are 'button' and 'text'
* **size** - Optional - Type of marketing dispay size to retrieve, defaults to 'medium', options are 'small', 'medium' and 'large'

At this time, only checkout and product page displays are supported.

When a charges object is supplied, with subtotal, shipping, tax, discount and grand total amounts, then the returned text calculates and displays the monthly payment amount.

```javascript
import ck from 'creditkey-js';

const client = new ck.Client(your_credit_key_public_key, 'production');

let marketingText;

client.get_marketing_display()
  .then(res => marketingText = res);
```

## Configuring User Total Line of Credit Display
--------------------------------

The `get_customer` method takes two arguments:

* **email** - required - The email of your customer (should be the same email used to establish their Credit Key account)
* **customer_id** - required - Your internal, unqiue id for the customer (should be the same as the remote_customer_id sent during begin_checkout)

returns a json payload with `status`, `amount` and `amount_available`

`status` is the customer's underwriting status and will be "declined", "pending" or "approved"

**NOTE:** if a customer was declined, then they will not have a line of credit.  In that case this method will *only* return the customer's underwriting status

```javascript
import ck from 'creditkey-js';

const client = new ck.Client(your_credit_key_public_key, 'production');

let userTcl;

client.get_customer()
  .then(res => userTcl = res)
  .then(() => console.log(userTcl.status, userTcl.amount, userTcl.amount_available));
```
