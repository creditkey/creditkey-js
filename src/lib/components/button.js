const Button = (label, type, size = "medium", styles) => {
  switch(type) {
    case "checkout":
      return `<span id="creditkey"><a class="button is-link is-${size}" style="${styles}">
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg">
          <span class="is-size-3 is-uppercase" style="padding: 0 10px 0 5px;">Credit Key</span>
          ${label}
        </a>
        <a href="https://www.creditkey.com/credit-key-lending" class="is-size-5 terms" target="_new">See Terms</a>
      </span>`;
      break;

    case "pdp":
      return `<span id="creditkey"><a class="button is-link is-${size} is-fullwidth" style="${styles}">
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg">
          <span class="is-size-3 is-uppercase" style="padding: 0 10px 0 5px;">Credit Key</span>
          ${label}
        </a>
      </span>`;
      break;

    default:
      return `<span id="creditkey"><a class="button is-link is-${size}" style="${styles}">
          <img src="https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg">
          <span class="is-size-3 is-uppercase" style="padding: 0 10px 0 5px;">Credit Key</span>
          ${label}
        </a>
      </span>`;
  }
}

export default Button;
