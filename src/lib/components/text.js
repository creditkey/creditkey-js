const Text = (label, type = "checkout", size = "medium", styles) => {
  switch(type) {
    case "checkout":
      return `<span id="creditkey"><img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg" class="payment-icon">
          ${label}
          <a href="https://www.creditkey.com/credit-key-lending" class="action action-help" target="_new">See Terms</a>
        </span>`;
      break;

    case "pdp":
      return `<span id="creditkey"><a class="is-${size} button is-text is-fullwidth" style="${styles}">
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark.svg">
          <span class="is-size-3 is-uppercase" style="padding: 0 10px 0 5px;">Credit Key</span>
          ${label}
        </a>
      </span>`;
      break;

    default:
      return `<span id="creditkey"><img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg">
          ${label}
          <a href="https://www.creditkey.com/credit-key-lending" class="action action-help" target="_new">See Terms</a>
        </span>`;
  }
}

export default Text;
