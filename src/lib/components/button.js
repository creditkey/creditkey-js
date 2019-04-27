import { api, pdpHost } from '../../utils/platform';

const Button = (key, label, type, size = "medium", styles) => {
  const host = pdpHost(api);

  switch(type) {
    case "checkout":
      return `<span class="creditkey"><a class="button is-link is-${size}" style="${styles}">
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg">
          <span class="is-size-3 is-uppercase" style="padding: 0 10px 0 5px;">Credit Key</span>
          ${label}
        </a>
        <a href="https://www.creditkey.com/credit-key-lending" class="is-size-5 terms" target="_new">See Terms</a>
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
      return `<span class="creditkey"><a class="button is-link is-${size}" style="${styles}">
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg">
          <span class="is-size-3 is-uppercase" style="padding: 0 10px 0 5px;">Credit Key</span>
          ${label}
        </a>
        <a href="https://www.creditkey.com/credit-key-lending" class="is-size-5 terms" target="_new">See Terms</a>
      </span>`;
  }
}

export default Button;
