import { api, pdpHost } from '../../utils/platform';

const Button = (key, label, type, size = "medium", styles) => {
  const host = pdpHost(api);
  const terms_url = "https://www.creditkey.com/credit-key-lending";
  const logo_url = "https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-logo-white.svg";
  const logo_height = 35;

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
      return `<span class="creditkey"><a class="button is-link is-${size}" style="${styles}">
          <img src="${logo_url}" class="ck-logo-${size}" />
          <span class="is-size-${font_size}">${label}</span>
        </a>
        <a href="${terms_url}" class="is-size-5 terms" target="_new">See Terms</a>
      </span>`;
      break;

    case "pdp":
      return `<span class="creditkey"><a href="${host}/apply/start/${key}" target="_new" class="button is-link is-${size} is-fullwidth" style="${styles}">
          <span class="pdp is-size-${font_size}">${label}</span> <span class="is-size-${font_size}" style="padding: 0 5px 0 0;">with</span>
          <img src="${logo_url}" class="ck-logo-${size}" />
        </a>
      </span>`;
      break;

    default:
      return `<span class="creditkey"><a class="button is-link is-${size}" style="${styles}">
          <img src="${logo_url}" class="ck-logo-${size}" />
          <span class="is-size-${font_size}">${label}</span>
        </a>
        <a href="${terms_url}" class="is-size-5 terms" target="_new">See Terms</a>
      </span>`;
  }
}

export default Button;
