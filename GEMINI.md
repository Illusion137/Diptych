# Gemini Project Instructions

You are an automated coding agent working inside a React + Vite + TypeScript project.
All code you generate must strictly follow the rules below.

---

## 1. Tech Stack

This project uses:

-   React (with Hooks only, no class components)
-   Vite
-   TypeScript (strict mode)
-   ESLint
-   Prettier
-   TailwindCSS
-   MathQuill via `react-mathquill`

All code must be compatible with this stack.

---

## 2. Naming Conventions

### Variables

-   MUST use **snake_case**
-   Applies to:
    -   local variables
    -   state variables
    -   props
    -   destructured values
    -   refs
    -   derived values

```ts
const cursor_position = 0;
const latex_string = useState("");
const is_focused = true;
```
