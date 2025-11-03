# Dynamic Height for PDP Iframe

## Overview

The `#creditkey-pdp-iframe` element now supports dynamic height adjustment based on the content loaded from the source URL. This allows the iframe to resize automatically to fit its content without requiring manual height configuration.

## How It Works

The iframe listens for `postMessage` events from the iframe content to dynamically update its height. This is useful when the content height varies based on:
- Different product pricing
- Varying promotional messages
- Different screen sizes or orientations
- Dynamic content updates

## Usage

### From Iframe Content

To update the parent iframe's height based on the body element, send a postMessage from within the iframe:

```javascript
// Inside the iframe content
// Calculate height from body element
const height = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
);

const message = {
  action: 'height',
  type: 'pdp',
  options: height  // Height in pixels (must be a positive number)
};

window.parent.postMessage(JSON.stringify(message), '*');
```

**Note**: The height should be calculated from the body element's `scrollHeight` to ensure the entire content is visible, including any overflow.

### Message Format

The postMessage must contain a JSON string with the following structure:

```javascript
{
  "action": "height",      // Required: Must be "height"
  "type": "pdp",           // Required: Must be "pdp" for PDP iframes
  "options": 150           // Required: Height in pixels (positive integer)
}
```

### Validation

The height update will only be applied if:
1. The `action` is `"height"`
2. The `type` is `"pdp"`
3. The `options` value is a positive number
4. The `#creditkey-pdp-iframe` element exists in the DOM

Invalid values (negative numbers, strings, etc.) will be ignored and the iframe height will remain unchanged.

## CSS Changes

The PDP iframe styling has been updated to support dynamic height:

```css
#creditkey-pdp-iframe {
  width: 100% !important;
  min-height: 50px !important;        /* Minimum height */
  height: auto !important;            /* Allows dynamic height */
  transition: height 0.3s ease-in-out !important; /* Smooth transition */
}
```

### Previous Behavior

Previously, the iframe had a fixed maximum height:
```css
max-height: 70px !important;  /* Old - removed */
```

### New Behavior

- **Minimum height**: 50px (prevents iframe from becoming too small)
- **Height**: Auto (allows dynamic sizing)
- **Transition**: Smooth 0.3s animation when height changes
- **Maximum height**: No fixed maximum, grows based on content

## Example Integration

### Option 1: Automatic Height Adjustment (Recommended)

For iframe content hosted on CreditKey servers, include the helper script to automatically adjust height based on the body element:

```html
<!-- In the iframe content (e.g., pdp.html) -->
<!-- Use the ES5 version for broad browser compatibility -->
<script src="path/to/creditkey-js/lib/utils/iframe-height-adjuster.js"></script>

<!-- Or use the ES module version -->
<script type="module" src="path/to/creditkey-js/es/utils/iframe-height-adjuster.js"></script>
```

This script automatically:
- Calculates height based on the body element's `scrollHeight`
- Sends initial height on page load
- Monitors DOM changes and updates height automatically
- Handles window resize events
- Only sends updates when height changes

The helper is available in the built SDK at:
- ES5: `lib/utils/iframe-height-adjuster.js`
- ES modules: `es/utils/iframe-height-adjuster.js`
- Source: `src/utils/iframe-height-adjuster.js`

### Option 2: Manual Height Updates

For custom implementations, manually send height updates:

```javascript
// In the iframe content (e.g., pdp.html)
window.addEventListener('load', function() {
  // Calculate the required height from body element
  const contentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  
  // Send height update to parent
  const message = {
    action: 'height',
    type: 'pdp',
    options: contentHeight
  };
  
  window.parent.postMessage(JSON.stringify(message), '*');
});

// Update height when content changes
function updateHeight() {
  const contentHeight = document.body.scrollHeight;
  const message = {
    action: 'height',
    type: 'pdp',
    options: contentHeight
  };
  window.parent.postMessage(JSON.stringify(message), '*');
}
```

## Testing

Comprehensive tests have been added to verify the functionality:

```bash
npm test
```

The test suite includes:
- Creating iframe with correct ID
- Handling dynamic height updates via postMessage
- Ignoring invalid height values
- Ignoring negative height values
- Ignoring height messages without pdp type
- Pointer-events configuration

## Browser Compatibility

This feature uses standard browser APIs:
- `postMessage` (widely supported)
- `getElementById` (all browsers)
- CSS transitions (all modern browsers)

## Security

The implementation includes validation to prevent security issues:
- Height values are parsed as integers using `parseInt()`
- Only positive numbers are accepted
- String values and script tags are rejected
- No direct HTML manipulation occurs

## Backward Compatibility

This change is backward compatible:
- Existing PDP iframes will continue to work
- If no postMessage is sent, the iframe maintains auto height
- The minimum height (50px) ensures the iframe is always visible

## Notes

- The height update is type-specific (`type: 'pdp'`), so it doesn't interfere with modal iframe height updates
- Modal iframe height updates are handled separately in `modal.js`
- The transition effect provides a smooth user experience during height changes
- Multiple height updates can be sent as content changes dynamically
