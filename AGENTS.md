# Credit Key JavaScript SDK

## Repository scope

This repository is the Credit Key JavaScript SDK. Application source is in
`src/`; Vitest tests are in `tests/`. The tracked `es/`, `lib/`, and `umd/`
directories contain the ES module, CommonJS, and UMD bundle outputs.

Read [README.md](README.md) for SDK usage and
[CONTRIBUTING.md](CONTRIBUTING.md) for development prerequisites and commands.
There is currently no `ARCHITECTURE.md` or ADR collection in this repository.

## Local workflow

- Use Node `>=22.20.0` and install dependencies with `npm install`.
- Run tests once with `npm test`; run coverage with `npm run test:coverage`.
- Build bundle outputs with `npm run build`; remove them with `npm run clean`.
- The Dockerfile is an optional legacy image-build path: it uses Node 14 and
  Yarn, so it is not the canonical local workflow.

## Making changes

- Keep source changes in `src/` and tests in `tests/`; use the configured
  `tests/**/*.test.js` discovery pattern.
- When source changes affect published bundles, run `npm run build` and review
  the resulting tracked `es/`, `lib/`, and `umd/` changes.
- For code changes, run focused tests plus the applicable `npm test` and/or
  `npm run build` validation before completion.
- For documentation changes, run `git diff --check` before completion.
