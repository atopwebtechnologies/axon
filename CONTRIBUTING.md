# Contributing to AXON

Thanks for helping improve AXON.

AXON is an open-source Atop Web Technologies project for spec-driven AI-agent
workflows. Contributions should keep the plugin installable, readable, and
useful across coding agents and IDE environments.

## Development Principles

- Keep protocols explicit and testable.
- Preserve compatibility with slash-command based agent plugins.
- Prefer clear engineering language over heavy metaphor.
- Keep AXON artifacts under `axon/` in target projects.
- Preserve Apache-2.0 license and upstream attribution.

## Contribution Flow

1. Fork the repository.
2. Create a focused branch.
3. Make a small, reviewable change.
4. Validate plugin metadata and edited skills.
5. Open a pull request with a concise summary and test notes.

## Validation

Before opening a pull request, validate JSON manifests and any edited skills.

```bash
python3 -m json.tool plugin.json >/dev/null
python3 -m json.tool .claude-plugin/plugin.json >/dev/null
python3 -m json.tool .claude-plugin/marketplace.json >/dev/null
python3 -m json.tool .codex-plugin/plugin.json >/dev/null
claude plugin validate .
```

If you have access to Codex skill validation scripts, also run the plugin and
skill validators before submitting.

## Reviews

All contributions should be reviewed before merging. Reviews prioritize:

- broken command wiring
- stale branding
- unsafe git/revert behavior
- unclear user interaction flows
- missing validation notes
