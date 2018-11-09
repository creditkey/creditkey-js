# Credit Key Javascript SDK

## Table of Contents

- [Support](#support)
- [Requirements](#requirements)
- [Install](#install)
- [Overview](#overview)
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

## Configuring Checkout Display
-------------------------------

The `Checkout` method takes two arguments:

* **url** - Required - The url to load Credit Key Checkout.
* **type** - Optional - The type of Checkout experience, can be 'modal' or 'redirect', default to 'modal'

```sh
import { Checkout } from 'creditkey-js';

Checkout(url, type)
```


