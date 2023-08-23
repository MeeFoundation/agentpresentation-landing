---
layout: ../layouts/AboutLayout.astro
title: "Provider Discovery"
---

# Specification

Provider Discovery is a specification that defines how an app/site can discover information about one or more authentication, digital wallet, age verification, or other kinds providers a person chooses to disclose to this app/site via the browser/OS they are using to interact with it.

It does so by conveying to the app/site one or more triples of the form {"Provider", *protocol*, *config*} where:

- *protocol*: a string stating the protocol implemented by the provider. Values must be one of the following:
  - "SIOPv2" - the person has a self-issued OpenID provider 
  - "AgeProtectv1" - the person has an age verification service provider 
  - TBD...

- *config*: a URL that resolves to an Capability Discovery File

Note: the person's browser/OS may be configured to present a different set of tuples to different apps/sites. 

#### Web implementation

The "Provider" field is added by the browser to every HTTP request header:

	"Provider: <protocol>,<config>"

**Example**

	"Provider: OpenIDConnect, https://google.com/cdf.toml"`

#### Mobile implementation

[To be determined. The mobile OS (iOS, Android, etc.) needs to pass the "Provider" tuples to the app on startup. Perhaps on Android the [Content Provider] (https://developer.android.com/reference/android/content/ContentProvider) API could be used.]

## Provider Configuration File (PCF)

An PCF is a configuration file that contains metadata about one or more of the person's providers. The file is in TOML format and  has the following required fields:

- *title* - a string of value "Provider Configuration File"
- *version* - a string indicating the version of the PCF file format

The rest of the fields in the file are determined by the protocol used by the service. Each protocol has its own section of the PCF (e.g. "[SIOPv2]"),  followed by a set of zero or more fields and values.

**PCF Example** 

`title = "Provider Configuration File"`
`version = "1.0"  #version of Provider Discovery used by this file (e.g. 1.0)`

`[SIOPv2]`
`image = "https://mee.foundation/continue-with-mee-smartwallet.png"`
`SIOPAuthorize = "https://mee.foundation/authorize"`

