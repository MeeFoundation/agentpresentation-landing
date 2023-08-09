---
layout: ../layouts/AboutLayout.astro
title: "Agent Presentation"
---

# Specification

Agent Presentation is a specification that defines how a person's browser/OS presents to an app/site information about that person's agents. It does so by conveying to the app/site one or more triples of the form {"Agent", *protocol*, *config*} where:

- *protocol*: a string defining the protocol implemented by the agent. Values are one of {"SIOPv2", "AgeProtectv1"}
- *config*: a URL that resolves to an Agent Configuration File

Note: that the person's browser/OS could be configured to present a different set of tuples to different apps.

#### Web implementation

The "Agent" field is added by the browser to every HTTP request header:

	"Agent: <protocol>,<config>"

**Example**

	"Agent: OpenIDConnect, https://google.com/acf.toml"`

#### Mobile implementation

[To be determined. The mobile OS (iOS, Android, etc.) needs to pass the "Agent" tuples to the app on startup. Perhaps on Android the  [Content Provider] (https://developer.android.com/reference/android/content/ContentProvider) API could be used.]

## Agent Configuration File (ACF)

An ACF is a TOML format file that has the following required fields:

- *title* - a string of value "Agent Configuration File"
- *version* - a string indicating the version of the ACF file format

The rest of the fields in the file are determined by the protocol. Each protocol has its own section of the ACF (e.g. "[SIOPv2]"),  followed by a set of zero or more fields and values.

**ACF Example** 

`title = "Agent Configuration File"`
`version = "1.0"  #version of Agent Presentaion used by this file (e.g. 1.0)`

`[SIOPv2]`
`image = "https://mee.foundation/continue-with-mee-smartwallet.png"`
`SIOPAuthorize = "https://mee.foundation/authorize"`

