# Iframe Height Adjuster Utility

This utility provides automatic height adjustment for CreditKey PDP iframes based on the body element's height.

## Purpose

When iframe content is loaded from CreditKey servers (e.g., pdp.html, cart.html), this utility automatically:
- Calculates the height of the body element
- Sends height updates to the parent window via postMessage
- Monitors for content changes and updates height accordingly
- Handles window resize events

## Usage

### In Iframe Content

Simply include this script in your iframe HTML:

```html
<!-- ES5 version (recommended for broad compatibility) -->
<script src="path/to/lib/utils/iframe-height-adjuster.js"></script>

<!-- OR ES module version -->
<script type="module" src="path/to/es/utils/iframe-height-adjuster.js"></script>
```

That's it! The script will automatically handle height adjustments.

## How It Works

1. **Initial Height**: Sends height on DOMContentLoaded and window.load events
2. **DOM Monitoring**: Uses MutationObserver to detect content changes
3. **Periodic Checks**: Fallback polling every 500ms to catch any missed changes
4. **Resize Handling**: Updates height when window is resized
5. **Optimization**: Only sends updates when height actually changes

## Height Calculation

The utility calculates height using:
```javascript
Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
)
```

This ensures the full content height is captured, including any overflow.

## Message Format

The utility sends postMessage with this format:
```javascript
{
  action: 'height',
  type: 'pdp',
  options: <calculated_height_in_pixels>
}
```

## Browser Compatibility

- **MutationObserver**: Modern browsers (IE11+)
- **Fallback Polling**: Works in all browsers if MutationObserver not available
- **postMessage**: Supported in all modern browsers

## Integration Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>CreditKey PDP</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div id="content">
        <!-- Your PDP content here -->
        <h1>Payment Options</h1>
        <p>Flexible financing available...</p>
    </div>
    
    <!-- Include the height adjuster utility -->
    <script src="path/to/lib/utils/iframe-height-adjuster.js"></script>
</body>
</html>
```

## Debugging

The utility logs errors to console if postMessage fails. Check browser console for:
```
Failed to send height update: <error>
```

## See Also

- [Dynamic Iframe Height Documentation](../docs/dynamic-iframe-height.md)
- Parent SDK implementation in `src/lib/components/iframes.js`
