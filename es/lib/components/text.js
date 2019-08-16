import styles from '../../styles/index.sass';
import { api, pdpHost } from '../../utils/platform';

var Text = function Text(key, label) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "checkout";
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var styles = arguments[4];

  var host = pdpHost(api);
  var terms_url = "https://www.creditkey.com/credit-key-lending";
  var btn_url = function btn_url(s) {
    return 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-btn-' + s + '.svg';
  };

  switch (type) {
    case "checkout":
      return '<span class="creditkey">\n          <img src="' + btn_url(size) + '" class="payment-icon" />\n          ' + (size == 'small' ? label.replace('Approval in seconds.', '') : label) + '\n          <a href="' + terms_url + '" class="action action-help" target="_new">See Terms</a>\n        </span>';
      break;

    case "pdp":
      return '<span class="creditkey"><a href="' + host + '/apply/start/' + key + '" target="_new" class="is-fullwidth" style="' + styles + '">\n          <span class="pdp-text">' + label + '</span> <span style="padding: 0 5px 0 0; font-size: 16px !important;">with</span>\n          <img src="' + btn_url(size) + '" class="payment-icon">\n        </a>\n      </span>';
      break;

    default:
      return '<span class="creditkey"><img src="' + btn_url(size) + '">\n          ' + label + '\n          <a href="' + terms_url + '" class="action action-help" target="_new">See Terms</a>\n        </span>';
  }
};

export default Text;