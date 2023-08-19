---
title: Applications
author: Paul Trevithick
description: We describe a few use cases where Provider Discovery could be used
featured: true
pubDatetime: 2023-08-02T00:00:00Z
---


## Authentication 

Assume a person has a Google and an Twitter account. Further, assume they visit a website that supports four OpenID Connect authentication providers, namely, Google, Apple, Facebook and LinkedIn. The person (using some kind tool (e.g. a browser extension, etc.)) could configure their browser to include these two HTTP header fields to disclose the two authentication providers that they'd like to use:

    "Provider: OpenIDConnect, https://google.com/pcf.toml"
    "Provider: OpenIDConnect, https://twitter.com/pcf.toml"

A Provider-Discovery-compatible website would read these fields, realize that it supports one of the two options (Google) and display a "Continue with Google" button. It would read the image data for this button from https://google.com/acf.toml in the OpenIDConnect section. In this way the website's log in page isn't cluttered with three extra buttons/options (Apple, Facebook, LinkedIn) that the person can't use. Instead, it displays the one button (Google) that the user can and prefers to use.

## Digital wallet

Assume a person has a Mee smartwallet installed on their mobile phone. Now assume they visite a website that supports OpenID SIOPv2. The person configures their browser to include the following HTTP header field:

    "Provider: SIOPv2, https://mee.foundation/pcf.toml"

The referenced PCF file (cdf.toml) would look something like this: 

    # Sample Provider Configuration File
    
    title = "Provider Discoery File"
    version = "1.0"  #version of Provider Discovery used by this file (e.g. 1.0)
    
    [SIOPv2]
    image = "https://mee.foundation/continue-with-mee-smartwallet.png"
    metadata = "https://mee.foundation/.well-known/openid-configuration"

The site reads the "Provider" header field, dereferences the config URL and reads the PCF file. It reads the `image` field to find the button image to display. It reads the `metadata` field and processes it per section 8.2 of [Dynamic Self-Issued OpenID Provider Discovery Metadata](https://openid.net/specs/openid-connect-self-issued-v2-1_0-ID1.html#name-dynamic-self-issued-openid-). It presents a "Continue-with-Mee-Smartwallet" button linked to the discovered activation URL. The person presses this button, and is logged via their wallet.

## Age Protect

Assume a person is a minor that wants to send the "Age Protect" signal to websites they visit. The minor has previously installed a browser extention that causes the browser to include the following HTTP header field:

    "Provider: AgeProtectv1"

The site reads this `Provider` field and the `"AgeProtectv1"` protocol value. This tells the site to verify the age of the minor by requesting that the minor present an Age Protectv1-compatible Age Verification Record (AVR) Verifiable Credential from a digital wallet. 

Taking this example a bit further, if the minor already has a relationship with a specific age verification provider, e.g. PRIVO, they could configure their browser extension to send an enriched HTTP header field:

    "Provider: AgeProtect, https://privo.com/age-protect/age-protect.pcf"

The age-protect.pcf file would contain: 

    # Sample Provider Configuration File
    
    title = "Provider Configuration File"
    version = "1.0"  #version of Provider Discovery used by this file (e.g. 1.0)
    
    [AgeProtectv1]
    image = "https://privo.com/verify-with-PRIVO.png"
    AVRissuanceURL = "https://privo.com/age-protect/issue-avr.html"

This allows the website to display a Privo-branded "Verify Age with PRIVO" button, which when tapped resolves to the AVRissuanceURL.

