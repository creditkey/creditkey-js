# Credit Key Javascript SDK

## Table of Contents

- [Support](#support)
- [Requirements](#requirements)
- [Install](#install)
- [Overview](#overview)
- [Check for Credit Key Checkout](#check-for-credit-key-checkout)
- [Configuring Checkout Display](#configuring-checkout-display)

## Support
----------

You should have been put in contact with an Implementation Support Engineer at Credit Key.  You can directly contact your Support Engineer with any questions or to receive implementation assistance.

## Requirements
---------------

The Credit Key Javascript SDK requires Node 8.x or higher and NPM 5.x or higher.

## Install
----------

```sh
npm install creditkey-js
```

## Overview
-----------

[Credit Key](https://www.creditkey.com) checkout works similarly as services like [PayPal](https://www.paypal.com) in the sense that the user will be redirected to special checkout pages hosted on [creditkey.com](https://www.creditkey.com) to complete the checkout process.

At this time the [Credit Key Javascript SDK](https://www.creditkey.com) only supports how the Credit Key checkout experience is displayed.  The options are either a full page redirect, or a modal overlay.

## Check for Credit Key Checkout
--------------------------------

Credit key Checkout must be enabled on a per merchant basis. It is advisable to check that Credit Key Checkout is available prior to displaying it.

```sh
import Client from 'creditkey-js';

const client = new Client(your_credit_key_public_key);

let isCreditKeyDisplayed = false;

client.is_displayed_in_checkout()
  .then(response => isCreditKeyDisplayed = response);
```

## Obtain Checkout URL
---------------------------------------------

The Credit Key API provides an endpoint to start a checkout experience.  A valid request to this endpoint returns a url to be used when displaying the Credit Key Checkout experience, either as a modal or redirect.

```sh
import Checkout, Client, { Address, Charges } from 'creditkey-js';

const client = new Client(your_credit_key_public_key);
const billingAddress = new Address(...);
const shippingAddress = new Address(...);
const charges = new Charges(...);
const cartItems = new CartItems(...);
const remoteId = your_order_id;
const customerId = your_customer_id;
const returnUrl = 'your url to send the customer back to after completing credit key checkout';
const cancelUrl = 'your url to return the customer to if they cancel out of the credit key checkout';

client.begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl);
  .then(response => Checkout(response.checkout_url));
```


## Configuring Checkout Display
-------------------------------

The `Checkout` method takes two arguments:

* **url** - Required - The url to load Credit Key Checkout.
* **type** - Optional - The type of Checkout experience, can be 'modal' or 'redirect', defaults to 'modal'

```sh
import Checkout from 'creditkey-js';

Checkout(url, type)
```


