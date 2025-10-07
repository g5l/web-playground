# js-lint

Simple proof-of-concept JavaScript linter that runs a few custom rules against a target file.

## Requirements
- Node.js >= 18

## Usage
- Lint a file: `npm run lint -- path/to/file.js`

## Available Rules
- `noConsole` — flags any usage of `console.*`.
- `noDebugger` — flags any `debugger` statements.
- `indent` — flags lines whose leading spaces are not a multiple of 2 (enforces 2‑space indentation).
- `maxLineLength` — flags lines longer than 120 characters.

Rules live under `rules/` and export an object with a `name` and a `run(code, filePath)` function that returns an array of findings.

## Example
### Bad

<img width="746" height="163" alt="image" src="https://github.com/user-attachments/assets/29460376-be85-43cc-9238-6b07fea701ae" />

### Good
<img width="742" height="104" alt="image" src="https://github.com/user-attachments/assets/fc6d5759-9e3f-4245-a081-b35cc73f76e8" />


## Project Structure
- `index.js` — CLI entry that loads and runs rules.
- `rules/` — custom lint rules.

## Scripts
- `npm start` — alias for running the linter.
- `npm run lint -- <file>` — lints the specified file.

This is a minimal POC and does not implement autofix.
