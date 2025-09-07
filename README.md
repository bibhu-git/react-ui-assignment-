# React Component Development Assignment

Two reusable UI components built with **React**, **TypeScript**, **TailwindCSS**, and **Storybook**.

---

##  Structure
```
src/
  components/        # InputField, DataTable + stories + tests
  App.tsx            # Demo page
.storybook/          # Storybook config
```

---

##  Setup

npm install
npm run dev        # run demo app
npm run storybook  # open Storybook
npm run test       # run tests
```

---

## Components
- **InputField** – label, helper, error states, variants (filled/outlined/ghost), sizes, clear button, password toggle, light/dark mode.  
- **DataTable** – sortable columns, row selection, loading and empty states.

---

## Approach
I focused on building **clean, reusable, and accessible components**.  
- *InputField*: flexible API with variants and optional features.  
- *DataTable*: simple but extendable table with sorting and selection.  
- Documented in Storybook and tested with Vitest for reliability.  
