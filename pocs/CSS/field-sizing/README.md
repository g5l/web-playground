# CSS `field-sizing` POC

This demo shows how `field-sizing` lets form fields size themselves to their contents.

- **Modes:** Toggle between `field-sizing: content` and `field-sizing: fixed`.
- **Controls:** Text inputs, numbers, selects (width), and textareas (height).
- **Constraints:** See how `min/max-width` and `min/max-height` cap growth.
- **Fallback:** If unsupported, textareas auto-expand with small JS.

## Run

Just open `public/index.html` in your browser (no build step needed).

## Notes

- `field-sizing: content` makes inputs/selects grow to the width of their content and textareas grow to the height of their content.
- Use bounds via `min/max-width` or `min/max-height` to avoid layout breakage.
- Browser support is rolling out (great in Chromium-based browsers). If you need older browsers, keep your current JS autosize for textareas and progressive enhance where supported.

### References

- MDN: *field-sizing* — overview and values.
- Chrome for Developers: introduction, examples, and current support.
- CSS-Tricks Almanac: practical notes & examples.

