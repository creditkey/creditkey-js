import styles from '../../styles/index.sass';
import { api, pdpHost } from '../../utils/platform';

const Text = (key, label, type = "checkout", size = "medium", styles) => {
  const host = pdpHost(api);
  const terms_url = "https://www.creditkey.com/credit-key-lending";
  const btn_url = s => 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-btn-' + s + '.svg';

  switch(type) {
    case "checkout":
      return `<span class="creditkey">
          <img src="${btn_url(size)}" class="payment-icon" />
          ${size == 'small' ? label.replace('Approval in seconds.', '') : label}
          <a href="${terms_url}" class="action action-help" target="_new">See Terms</a>
        </span>`;
      break;

    case "pdp":
      return `<span class="creditkey"><a href="${host}/apply/start/${key}" target="_new" class="is-fullwidth" style="${styles}">
          <span class="pdp-text">${label}</span> <span style="margin: 0 5px 0 0; font-size: 16px !important;">with</span><img src="${btn_url(size)}" class="payment-icon">
        </a>
      </span>`;
      break;

    default:
      return `<span class="creditkey"><img src="${btn_url(size)}">
          ${label}
          <a href="${terms_url}" class="action action-help" target="_new">See Terms</a>
        </span>`;
  }
}

export default Text;
