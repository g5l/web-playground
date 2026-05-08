# BEM / SCSS vs Tailwind

**POC goal:** render the same profile card twice, one in BEM + SCSS and one in Tailwind utility classes, so the mental model difference is visible in the markup.

## The core tradeoff

**BEM names things. Tailwind composes things.**

### BEM + SCSS

Every element gets a class that describes its role in the component:

```html
<article class="card card--featured">
  <div class="card__header">
    <div class="card__avatar">SC</div>
    <span class="card__badge">Featured</span>
  </div>
  ...
</article>
```

The SCSS file owns all visual decisions. The HTML is declarative and readable. Changing how every card looks means editing one place. The cost: an extra file to maintain, a naming convention to enforce, and a context switch between HTML and CSS when debugging.

### Tailwind

No class names to invent. Every visual decision lives inline:

```html
<article class="w-full max-w-[300px] bg-white rounded-2xl border border-indigo-200 overflow-hidden
                shadow-[0_0_0_3px_rgba(99,102,241,.12),0_4px_16px_rgba(0,0,0,.10)]">
```

The HTML is the source of truth. Adding a one-off style costs nothing. The cost: verbose markup and no single place to update a shared visual decision (unless you extract to a component).

## When each model fits

| Situation | Lean toward |
|---|---|
| Server-rendered HTML with no component abstraction layer | BEM |
| React / Vue / Svelte components where JSX is the extraction point | Tailwind |
| Design tokens managed centrally in SCSS variables | BEM |
| Rapid prototyping or co-locating styles with behavior | Tailwind |

## Files

- `index.html` — both card implementations side by side
- `card.scss` — BEM structure and all visual rules for the left-hand card
