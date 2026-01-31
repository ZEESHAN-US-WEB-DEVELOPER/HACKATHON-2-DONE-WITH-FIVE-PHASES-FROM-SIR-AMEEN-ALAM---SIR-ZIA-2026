<!--
Sync Impact Report
- Version change: – → 1.0.0
- Modified principles: N/A (initial authoring)
- Added sections: Core Principles; Operational Constraints & Technology Guardrails; Development Workflow & Quality Gates; Governance
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check mirrors new rules)
  - ✅ .specify/templates/spec-template.md (stories + requirements enforce determinism and constraints)
  - ✅ .specify/templates/tasks-template.md (task phases map to spec-first delivery)
  - ✅ .claude/commands/sp.constitution.md (guidance already aligned)
- Follow-up TODOs: None
-->

# In-Memory Console-Based Todo Application (Phase I) Constitution

## Core Principles

### I. Spec-Driven Development
- Every code, test, or CLI command MUST originate from an approved feature spec in `specs/<feature>/spec.md`.
- Specs MUST enumerate CRUD capabilities, user journeys, and acceptance criteria before any implementation starts.
- Changes that deviate from the spec MUST loop back through `/sp.specify` prior to coding.
*Rationale:* Keeps the console experience coherent and prevents ad-hoc scope creep.

### II. Deterministic CLI Experience
- CLI commands MUST produce deterministic output for identical input sequences, including ordering of todos and error text.
- All commands operate via stdin/stdout only; prompts and confirmations MUST be explicit and documented.
- Error messages MUST guide the user back to a valid command without ambiguity.
*Rationale:* Determinism guarantees predictable automation and testing.

### III. Pure In-Memory State
- Runtime state lives exclusively in Python in-memory data structures; no files, databases, or network calls are permitted.
- Application state resets on exit; session persistence is out of scope for Phase I.
- Data structures MUST be designed for future replacement with persistence layers without rewriting CLI contracts.
*Rationale:* Enforces Phase I constraint while keeping the door open for later phases.

### IV. Separation of Concerns
- Logic that manipulates todo data MUST reside in pure functions/classes decoupled from CLI parsing or printing.
- CLI adapters MAY orchestrate flows but cannot own data structures or side effects beyond IO.
- Shared modules MUST expose deterministic APIs so future platforms (web, AI, cloud) can reuse them unchanged.
*Rationale:* Enables reuse and testing without terminal dependencies.

### V. Simplicity with Forward Extensibility
- Prefer the smallest viable data models (id, title, description, status, timestamps) until the spec mandates more.
- Reject abstractions and helper layers unless ≥2 features require them; duplication is acceptable to maintain clarity.
- When adding extensibility hooks, document the future scenario they unlock in the spec/plan pair.
*Rationale:* Keeps Phase I lean while signaling deliberate upgrade paths.

### VI. Quality Guardrails
- CRUD flows MUST include happy path and error-path tests (unit or behavior-level) before implementation (Red-Green-Refactor).
- Input validation MUST cover empty lists, invalid indices, and unsupported commands.
- Observability consists of structured console logs or debug traces when `--debug` is provided; default output remains user-focused.
*Rationale:* Prevents regressions and improves diagnosability even without external tooling.

## Operational Constraints & Technology Guardrails

- Language: Python 3.11+ using only the standard library unless the constitution explicitly approves a dependency.
- Runtime: Console-only application; no GUI frameworks, HTTP servers, or background daemons.
- Performance: CRUD commands MUST complete in <100ms for up to 1,000 in-memory todos on commodity hardware.
- Security: No secrets stored; input is trusted from the console user but still validated to avoid crashes.
- Accessibility: Output MUST remain plain text; avoid color codes that break basic terminals.

## Development Workflow & Quality Gates

1. **Spec → Plan → Tasks Flow**: `/sp.specify` defines stories, `/sp.plan` derives architecture, `/sp.tasks` enumerates work. Implementation cannot skip stages.
2. **Constitution Check Gate**: Every plan MUST cite how it satisfies Principles I–VI. Violations require documented justification plus mitigation tasks.
3. **Code Review & Testing**:
   - All changes require peer or AI review referencing spec sections.
   - Tests (unit/integration) MUST fail before code changes (Red) and pass after (Green).
   - Manual CLI validation scripts SHOULD accompany complex flows to document reproducible steps.
4. **Versioned Artifacts**: Each feature directory MUST include research, data-model, contracts, and quickstart outputs before code merges.

## Governance

- This constitution supersedes all other development guidance; conflicting documents MUST be updated or deprecated.
- Amendments require: (a) proposal referencing impacted principles, (b) review by project owner, (c) simultaneous updates to dependent templates, and (d) semantic version bump per change scope.
- Ratification changes occur via `/sp.constitution` and MUST log a Prompt History Record plus sync impact summary.
- Compliance reviews happen at each major milestone; violations block release until remediated or granted an explicit, time-boxed waiver recorded in specs/tasks.
- Versioning policy: `MAJOR.MINOR.PATCH` where MAJOR removes or redefines principles, MINOR adds principles/sections, and PATCH clarifies wording without normative impact.

**Version**: 1.0.0 | **Ratified**: 2026-01-04 | **Last Amended**: 2026-01-04
