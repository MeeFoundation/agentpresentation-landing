---
title: Partial solutions
author: Paul Trevithick
description: We discuss the age-old partial solution, the HTTP request header.
featured: false
pubDatetime: 2023-08-01T00:00:00Z
---

## HTTP request header

The HTTP request header could be considered a partial solution to the same problem Provider Discovery addresses. The "provider" in this case is the browser (user agent) itself. Rather than redirect to config file (as in Provider Discovery), information is included inline. 

Websites need to discover information about the person's browser and operating system capabilities. To address this need, websites read field values from the HTTP request header inserted by the browser. The header typically includes, among others, a "User-Agent" field that indicates the person's browser version, the operating system the person is using, etc. The site uses these HTTP fields to understand the capabilities of the browser, default language, cookies, etc. An example is shown below.

![http-header](../../assets/http-header.png)

### Client Hints

[Client Hints were introduced by Google](https://developer.chrome.com/en/articles/user-agent-client-hints/) to improve on the User-Agent string in the HTTP request header. Client hints are a set of HTTP request header fields that a server can proactively request from a client to get information about the device, network, user, and user-agent-specific preferences. The server can determine which resources to send, based on the information that the client chooses to provide. 

Provider Discovery uses the same basic concepts and flow from client hints in its normal flow, although not in the provider-announcement flow. See [about.md](../../pages/about.md) for descriptions of these two flows.

