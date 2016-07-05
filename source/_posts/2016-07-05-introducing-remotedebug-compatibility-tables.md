---
layout: post
title: Introducing RemoteDebug Compatibility Tables for remote debugging protocols and APIs
date: 2016-07-05 09:00
published: true
comments: true
draft: false
categories:
og_image: images/posts/remotedebug-compatibility-tables/head.jpg
---

To continue the [RemoteDebug](https://remotedebug.org) effort on unifying today’s remote debugging debugging protocols and API’s for browsers and related runtimes, I spend the last time comparing the API's exposed over remote debugging protocols. 

Today I'm happy to introduce the [RemoteDebug Compatibility Tables](https://compatibility.remotedebug.org/), which for the first time provides a full overview the API’s exposed by browsers and runtimes supporting the Chrome Debugging Protocol either natively or via adapter layers.

{% img /images/posts/remotedebug-compatibility-tables/head.jpg "" %}

<!--more-->

As a starting point then the [RemoteDebug Compatibility Tables](https://compatibility.remotedebug.org/) compares the API exposed in the following runtimes:

- Google Chrome 
- Microsoft Edge (via Edge Diagnostics Adapter)
- Node (master) 
- Safari iOS 9.3 
- Safari iOS 9.2 
- Safari iOS 8.0
- Safari iOS 7.0

## Using node and protocol.json files to compare API's
The compatibility tables are generated on the fly in a little 300 line Node app, that loads the [protocol.json files](https://github.com/RemoteDebug/remotedebug-compatibility-tables/tree/master/protocols) provided by each runtime, and renders compatiblity tables for domain objects, events and methods exposed by the runtimes. This also means that if a new runtime would gain support for the protocol and provide a `protocol.json` it's a very simple operation to add it to the compatibility tables.

This approach is much similar to the wonderful [Chrome Debugging Protocol Viewer](https://chromedevtools.github.io/debugger-protocol-viewer/) by [@paul_irish](https://twitter.com/paul_irish) and [@kdzwinel](https://twitter.com/kdzwinel), but I've added multiple runtimes as a new dimension. This means that the [RemoteDebug Compatibility Tables](https://compatibility.remotedebug.org/) also serves as a **runtime specific protocol viewer**, that for examples enables developers to browse iOS 9.3 Safari specific methods like [`Page.snapshotNode`](http://compatibility.remotedebug.org/Page/iOS%209.3/commands/snapshotNode). 

## Highlighting parity/common and private APIs

In addition to generate the compatibility tables themselves and permalinks for each object, I've also some simple API comparison which marks a given API as "common/parity" when all the compared runtimes support's it. 

{% img /images/posts/remotedebug-compatibility-tables/parity_highlight.png "" %}

Getting an overview of "parity API's" is the first step towards a proposal for a common set of API's, as those API's would be the natural proposal for a common set of APIs, as they already are exposed. 

Lastly I've also added hightlighing of "private API's" as those can change without warning and should be used sparsely. Highlighing these are an important step towards getting an overview of how much of the API surface that are in flux.

## Inline code navigating between object references

To make navigation between methods and their return objects, I also added inline code navigation much inspired by [Chromium Code Search](https://cs.chromium.org), which detect `$ref` object references and generates links to the relevant object and runtime. 
  
The JSON highlighting powered by [Prism.js](prismjs.com), and the inline code navigation is done via an [relatively simple Prism extension](https://github.com/RemoteDebug/remotedebug-compatibility-tables/blob/master/assets/prism-ref-linker.js), which makes code navigation for [`Debugger.getScriptSource`](http://compatibility.remotedebug.org/Debugger/Chrome/commands/getScriptSource) a breeze to use.

{% img /images/posts/remotedebug-compatibility-tables/object_navigation.png "" %}

## One step closer towards the RemoteDebug vision

In June Google contributed to Node in [the v8_inspector pull request](https://github.com/nodejs/node/pull/6792), which added the Chrome Remote Debugging Protocol directly to Node core. This is a great step forward for Node and the tooling ecosystem in general, but also makes the [RemoteDebug vision](http://remotedebug.org/) more relevant than ever. 

As of July 2016 I see a need in both the Node and web community for a common set of APIs and a place where vendors and the community can work together on designing the current and future API's exposed over the Chrome Debugging Protocol.

I hope this new overview can help the community coming together on a unified set of APIs exposed over the same remote debugging protocol. The code is [fully open source and is available on GitHub](https://github.com/RemoteDebug/remotedebug-compatibility-tables/), and if you find a bug or think feature or runtime is missing, don’t hesitate to contribute.

/k
