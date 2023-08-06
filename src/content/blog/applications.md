---
title: Applications
author: Paul Trevithick
description: We describe a few use cases where Agent Presentation could be used
featured: true
pubDatetime: 2023-08-02T00:00:00Z
---


## Authentication 

Assume the person has a Google and Apple account. And assume that the website the person visits supports OpenID Connect and has integrated Google, Apple, Facebook and LinkedIn. 

The browser/OS is configured to include the following HTTP header fields:

    "Agent: OpenIDConnect, https://google.com/acf.toml"
    "Agent: OpenIDConnect, https://apple.com/acf.toml"

The site reads these fields and displays a "Continue with Google" button and a "Continue with Facebook" button.

## Digital wallets

Assume the person has a Mee smartwallet installed on their mobile phone. Assume the website the person visits supports OpenID SIOPv2. 

The person configures their browser/OS to include the following HTTP header field:

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

Assume the person is a minor that has a wallet that supports Age Protect. Assume they visit a site that also supports Age Protect. The minor has configured their user agent to include the following HTTP header field:

    "Agent: AgeProtect, https://mee.foundation/acf.toml"

The site reads the Agent field and then the AgeProtect protocol value. The site can read the config file, find the value of the "image" field, and display a "Verify Age" button. Tapping this buttonwill request that the minor's wallet present a VC (called an Age Verification Record (AVR)) with the requisite age information per the Age Protect spec.