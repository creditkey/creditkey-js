import styles from '../../styles/index.sass';
import { api, pdpHost } from '../../utils/platform';

const Text = (key, label, type = "checkout", size = "medium", slug = "", styles = "", extra = "none", platform = "development") => {
  const host = pdpHost(api, platform);
  const btn_url = s => 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-btn-' + s + '.svg';

  const learnMoreLink = slug !== '' ? slug : host + '/learn-more';

  switch(type) {
    case "checkout":
      return `<span class="creditkey">
          <img src="${btn_url(size)}" class="payment-icon" />
          ${size == 'small' ? label.replace('Approval in seconds.', '') : label}
          <a href="${slug}" class="action action-help terms" target="_new">See Terms</a>
        </span>`;
      break;

    case "pdp":
      if (extra === 'static') {
        return `<div class="creditkey" style="display: flex; align-items: center; cursor: pointer;">
            <div class="pdp-text" style="margin: 0 5px;">${label} with</div>
            <img src="${btn_url(size)}" class="payment-icon" />
          </div>`;
      } else {
        return `<div class="creditkey" style="display: flex; align-items: center; cursor: pointer;">
            <a href="${host}/apply/start/${key}" target="_new" style="margin: 0 5px;" ${styles}"><div class="pdp-text">${label} with</div></a>
            <a href="${host}/apply/start/${key}" target="_new" style="${styles}"><img src="${btn_url(size)}" class="payment-icon" /></a>
          </div>`;
      }
      
      break;

    default:
      return `<span class="creditkey"><img src="${btn_url(size)}">
          ${label}
          <a href="${terms_url}" class="action action-help terms" target="_new">See Terms</a>
        </span>`;
  }
}

export default Text;
