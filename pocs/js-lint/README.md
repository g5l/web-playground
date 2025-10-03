# js-lint (POC)

Simple proof-of-concept JavaScript linter that runs a few custom rules against a target file.

## Requirements
- Node.js >= 18

## Usage
- Lint a file: `npm run lint -- path/to/file.js`

## Available Rules
- `noConsole` — flags any usage of `console.*`.
- `noDebugger` — flags any `debugger` statements.

Rules live under `rules/` and export an object with a `name` and a `run(code, filePath)` function that returns an array of findings.

## Project Structure
- `index.js` — CLI entry that loads and runs rules.
- `rules/` — custom lint rules.

## Scripts
- `npm start` — alias for running the linter.
- `npm run lint -- <file>` — lints the specified file.

This is a minimal POC and does not implement autofix.
