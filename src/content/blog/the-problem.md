---
title: Motivation
author: Paul Trevithick
description: Two questions arise for apps/sites when individuals are free to choose their own authentication, age verification, and other kinds of providers. Provider Discovery tries to answer them.
featured: true
pubDatetime: 2023-08-03T00:00:00Z
---

We define the term "provider" in this context as a trusted intermediary service used by a person as they interact with an app/site ("app"). Examples of providers include:

- Authentication providers (e.g. OpenID Connect) that allows a person to log in to the app by leveraging their existing Google account
- Age verification providers
- Digital wallets that act as self-issued identity providers and allow the holder to log in and prove information about themselves

Individuals are free to adopt whatever providers they wish from among many alternatives. However, this creates a problem for the app developer: **how does the app know which provider the person would like to use?** The app developer is faced with two choices:

- **Bad**: Ask the person to pick their provider from a list of alternatives that the person might use. 
- **Ugly**: Ask the person to enter an identifier of their provider. Experience has shown this to be unworkable.

If an app could discover the provider's capabilites, it could do things like:

- Ask the provider to perform services on behalf of the person
- Discover the image to display in a button representing the provider
- Adapt its content based on information learned about the person from the provider

But this begs the question, **how does the app discover the provider's capabilities?**. 

These two questions have not been solved in a general way, although partial solutions exist.

### Authentication providers and NASCAR

An app instead of, or in addition to, authenticating the person using a username and password may choose to rely on external authentication provider. The app displays a button for each provider. However, if there are too many options the resulting site starts to look like a car at NASCAR which is ugly, confusing, and inconvenient.

![nascar](../../assets/nascar.png)

For example, there are dozens of OpenID Connect authentication providers each with its own logo-ed button such as Continue-with-Google, Continue-with-Twitter, -Apple, -Facebook, -LinkedIn, and so on. 

![social-login-examples](../../assets/social-login-examples.jpeg)

The problem is exacerbated by protocols like OpenID SIOP that allow each person to have a *personal identity provider* (aka a wallet) from one of hundreds of alternative wallet providers. 

The app doesn't know which authentication provider the person would like to use before the person is looking at the initial app/site screen. The NASCAR problem would be solved if the app could (i) discover a priori the set of authentication providers the person has available and (ii) find one or more matches with the set of authentication providers the app/site supports and then (iii) display only the matches. The result would be a small, although hopefully not the null, set of alternatives and the app would display a button for each. 