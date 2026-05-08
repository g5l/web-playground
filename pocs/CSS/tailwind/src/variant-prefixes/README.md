# Variant Prefixes

**POC goal:** show how every major category of Tailwind variant prefix compiles to CSS and how they stack on a single element.

## How variants compile

| Variant type | What Tailwind emits |
|---|---|
| `hover:bg-indigo-500` | `.hover\:bg-indigo-500:hover { ... }` |
| `md:hover:bg-violet-500` | `@media (min-width: 768px) { .md\:hover\:...:hover { ... } }` |
| `dark:bg-slate-800` | `:where(.dark, .dark *) .dark\:bg-slate-800 { ... }` |
| `focus-visible:ring-2` | `.focus-visible\:ring-2:focus-visible { ... }` |
| `disabled:opacity-40` | `.disabled\:opacity-40:disabled { ... }` |
| `aria-expanded:text-indigo-600` | `[aria-expanded="true"] .aria-expanded\:... { ... }` |
| `data-[state=open]:opacity-100` | `[data-state="open"] .data-\[state\=open\]\:... { ... }` |
| `[&>p]:text-sm` | `.selector > p { font-size: .875rem }` |

## Ordering convention

Write: **base** → **state** → **responsive**

```
hover:bg-indigo-600  md:hover:bg-violet-500
```

This reads "what happens, then where it applies." The CSS is identical regardless of the order in the class string; convention exists for readability only.

## Sections in the demo

### hover, focus-visible, active, disabled

An enabled and a disabled button. Tab into the enabled button to see the keyboard-only `focus-visible:` ring, which `hover:` never triggers. `disabled:` stacks last so it wins over `hover:` unconditionally.

### md: stacked with hover:

One element with a different hover border color below and above 768 px. The `md:hover:` class only fires when both conditions are true simultaneously.

### dark: stacked with hover:

Four states on one element: light base, light hover, dark base, dark hover. Toggle dark mode with the header button.

### aria-expanded:

The button's `aria-expanded` attribute drives its label color via `aria-expanded:`. A child SVG rotates via `group-aria-expanded:` inherited from the parent with `group`. Zero class-list manipulation in JS; only the attribute changes.

### data-[state=open]:

An arbitrary data-attribute variant. JS sets `data-state` to `"open"` or `"closed"`. Opacity, transform, and pointer-events all follow from the Tailwind variant without a conditional class string.

## Files

- `index.html` — all sections with live demos and code blocks showing the exact Tailwind classes used
