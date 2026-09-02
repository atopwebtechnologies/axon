# Product Guidelines — Axon MicroBank Tutorial

## Voice & Tone

- **Educational first:** Every piece of writing — from README sections to code comments — should teach. Never assume; always explain *why*, not just *what*.
- **Direct and precise:** Use clear, concise language. Avoid jargon unless it is introduced and defined. Prefer active voice.
- **Encouraging:** This is a learning project. Language should be approachable and supportive, never condescending.
- **Developer-to-developer:** Write as a knowledgeable peer sharing what they've learned, not as a formal textbook.

## Documentation Standards

- Every service must have a dedicated `README.md` that covers: purpose, API contract, local setup, and environment variables.
- All public functions and API endpoints must have inline documentation (docstrings / JSDoc / OpenAPI annotations as appropriate for the language).
- Architecture decisions should be documented in `ADR` (Architecture Decision Record) files under `docs/adr/`.
- Code comments should explain *intent*, not restate what the code already says clearly.

## UX Principles (API & Developer Experience)

- **Consistency:** All APIs must follow the same naming conventions, error formats, and response envelope structure.
- **Clarity of errors:** Error responses must always include a machine-readable code and a human-readable message.
- **Discoverability:** Services should expose health-check and introspection endpoints to aid developer debugging.
- **Single-command start:** The entire system must be runnable with a single command (e.g., `docker compose up`).

## Branding

- **Project name:** Axon MicroBank Tutorial (use the full name in headings; "MicroBank" in shorthand references).
- **Tone in commit messages:** Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`, etc.).
- **Code style:** Consistent formatting enforced via linters; style guides stored in `axon/code_styleguides/`.
