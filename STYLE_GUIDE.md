# Portfolio Style Guide

This portfolio uses a calm editorial system: warm paper-like background, near-black text, muted supporting copy, thin borders, and very little decoration.

## Visual Principles

- Prioritize clarity, restraint, and legibility.
- Use whitespace and hierarchy before color or effects.
- Prefer a quiet premium feel over a polished SaaS look.
- Keep interfaces text-led and structurally simple.
- Add motion sparingly and only when it clarifies state or context.

## Core Tokens

- Background: `#f8f6f1`
- Surface: `rgba(255, 255, 255, 0.7)`
- Text: `#111111`
- Muted text: `rgba(17, 17, 17, 0.66)`
- Soft border: `rgba(17, 17, 17, 0.1)`
- Soft shadow: `0 14px 32px rgba(17, 17, 17, 0.04)`

## Typography

- Use a clean sans-serif stack for body copy and UI.
- Use a serif editorial face for headings, feature statements, and quotes.
- Uppercase micro-labels should be small, tracked, and muted.
- Body copy should stay readable and spacious, usually around `leading-7` to `leading-8`.
- Headings should be balanced and avoid awkward line breaks.

## Layout

- Center content in a narrow container and widen only when needed.
- Use thin dividers to define sections instead of heavy cards.
- Let spacing separate content blocks.
- Keep reading layouts narrow and focused.
- Use grids for metadata, not complex nested structures.

## Component Patterns

- Navigation should use rounded pills with subtle active states.
- Lists should rely on dividers and rhythm, not boxed panels.
- Links should feel understated, with tiny arrow cues where helpful.
- Forms should be simple, bordered, transparent, and low-noise.
- Detail pages should have strong hierarchy, section separators, and restrained metadata.
- Any status or telemetry surface should feel editorial, not dashboard-heavy.

## Interaction

- Hover states should be small: background tint, text darkening, or slight movement.
- Transitions should be short and subtle, around 150 to 160ms.
- Focus states should be visible but understated.
- Respect reduced-motion preferences.

## Content Voice

- Be concise, factual, and specific.
- Avoid hype, marketing language, and filler.
- Describe systems, workflows, and outcomes clearly.
- Keep copy calm and consistent.

## Reusable Prompt For Future Projects

Use this prompt when you want ChatGPT or Codex to create or refactor UI in the same style:

```text
Apply the portfolio site visual system:
- Calm editorial minimalism with a warm light background and near-black text
- Muted secondary copy, thin borders, and soft translucent surfaces
- Serif display headings paired with a clean sans-serif body stack
- Uppercase micro-labels with wide tracking for metadata and section titles
- Generous whitespace, narrow reading widths, and divider-based layouts
- Rounded pills for navigation and actions with subtle active states
- Short, restrained hover and focus states; avoid flashy motion
- Prefer lists, rules, and typography over heavy cards or bright accents
- Keep copy concise, factual, and premium but understated
- Add motion only when it clarifies state or content
```

## Quick Implementation Checklist

- Start with `Container`, section dividers, and page-intro patterns.
- Use the serif font only for hierarchy.
- Keep borders soft and surfaces translucent.
- Avoid saturated colors unless they carry meaning.
- Make every section feel readable without extra decoration.
