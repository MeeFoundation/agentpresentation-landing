---
layout: ../layouts/AboutLayout.astro
title: "Agent Presentation"
---

# Specification

Agent Presentation is a specification that defines how the person's browser/OS presents to an app/site information about the person's agents. 

 one or more tuples of the form {"Agent", *protocol*, *agent-config*} where:

- *protocol*: a string defining the protocol implemented by the agent. Values are one of {"SIOPv2", "AgeProtectv1"}
- *agent-config*: a URL that resolves to an Agent Configuration File

Note: that the person's browser/OS could be configured to present a different set of tuples to different apps.

#### Web implementation

The "Agent" field is added by the browser to every HTTP request header:

    "Agent: <protocol>,<agent-config>"

#### Mobile implementation

[To be determined. The mobile OS (iOS, Android, etc.) needs to pass the "Agent" tuples to the app on startup. Perhaps on Android the  [Content Provider] (https://developer.android.com/reference/android/content/ContentProvider) API could be used.]

## Agent Configuration File (ACF)

An ACF is a TOML format file that has the following required fields:

- *title* - a string of value "Agent Configuration File"
- *version* - a string indicating the version of the ACF file format

The rest of the fields in the file are determined by the protocol. Each protocol has its own section of the ACF (e.g. "[SIOPv2]"),  followed by a set of zero or more fields and values.

