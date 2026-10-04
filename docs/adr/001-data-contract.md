# ADR 001: Data Contract & Schema Architecture
**Author:** CeazDawg  
**Status:** Accepted  

## Context
We need explicit data contract validation for property listings, detail cards, and local sponsors prior to rendering components or storing records.

## Decision
1. **Single Source of Truth:** Used Zod to generate runtime schemas and derive TypeScript types (`z.infer<typeof PropertySchema>`).
2. **Strict Mode:** Enforced `.strict()` to reject undeclared schema fields (`additionalProperties: false`).
3. **Normalized Entities:** Explicitly defined separate objects for `Property` and `Sponsor` entities.

## Alternatives Considered
- **Standard JSON Schema + Ajv:** Required duplicate typing efforts in TypeScript.
- **Free-text Amenities:** Created unpredictable query results for AI voice and search interfaces.

## Consequences
- Data anomalies are caught immediately at system boundaries before hitting the UI.
- Tests verify bad inputs fail safely.

