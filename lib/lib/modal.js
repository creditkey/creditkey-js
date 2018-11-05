"use strict";

exports.__esModule = true;

require("../styles/index.sass");

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

exports.default = Modal;
module.exports = exports["default"];