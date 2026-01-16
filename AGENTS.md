# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router entrypoints (`app/layout.tsx`, `app/page.tsx`) and global styles (`app/globals.css`).
- `components/`: Page/feature components (e.g. `components/image-editor.tsx`) and UI primitives in `components/ui/` (shadcn/Radix-based).
- `hooks/`: Reusable React hooks (naming: `use-*.ts`).
- `lib/`: Shared utilities (e.g. `lib/utils.ts`).
- `public/`: Static assets served at `/` (images, icons).
- `styles/`: Additional global CSS (if used alongside `app/globals.css`).

Import aliases are configured via `tsconfig.json` and `components.json` (e.g. `@/components`, `@/lib`, `@/hooks`).

## Build, Test, and Development Commands

Use `pnpm` (lockfile: `pnpm-lock.yaml`).

```bash
pnpm install   # install dependencies
pnpm dev       # run local dev server (Next.js)
pnpm build     # production build
pnpm start     # run production server (after build)
pnpm lint      # run ESLint across the repo
```

## Coding Style & Naming Conventions

- TypeScript + React (strict mode enabled in `tsconfig.json`).
- Indentation: 2 spaces; prefer the existing repo style (double quotes, no semicolons).
- Components: `PascalCase` exported React components; file names typically `kebab-case.tsx`.
- Hooks: `useSomething` exported from `hooks/use-something.ts`.
- Prefer alias imports (e.g. `import { Button } from "@/components/ui/button"`).

## Testing Guidelines

No automated test framework is configured yet (no `test` script). For changes, verify:
- The page renders without console errors (`pnpm dev`).
- Core flows work (upload image, prompt entry, generate/clear actions).

If adding tests, introduce a `pnpm test` script and colocate tests under `__tests__/` or `tests/` with `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines

- Git history is not present in this checkout; use Conventional Commits by default: `feat:`, `fix:`, `chore:`, `refactor:`.
- PRs should include: a clear description, linked issue (if any), and screenshots/GIFs for any UI change.
- Keep PRs focused; avoid unrelated formatting churn in generated `components/ui/*` unless intentional.
