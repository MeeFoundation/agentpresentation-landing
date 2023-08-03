---
layout: ../layouts/AboutLayout.astro
title: "Agent Presentation"
---

Agent Presentation is a mechanism wherein the person's browser/OS presents to the app/site one or more tuples consisting of: {*protocol*, *agent-config*} where:
- *protocol*: a string defining the protocol implemented by the agent. The string value is a member of a controlled vocabulary that is standardized by a standards body yet to be determined
- *agent-config*: a URL that resolveds to an Agent Configuration File (ACF) in TOML syntax whose semantics are defined by the protocol

## ACF file format

An ACF is a TOML format file. It has the following required field:
- title - value must be 
"Agent Configuration File"
- version - a string indicating the version of the ACF file format

The rest of the fields in the ACF are determined by the protocol. Each protocol would have its own section of the ACF, followed by a set of zero or more fields.

## Web implementation

The "Agent" field is added by the browser to every HTTP request header:

    "Agent: <protocol>,<agentID>"

## Mobile implementation

[To be determined. The mobile OS (iOS, Android, etc.) needs to pass the "Agent" tuples to the app on startup.]