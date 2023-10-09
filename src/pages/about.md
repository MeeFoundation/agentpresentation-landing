---
layout: ../layouts/AboutLayout.astro
title: "Provider Discovery"
---

# Specification

Assume a person employs one or more *providers* (e.g. authentication provider, wallet provider, age verification provider, etc.) as part of their interactions with mobile apps or web servers (*servers*) using a *client* (web browser or mobile OS).  Provider Discovery is a specification that defines how the *server* can learn of the existence of these providers, and in some cases, characteristics of the provider.

There are two kinds of flows, *discovery* and *announcement*. 

The *provider discovery* flow is as follows:

1. The server sends to the client a list of one or more `provider-types` that it supports
2. In response, the client sends a list of zero or more `provider-types` matching the those sent by the server that it (the client) supports. 

Note: the person's client response (in #2 above) may return different triples to different servers. 

The *provider announcement* flow is as follows:

1. The client sends a list of zero or more `provider-types` that it supports. 

Since the announcement flow discloses information which could be used for fingerprinting by the server, it should be used only in exceptional cases.

In either flow, for each provider-type in the list sent by by client, a `config-url` key-value parameter may be provided along with zero or more other key-value pairs specific to this provider-type.

**Provider-type**

The `provider-type` must be one of the following:

- "OpenIDConnect" - the person has an OpenID provider
- "SIOPv2" - the person has a self-issued OpenID provider 
- "AgeProtectv1" - the person has an age verification service provider 
- TBD...

**Config-url**

The `config-url` is a URL that resolves to an *Provider Configuration File* (see section below).

#### Web implementation

##### Discovery flow

A server must announce that is supports Provider Discovery using the `Accept-PD` header. For example:

```
HTTP/1.1 200 OK
Accept-PD: type=OpenIDConnect
```

In response, a client could append one or more Provider Discovery headers whose `provider-type` is OpendIDConnect in every HTTP request of the form:

Sec-PD: type=OpenIDConnect; cfg=<config-URL>; [<key>=<value>;]*

For example, the client could respond with one header informing the server that the person operating the client has a Google OpenID authentication provider:

	GET / HTTP/1.1
	Host: example.com
	Sec-PD: type=OpenIDConnect; cfg="https://google.com/cdf.toml"

##### Announce flow

A client user agent can proactively announce that it supports AgeProtectv1 by including a header of the form: Sec-PD: AgeProtectv1. For example:

	GET / HTTP/1.1
	Host: example.com
	Sec-PD: type=AgeProtectv1

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

