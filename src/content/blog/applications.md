---
title: Applications
author: Paul Trevithick
description: We describe a few use cases where Agent Presentation could be used
featured: true
pubDatetime: 2023-08-02T00:00:00Z
---


## Authentication 

Assume a person has a Google and an Twitter account. Now assume they visit a website that supports four OpenID Connect authentication "agents", namely, Google, Apple, Facebook and LinkedIn. The person (using some kind tool (e.g. a browser extension, etc.)) could configure their browser to include these two HTTP header fields to "present" the fact that these are the two authentication "agent"/methods that they'd like to use:

    "Agent: OpenIDConnect, https://google.com/acf.toml"
    "Agent: OpenIDConnect, https://twitter.com/acf.toml"

An Agent Presentation-compatible website would reads these fields, realize that it supports one of the two options (Google) and display one "Continue with Google" button. It would read the image data for this button from https://google.com/acf.toml in the OpenIDConnect section. In this way the website's log in page isn't cluttered with three extra buttons/options (Apple, Facebook, LinkedIn) that the person can't use. Instead it displays the one button (Google) that the user can use.

## Digital wallet

Assume a person has a Mee smartwallet installed on their mobile phone. Now assume they visite a website that supports OpenID SIOPv2. The person configures their browser to include the following HTTP header field:

    "Agent: SIOPv2, https://mee.foundation/acf.toml"

The ACF file: 

    # Sample Agent Configuration File
    
    title = "Agent Configuration File"
    version = "1.0"  #version of Agent Presentaion used by this file (e.g. 1.0)
    
    [SIOPv2]
    image = "https://mee.foundation/continue-with-mee-smartwallet.png"
    SIOPAuthorize = "https://mee.foundation/authorize"

The site reads the "Agent" header field, dereferences the config URL and reads the ACF. It reads the "image" field to find the button image to display. It reads the SIOPAuthorize field to get the invocation URL. It presents a "Continue-with-Mee-Smartwallet" button linked to https://mee.foundation/authorize. The person presses this button, and is logged via their Mee Smartwallet.

## Age Protect

Assume a person is a minor that wants to send the "Age Protect" signal to websites they visit. The minor has previously installed a browser extention that causes the browser to include the following HTTP header field:

    "Agent: AgeProtect"

The site reads this Agent field and the "AgeProtect" protocol value. This tells the site to verify the age of the minor by requesting that the minor present an Age Protect-compatible Age Verification Record (AVR) Verifiable Credential from a digital wallet. 

Taking this example a bit further, if the minor already has a relationship with a specific age verification provider, e.g. PRIVO, they could configure their browser extension to send an enriched HTTP header field:

    "Agent: AgeProtect, https://privo.com/age-protect/age-protect.acf"

The age-protect.acf file would contain 

file: 

    # Sample Agent Configuration File
    
    title = "Agent Configuration File"
    version = "1.0"  #version of Agent Presentaion used by this file (e.g. 1.0)
    
    [AgeProtect]
    image = "https://privo.com/verify-with-PRIVO.png"
    AVRissuanceURL = "https://privo.com/age-protect/issue-a"



