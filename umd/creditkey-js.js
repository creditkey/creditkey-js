/*!
 * creditkey-js v1.0.0
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ck"] = factory();
	else
		root["ck"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_checkout__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Checkout", function() { return __WEBPACK_IMPORTED_MODULE_0__lib_checkout__["a"]; });




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redirect__ = __webpack_require__(6);



var height = window.screen.availHeight;
var width = window.screen.availWidth;

var Checkout = function Checkout(source) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';

  // always use redirect for small devices
  if (width <= 479) return Object(__WEBPACK_IMPORTED_MODULE_1__redirect__["a" /* default */])(source);

  if (type.toLowerCase() === 'modal') {
    return Object(__WEBPACK_IMPORTED_MODULE_0__modal__["a" /* default */])(source);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Checkout);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_sass__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_index_sass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_modal__ = __webpack_require__(5);



var Modal = function Modal(source) {
  var body = document.body;
  var style = 'margin: auto; width: 100%; border: none; height: calc(100vh - 160px);';
  var iframe = '<iframe src="' + (source + '?modal=true') + '" style="' + style + '"></iframe>';

  body.addEventListener('click', function (e) {
    return remove();
  });
  return body.insertAdjacentHTML('beforeend', '<div id="creditkey-modal" style="' + __WEBPACK_IMPORTED_MODULE_1__styles_modal__["a" /* modal */] + '"><div style="' + __WEBPACK_IMPORTED_MODULE_1__styles_modal__["b" /* modal_background */] + '"></div><div style="' + __WEBPACK_IMPORTED_MODULE_1__styles_modal__["c" /* modal_card */] + '">' + iframe + '</div></div>');
};

function remove() {
  var el = document.querySelector('#creditkey-modal');
  el && document.body.removeEventListener('click', function (e) {
    return remove;
  });
  el && el.remove();
}

window.addEventListener('message', function (e) {
  event = JSON.parse(e.data);

  // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
  if (event.action === 'cancel' && event.type === 'modal') {
    remove();
  } else if (event.action == 'complete' && event.type == 'modal') {
    window.location.href = event.options;
  }
}, false);

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return modal_background; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return modal_card; });
/* unused harmony export modal_head */
var modal = "bottom: 0;\n                       left: 0;\n                       position: absolute;\n                       right: 0;\n                       top: 0;\n                       -webkit-box-align: center;\n                             -ms-flex-align: center;\n                                 align-items: center;\n                       display: none;\n                       -webkit-box-orient: vertical;\n                       -webkit-box-direction: normal;\n                           -ms-flex-direction: column;:%\n                               flex-direction: column;\n                       -webkit-box-pack: center;\n                           -ms-flex-pack: center;\n                               justify-content: center;\n                       overflow: hidden;\n                       position: fixed;\n                       z-index: 40;\n                       display: -webkit-box;\n                       display: -ms-flexbox;\n                       display: flex;";

var modal_background = "bottom: 0;\n                                  left: 0;\n                                  position: absolute;\n                                  right: 0;\n                                  top: 0;\n                                  background-color: rgba(10, 10, 10, 0.86); }";

var modal_card = "margin: 0 20px;\n                            height: calc(100vh - 160px);\n                            overflow: auto;\n                            position: relative;\n                            width: 600px;\n                            display: -webkit-box;\n                            display: -ms-flexbox;\n                            display: flex;\n                            -webkit-box-orient: vertical;\n                            -webkit-box-direction: normal;\n                                -ms-flex-direction: column;\n                                    flex-direction: column;\n                            background-color: white;\n                            -ms-overflow-y: visible;";

var modal_head = "-webkit-box-align: center;\n                                 -ms-flex-align: center;\n                                     align-items: center;\n                             background-color: white;\n                             display: -webkit-box;\n                             display: -ms-flexbox;\n                             display: flex;\n                             -ms-flex-negative: 0;\n                                 flex-shrink: 0;\n                             -webkit-box-pack: start;\n                                 -ms-flex-pack: start;\n                                     justify-content: center;\n                             padding: 20px;\n                             position: relative;\n                             border-bottom: 1px solid #dbdbdb;\n                             border-top-left-radius: 6px;\n                             border-top-right-radius: 6px;";

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Redirect = function Redirect(source) {
  return window.location.href = source;
};

/* harmony default export */ __webpack_exports__["a"] = (Redirect);

/***/ })
/******/ ]);
});