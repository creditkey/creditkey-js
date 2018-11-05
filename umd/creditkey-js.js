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


var Checkout = function Checkout(source) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';

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


var modal = "bottom: 0; \
               left: 0; \
               position: absolute; \
               right: 0; \
               top: 0; \
               -webkit-box-align: center; \
                     -ms-flex-align: center; \
                         align-items: center; \
               display: none; \
               -webkit-box-orient: vertical; \
               -webkit-box-direction: normal; \
                   -ms-flex-direction: column; \
                       flex-direction: column; \
               -webkit-box-pack: center; \
                   -ms-flex-pack: center; \
                       justify-content: center; \
               overflow: hidden; \
               position: fixed; \
               z-index: 40; \
               display: -webkit-box; \
               display: -ms-flexbox; \
               display: flex;";

var modal_background = "bottom: 0; \
                          left: 0; \
                          position: absolute; \
                          right: 0; \
                          top: 0; \
                          background-color: rgba(10, 10, 10, 0.86); }";

var modal_card = "margin: 0 20px; \
                    height: calc(100vh - 160px); \
                    overflow: auto; \
                    position: relative; \
                    width: 600px; \
                    display: -webkit-box; \
                    display: -ms-flexbox; \
                    display: flex; \
                    -webkit-box-orient: vertical; \
                    -webkit-box-direction: normal; \
                        -ms-flex-direction: column; \
                            flex-direction: column; \
                    background-color: white; \
                    -ms-overflow-y: visible;";

var Modal = function Modal(source) {
    var body = document.body;
    var style = 'margin: auto; width: 100%; border: none; height: calc(100vh - 160px);';
    var iframe = "<iframe src=\"" + source + "\" style=\"" + style + "\"></iframe>";

    body.addEventListener('click', function (e) {
        return remove();
    });
    return body.insertAdjacentHTML('beforeend', "<div id=\"creditkey-modal\" style=\"" + modal + "\"><div style=\"" + modal_background + "\"></div><div style=\"" + modal_card + "\">" + iframe + "</div></div>");
};

function remove() {
    var el = document.querySelector('#creditkey-modal');
    el && document.body.removeEventListener('click', function (e) {
        return remove;
    });
    el && el.remove();
}

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});