# @apply, @layer, and When to Extract

**POC goal:** show what breaks and what holds across three approaches to button abstraction in Tailwind.

## The three models

### 1. `@apply` outside `@layer`

```css
@reference "tailwindcss";
.btn-primary {
  @apply px-5 py-2.5 bg-indigo-500 ...;
}
```

Unlayered CSS beats every Tailwind utility class. Adding `bg-red-500` to the element in HTML has no effect because `.btn-primary` sits outside any layer and wins the specificity fight unconditionally.

### 2. `@apply` inside `@layer components`

```css
@layer components {
  .btn-layer {
    @apply px-5 py-2.5 bg-indigo-500 ...;
  }
}
```

`@layer utilities` outranks `@layer components`, so utility overrides applied in HTML now work. The override problem is solved, but you are back to writing utility classes in HTML, which raises the question of why you extracted anything in the first place.

### 3. Inline utilities (component model)

No CSS written. Variants map to a different class string, not a new CSS rule:

```jsx
<Button />
<Button variant="danger" />
```

Each variant is a prop. The component owns the class-to-token mapping. Refactors touch one file.

## The one-off variant problem

A designer asks for a teal CTA on one page.

| Model | What it costs |
|---|---|
| `@apply` outside `@layer` | Write `.btn-teal { @apply bg-teal-500; }`. CSS grows with every request. |
| `@apply` in `@layer components` | Add `bg-teal-500 hover:bg-teal-600` to the element. You are composing utilities again. |
| Component | Pass `color="teal"`. Zero CSS. Propagates everywhere. |

## Key takeaway

`@apply` outside `@layer` creates specificity landmines. Inside `@layer components` is better but every override pushes you back to writing utilities. The component model is the real answer: variants become props, not CSS rules, and the entire styling surface lives in one place.

## Files

- `index.html` — live demo with all three models side by side
- `btn.css` — the `@apply` and `@layer components` definitions
