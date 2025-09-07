
# React Component Development Assignment

Tech: React · TypeScript · TailwindCSS · Storybook

## What's inside
- `InputField` with label, helper, error, disabled/invalid/loading states, variants (filled/outlined/ghost), sizes (sm/md/lg), clear button, password toggle, light/dark.
- `DataTable` with sorting, row selection, loading and empty states.
- Storybook stories for both components.
- Basic tests with Vitest + Testing Library.
- Simple demo page at `/`.

## Scripts
```bash
npm i
npm run dev          # run demo app (Vite)
npm run storybook    # run Storybook
npm run build        # build app
npm run build-storybook
npm run test
```

## Structure
```
src/
  components/
    InputField.tsx
    DataTable.tsx
    InputField.stories.tsx
    DataTable.stories.tsx
  components/__tests__/
    InputField.test.tsx
    DataTable.test.tsx
  App.tsx
  main.tsx
  index.css
.storybook/
  main.ts
  preview.ts
```
## Notes
- Tailwind `darkMode: 'class'`. Toggle in demo header.
- Minimal ARIA: `aria-invalid`, `aria-busy`, `aria-describedby`, `aria-sort`.
- Sorting is simple and adequate for demo use.
