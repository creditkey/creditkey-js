import { api, pdpHost } from '../../utils/platform';

const Text = (key, label, type = "checkout", size = "medium", styles) => {
  const host = pdpHost(api);

  let font_size;

  switch(size) {
    case 'small':
      font_size = 5;
      break;
    case 'large':
      font_size = 2;
      break;
    default:
      font_size = 4;
  }

  switch(type) {
    case "checkout":
      return `<span class="creditkey"><img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg" class="payment-icon">
          <span class="is-size-${font_size}">${label}</span>
          <a href="https://www.creditkey.com/credit-key-lending" class="action action-help is-size-${font_size}" target="_new">See Terms</a>
        </span>`;
      break;

    case "pdp":
      return `<span class="creditkey"><a href="${host}/apply/start/${key}" target="_new" class="is-${size} is-fullwidth" style="${styles}">
          <span class="pdp-text is-size-${font_size}">${label}</span> <span class="is-size-${font_size}" style="padding: 0 5px 0 0;">with</span>
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg" class="payment-icon">
        </a>
      </span>`;
      break;

    default:
      return `<span class="creditkey"><img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg">
          <span class="is-size-${font_size}">${label}</span>
          <a href="https://www.creditkey.com/credit-key-lending" class="action action-help is-size-${font_size}" target="_new">See Terms</a>
        </span>`;
  }
}

export default Text;
