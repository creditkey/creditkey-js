import styles from '../../styles/index.sass';
import { api, pdpHost } from '../../utils/platform';

const Text = (key, label, type = "checkout", size = "medium", slug = "", styles) => {
  const host = pdpHost(api);
  const btn_url = s => 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-btn-' + s + '.svg';

  switch(type) {
    case "checkout":
      return `<div id="ck-payment-wrapper" class="loader-wrapper" style="position: relative;">
          <div id="ck-loader" style="position: absolute; left: 50%; z-index: 2; font-size: 3em;"></div>
          <span class="creditkey" style="cursor: pointer">
            <img src="${btn_url(size)}" class="payment-icon" />
            ${size == 'small' ? label.replace('Approval in seconds.', '') : label}
            <a href="${slug}" class="action action-help terms" target="_new">See Terms</a>
          </span>
          <div id="ck-payment-overlay"></div>
        </div>`;
      break;

    case "pdp":
      return `<span class="creditkey"><a href="${host}/apply/start/${key}" target="_new" class="is-fullwidth" style="${styles}">
          <span class="pdp-text">${label} with </span><img src="${btn_url(size)}" class="payment-icon">
        </a>
      </span>`;
      break;

    default:
      return `<span class="creditkey"><img src="${btn_url(size)}">
          ${label}
          <a href="${terms_url}" class="action action-help terms" target="_new">See Terms</a>
        </span>`;
  }
}

export default Text;
