# Tutorial: How to Achieve the "Editorial" Typography Look

To create a premium, "spread and uneven" look like the reference image, you need to control three specific CSS relationships. Here is how you do it manually in your `Hero.tsx`:

### 1. High-Contrast Typography Scale
The "look" comes from having one element be tiny and another element be massive.
- **Small (Eyebrow)**: Use `text-[12px]` with high tracking `tracking-[0.3em]`.
- **Massive (Headline)**: Use `text-[140px]` or `text-[180px]`. This is what makes it feel like a magazine cover.

### 2. The "Uneven" Stagger (Right Alignment)
To make the text look spread out and asymmetrical while keeping it right-aligned:
1. Set the container to `flex flex-col items-end`. This pins everything to the right edge.
2. Add a `margin-right` (e.g., `mr-12`, `mr-24`, or `mr-32`) to **only one** of the giant lines.
3. This "pushes" that specific line away from the right edge, creating the "staggered" or "uneven" effect.

```tsx
<div className="flex flex-col items-end">
  <span className="text-[180px]">תכשיטים</span>
  <span className="text-[150px] mr-32">נצחיים</span> {/* This 'mr-32' creates the uneven look */}
</div>
```

### 3. Tight Vertical Leading
Giant letters usually look best when they are stacked very close together.
- Use `leading-[0.85]` or `leading-none`.
- You can even use a negative margin-top like `mt-[-0.1em]` to "pull" the second line up into the first line's space.

### 4. Font Choices
In your current setup:
- **Sans (Heebo)**: Use for body text and tiny clean labels (`font-sans-custom`).
- **Serif (Libre Franklin)**: Use for elegant secondary headings (`font-serif-custom`).
- **Accent (Montserrat)**: Use for the giant bold architectural text (`font-accent-custom`).

---

### Step-by-Step Tweak Guide:
1. **To make it more "spread"**: Increase the `mr-XX` value on the second line of the heading.
2. **To make it more "intense"**: Decrease the `leading-XX` value to move lines closer.
3. **To scale for Mobile**: Use Tailwind's responsive prefixes (e.g., `text-[80px] md:text-[180px]`).
