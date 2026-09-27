---
company: "Stratus (GTP)"
role: "Senior Full-Stack Software Engineer"
start: "2025"
end: "2026"
summary: "Modernizing a fabrication SaaS platform through test infrastructure, legacy-system decoupling, and AI-assisted engineering."
featured: true
draft: false
---

## Making change safer

At Stratus, I worked on a multi-tenant platform for mechanical, electrical, and
plumbing fabrication. My work combined full-stack development with the testing
and analysis tools needed to change a tightly coupled system.

I decomposed a 6,800-line frontend monolith into testable domain modules and
guided technical quality through cross-repository design and code reviews.
Alongside that work, I designed and guided regression-validation tooling,
including historical-data checks for a custom reporting engine, and personally
built integration tests to support legacy-system decoupling.

## Building the engineering tools

- Established automated quality gates across 20 application domains, creating
  JavaScript unit-test infrastructure and replacing manual browser checks with
  deterministic integration tests in CI. After a successful pilot, the gates
  became required on every pull request and part of the standards for new engineers.
- Built a C#/JavaScript call-graph analyzer and coverage analytics for an
  880-test end-to-end suite, giving a service-decoupling initiative dependency
  and test evidence.
- Introduced a nine-agent workflow for codebase-coupling audits, interface
  extraction, and repository-pattern refactoring. Other bug-fixing teams adopted
  the workflow.

## Exploring a new interface

For a solo hackathon project, I built a prototype MCP server in Python that let
customers' AI agents operate the platform as a user would. The working demo
applied model-viewer filters and actions to group parts into assemblies and
packages.
