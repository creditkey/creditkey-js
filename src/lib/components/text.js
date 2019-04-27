import { api, pdpHost } from '../../utils/platform';

const Text = (key, label, type = "checkout", size = "medium", styles) => {
  const host = pdpHost(api);

  switch(type) {
    case "checkout":
      return `<span class="creditkey"><img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg" class="payment-icon">
          ${label}
          <a href="https://www.creditkey.com/credit-key-lending" class="action action-help" target="_new">See Terms</a>
        </span>`;
      break;

    case "pdp":
      return `<span class="creditkey"><a href="${host}/apply/start/${key}" target="_new" class="button is-link is-${size} is-fullwidth" style="${styles}">
          <span class="pdp is-size-4">${label}</span> <span class="is-size-4" style="padding: 0 5px 0 0;">with</span>
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg" /><span class="is-size-3 is-uppercase" style="padding: 0 0 0 5px;">Credit Key</span>
        </a>
      </span>`;
      break;

    default:
      return `<span class="creditkey"><img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg">
          ${label}
          <a href="https://www.creditkey.com/credit-key-lending" class="action action-help" target="_new">See Terms</a>
        </span>`;
  }
}

export default Text;
