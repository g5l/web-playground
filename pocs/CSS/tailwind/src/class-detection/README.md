# Class Detection in Tailwind

**POC goal:** demonstrate that Tailwind scans source files as plain text, not as code, and show two ways to handle dynamic class names safely.

## The rule

Tailwind tokenizes source files by splitting on whitespace and quotes. A token that matches a known utility class gets included in the output CSS. A token that does not match gets ignored, regardless of what it evaluates to at runtime.

```js
// Three tokens at build time: 'bg-' | color | '-500'
// None matches a class. The CSS is never generated.
const cls = 'bg-' + color + '-500'

// One token: 'bg-red-500'
// Matches. The CSS is generated.
const cls = 'bg-red-500'
```

## The three demos

### 1. Dynamic construction (broken)

```js
const cls = 'bg-' + c + '-700'
el.className = cls
```

The class string is assembled at runtime. At build time, Tailwind sees three separate tokens. None matches a utility class. The CSS rule is never written. The element gets the class in the DOM but has no visual effect.

### 2. Lookup table (works)

```js
const map = {
  red:   'bg-red-500',
  blue:  'bg-blue-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
}
```

Each value is a complete, unbroken string literal. Tailwind finds and includes them all at build time. The dynamic logic selects which literal to use at runtime, not how to construct it.

### 3. `@source inline()` (works)

```css
@source inline("bg-{fuchsia,lime,sky,pink}-500");
```

Brace expansion tells Tailwind to generate the full cross-product of classes. The JS can then construct the class string dynamically at runtime because the CSS was force-generated at build time.

## When to use each fix

| Situation | Fix |
|---|---|
| Small, fixed set of color/size options | Lookup table |
| Large or unknown set of combinations (e.g. all 50 shades) | `@source inline()` with brace expansion |
| Classes coming from a CMS or API | Safelist in `tailwind.css` via `@source inline()` |

## Files

- `index.html` — all three demos with live `getComputedStyle` proof on every swatch
