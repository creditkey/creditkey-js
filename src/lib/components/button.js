import { api, pdpHost } from '../../utils/platform';

const Button = (key, label, type, size = "medium", styles) => {
  const host = pdpHost(api);
  const terms_url = "https://www.creditkey.com/credit-key-lending";
  const logo_url = s => 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-logo-white-' + s + '.svg';

  let buttonClass;

  switch (size) {
    case 'small':
      buttonClass = "is-small";
      break;
    case 'medium':
      buttonClass = "is-normal";
      break;
    case 'large':
      buttonClass = "is-fullwidth";
      break;
  }

  switch(type) {
    case "checkout":
      return `<span class="creditkey"><a class="button is-link ${buttonClass}" style="${styles}">
          <img src="${logo_url(size)}" class="ck-logo-${size}" />
          ${label}
        </a>
        <a href="${terms_url}" class="terms" target="_new">See Terms</a>
      </span>`;
      break;

    case "pdp":
      return `<span class="creditkey"><a href="${host}/apply/start/${key}" target="_new" class="button is-link ${buttonClass}" style="${styles}">
          <span class="pdp">${label}</span> <span style="padding: 0 5px 0 0; font-size: 16px !important;">with</span>
          <img src="${logo_url(size)}" class="ck-logo-${size} "/>
        </a>
      </span>`;
      break;

    default:
      return `<span class="creditkey"><a class="button is-link ${buttonClass}" style="${styles}">
          <img src="${logo_url(size)}" class="ck-logo-${size}" />
          ${label}
        </a>
        <a href="${terms_url}" class="terms" target="_new">See Terms</a>
      </span>`;
  }
}

export default Button;
