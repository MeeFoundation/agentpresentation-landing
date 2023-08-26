---
layout: ../layouts/AboutLayout.astro
title: "Provider Discovery"
---

# Specification

Provider Discovery is a specification that defines how an app/site can discover information about one or more authentication, digital wallet, age verification, or other types of providers a person chooses to disclose to this app/site via the browser/OS they are using to interact with it. 

It also supports a feature that might be called *provider announcement*. This allows the client to  announce support for one or more types of providers without being requested by the app/site. Since this feature discloses information which could be used for fingerprinting by the server it should be used only in exceptional cases.

The normal *provider discovery* flow is as follows:

1. The app/site announces to the client that it supports Provider Discovery including the set of one or more *types* of providers that it supports

2. The browser/OS includes one or more triples of the form {provider-discovery, type, config}

The *provider announcement* flow is the same as above, except step #1 is eliminated.

Where:

- *provider-discovery*: a label indicating that this is a Provider Discovery triple 
  
- *type*: the type of provider. Values must be one of the following:
  - "OpenIDConnect" - the pers has an OpenID provider
  - "SIOPv2" - the person has a self-issued OpenID provider 
  - "AgeProtectv1" - the person has an age verification service provider 
  - TBD...
  
- *config*: a URL that resolves to an Capability Discovery File

Note: the person's browser/OS may be configured to present a different triples to different apps/sites. 

#### Web implementation

##### Normal flow

A server must announce that is supports Provider Discovery using the `Accept-PD` header. For example:

```
HTTP/1.1 200 OK
Accept-PD: OpenIDConnect
```

In response, a client user agent (e.g. browser) could append one or more Provider Discovery headers whose type is OpendIDConnect in every HTTP request of the form:

Sec-PD: OpenIDConnect, <config>

For example, the client could respond with one header informing the server that the person operating the client has a Google OpenID authentication provider:

	GET / HTTP/1.1
	Host: example.com
	Sec-PD: OpenIDConnect, "https://google.com/cdf.toml"

##### Provider-Announce flow

A client user agent can proactively announce that it supports AgeProtectv1 by including a header of the form: Sec-PD: AgeProtectv1. For example:

	GET / HTTP/1.1
	Host: example.com
	Sec-PD: AgeProtectv1

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

