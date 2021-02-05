import styles from '../../styles/index.sass';
import { api, pdpHost } from '../../utils/platform';

var Text = function Text(key, label, type, size, slug, styles, extra) {
  if (type === void 0) {
    type = "checkout";
  }

  if (size === void 0) {
    size = "medium";
  }

  if (slug === void 0) {
    slug = "";
  }

  if (styles === void 0) {
    styles = "";
  }

  if (extra === void 0) {
    extra = "none";
  }

  var host = pdpHost(api);

  var btn_url = function btn_url(s) {
    return 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-btn-' + s + '.svg';
  };

  var learnMoreLink = slug !== '' ? slug : host + '/learn-more';

  switch (type) {
    case "checkout":
      return "<span class=\"creditkey\">\n          <img src=\"" + btn_url(size) + "\" class=\"payment-icon\" />\n          " + (size == 'small' ? label.replace('Approval in seconds.', '') : label) + "\n          <a href=\"" + slug + "\" class=\"action action-help terms\" target=\"_new\">See Terms</a>\n        </span>";
      break;

    case "pdp":
      if (extra === 'static') {
        return "<div class=\"creditkey\" style=\"display: flex; align-items: center; cursor: pointer;\">\n            <div class=\"pdp-text\" style=\"margin: 0 5px;\">" + label + " with</div>\n            <img src=\"" + btn_url(size) + "\" class=\"payment-icon\" />\n            <a href=\"" + learnMoreLink + "\" target=\"_new\" style=\"display: " + (size === 'special' ? 'inline-block' : 'none') + ";\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-info.png\" style=\"height: 19px !important;\" /></a>\n          </div>";
      } else {
        return "<div class=\"creditkey\" style=\"display: flex; align-items: center; cursor: pointer;\">\n            <a href=\"" + host + "/apply/start/" + key + "\" target=\"_new\" style=\"margin: 0 5px;\" " + styles + "\"><div class=\"pdp-text\">" + label + " with</div></a>\n            <a href=\"" + host + "/apply/start/" + key + "\" target=\"_new\" style=\"" + styles + "\"><img src=\"" + btn_url(size) + "\" class=\"payment-icon\" /></a>\n            <a href=\"" + learnMoreLink + "\" target=\"_new\" style=\"display: " + (size === 'special' ? 'inline-block' : 'none') + ";\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-info.png\" style=\"height: 19px !important;\" /></a>\n          </div>";
      }

      break;

    default:
      return "<span class=\"creditkey\"><img src=\"" + btn_url(size) + "\">\n          " + label + "\n          <a href=\"" + terms_url + "\" class=\"action action-help terms\" target=\"_new\">See Terms</a>\n        </span>";
  }
};

export default Text;