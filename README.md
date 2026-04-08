# ironbound-partner

A governed AI partner interface powered by the E.L.E.N.A. architecture.

`ironbound-partner` is the user-facing layer of a governed AI system.  
It does not act directly on user requests.

Instead, every request is sent to `elena-v1`, which serves as the governance and runtime decision layer.

This creates a hard execution boundary:

**User -> Partner -> E.L.E.N.A. Gate -> Decision -> Allowed Response/Action**

## What this repo is

`ironbound-partner` is the interface layer for E.L.E.N.A. v2.

Its job is to:
- receive user input
- send that input to the E.L.E.N.A. decision service
- interpret the returned governance decision
- only continue when the request is approved

This repo is not a generic chatbot and not an unrestricted autonomous agent.

It is a governed partner interface designed to work with a separate decision engine.

## Current architecture

### `ironbound-partner`
User-facing interface layer.

### `elena-v1`
Governance and runtime decision layer.

`elena-v1` evaluates requests through:
- intent classification
- constraint enforcement
- drift detection
- deterministic routing

## Validated runtime paths

The current v2 bridge has been tested locally with three decision paths:

- benign request -> `APPROVED`
- ambiguous request -> `CLARIFICATION_REQUIRED`
- deceptive request -> `REFUSED`

## Why this matters

This architecture separates interaction from governance.

That means:
- the partner handles conversation
- E.L.E.N.A. handles safety and control logic
- no response or action is allowed until the governance layer evaluates the request

This makes the system more traceable, inspectable, and extensible than a single-layer assistant.

## Governance flow

1. User sends a request to `ironbound-partner`
2. `ironbound-partner` sends the request to `elena-v1`
3. `elena-v1` evaluates the request
4. `elena-v1` returns a decision
5. `ironbound-partner` obeys that decision

## Example decision outcomes

- `APPROVED`
- `CLARIFICATION_REQUIRED`
- `REFUSED`
- `ESCALATED`
- `HALT`

## E.L.E.N.A. v2 milestone

The governed bridge between `ironbound-partner` and `elena-v1` is now implemented and working locally.

This establishes the core E.L.E.N.A. v2 architecture:

**User -> Partner -> E.L.E.N.A. Gate -> Decision -> Allowed Response/Action**
