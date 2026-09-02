# Task Management Landing Page — With AXON

A pure HTML/CSS task-management landing page built through AXON's spec-driven workflow.

The `axon/` directory contains the product context, guidelines, stack, workflow, and implementation pathway used to guide the build. The page itself is in `index.html`; the hero image is a local asset in `assets/`.

## Run

Serve this folder with:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Validate

```sh
node tests/landing-page.test.mjs
tidy -errors -quiet index.html
```
