—
layout: post
title: The fundamental problem with vorlon.js and similar remote debugging solutions.
date: 2015-06-26 23:00
published: true
comments: true
categories:
og_image: images/posts/vorlonjs/vorlonjs.jpg
—

This post is a follow-up discussion of brief Twitter thread between [@deltakosh](https://twitter.com/deltakosh), [@meulta](https://twitter.com/meulta), [@pierlag](https://twitter.com/pierlag) and [@davrous](https://twitter.com/davrous) where I asked into the reasoning behind building [Vorlon.js](http://vorlonjs.com).

{% img /images/posts/vorlonjs/vorlonjs.jpg %}


**Preface**: This is quite an opinionated post, and everything here is said without have had a chat with the team, and is purely based upon the observations I’ve made since the announcement and by following the project. I might be completely wrong in my criticism.

<!—more—>

I’ve been following the [vorlon.js](http://vorlonjs.com) project for a while now, and recently I’ve started to notice a [big amount of work]() being put into building a “DOM Explorer” and other parts of “DevTools-like front-end”, which trigger this tweet:

<figure>
	<blockquote class=“twitter-tweet” lang=“en”><p lang=“en” dir=“ltr”><a href=“https://twitter.com/deltakosh”>@deltakosh</a> <a href=“https://twitter.com/meulta”>@meulta</a> <a href=“https://twitter.com/pierlag”>@pierlag</a> Why make <a href=“https://twitter.com/VorlonJS”>@vorlonjs</a>&#39;s own DOM Explorer over Firefox or Chrome DevTools? We already have it :)</p>&mdash; Kenneth Auchenberg (@auchenberg) <a href=“https://twitter.com/auchenberg/status/613558197350064129”>June 24, 2015</a></blockquote>
</figure>

To me, this particular front-end work seems completely unnecessary as a front-end for this kinda of functionality already exists — and has for years.

I’ve been reading the [announcement blog-post of vorlon.js](http://blogs.msdn.com/b/eternalcoding/archive/2015/04/30/why-we-made-vorlon-js-and-how-to-use-it-to-debug-your-javascript-remotely.aspx) a few few times to wrap my mind around the purpose of the project, and I get that the point of the project is a *“An open source, extensible, platform-agnostic tool for remotely debugging and testing your JavaScript.”*, but I simply don’t understand why the team has chosen an approach that includes to re-invent (as in re-implement) much of the logic,  our community have spent years on building and perfecting.

## Vorlon.js doesn’t bring anything new to the table
[Vorlon.js](http://vorlonjs.com) is built on node.js and is using socket.io to manage it’s connections to the browsers and the front-end is simply communicating to the central (local) server that provides an aggregated view of the browser information.

This architecture isn’t new.

This is exactly how the built-in browser DevTools are working in modern browser like Chrome, Firefox and Safari. The front-end is a simply client of a remote debugging server hosted by the browser.

However there’s a difference, and that’s the built-in DevTools doesn’t have a notion of other browsers. But this functionality was explored by [Patrick Mueller](https://twitter.com/pmuellr) in the [Weinre project](http://people.apache.org/~pmuellr/weinre-docs/latest/). Weinre enabled users to use Safari Web Inspector with other browsers, via a much similar architecture to vorlon.js, as it’s also relied upon a script injection technique to emulate the Webkit remote debugging protocol.

Today the [Weinre project](http://people.apache.org/~pmuellr/weinre-docs/latest/) is kinda dead, but recently we have also seen commercial solutions like [GhostLab](http://vanamco.com/ghostlab/) which is using a similar approach, to enable [Chrome DevTools](https://developer.chrome.com/devtools) to be connected to multiple browsers. In my view [GhostLab](http://vanamco.com/ghostlab/) is the new and modern flavour of [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/).

However [vorlon.js](http://vorlonjs.com) adds one new thing to the table, and that’s plugins, that allows developers to write “extensions” in order to inject custom functionality. But this extension layer could easily have been built on top of the existing tooling and protocols, instead of re-inventing everything again.

In the perspective of [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/) and [GhostLab](http://vanamco.com/ghostlab/), [vorlon.js](http://vorlonjs.com) simply looks to be yet one-of-the-many Microsoft-variants of tools that’s already exists.


## Re-implementing a front-end that already exists
My first specific criticism of the [vorlon.js](http://vorlonjs.com) is that the team currently is re-implementing much of the functionality that already exists inside tools like [Chrome DevTools](https://developer.chrome.com/devtools) and [Firefox DevTools](https://developer.mozilla.org/en/docs/Tools). These projects are both open-source, and hundreds of people has over the last many years, spent I-dont-know-how-many man-hours on tweaking both the UI and the functionality of their “DOM Explores” and “Networking inspectors”

So I simply don’t understand, why you would completely disregard what’s already out there (and work’s pretty damn well), and start rolling your own home-grown front-end.

When taking a look at the current state of the home-rolled front-end in [vorlon.js](http://vorlonjs.com) it’s sub-pair with existing tools. It’s even sub-pair with Firebug that was super-seeded by “native’ DevTools years ago. From this point it will take the vorlon.js team considerable time to “catch-up” with even basic functionality like script debugging and editing, which is functionality that most developers, these days take for granted.

As I write this, the team is busy [re-implementing the JavaScript console](https://github.com/MicrosoftDX/Vorlonjs/issues/146), [Resources tab](https://github.com/MicrosoftDX/Vorlonjs/issues/145) and many other things.

For absolutely no reason.

Even [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/) and [GhostLab](http://vanamco.com/ghostlab/) realized that re-implementing the front-end would be massiv task, and probably also a waste of resources, so from the beginning [GhostLab](http://vanamco.com/ghostlab/) is simply re-using Chrome DevTools inside their app, and [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/) is using Safari’s WebInspector. Wise decisions.

## The fundamental problem is the viewport sandbox and it’s limitations
This leads me to my second criticism and that’s the basic assumption [vorlon.js](http://vorlonjs.com) and similar solutions like [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/) are built upon: They rely on instrumentation of the running application inside the “viewport sandbox” using dynamic script injection.

Let me explain why this is fundamental problem by showing you this illustration:

{% img /images/posts/vorlonjs/viewport_sandbox.png %}

When running inside the “viewport sandbox” along with the application itself, the debugger/tool is limited by the number of API’s available, and as we speak there isn’t many debugging-focused API’s available for one reason: **Security**.

Getting access to the memory heap and other internal parts of the runtime won’t be secure with the security model we have on the web.

This means that debugging tools running inside this sandbox has to rely on dynamic code instrumentation that injects observers and other logic in order to “extract” the interesting information from the runtime. This is a lot of work, and by design, we won’t be able to extract much of the “interesting” information thats’ needed for Profilers, Network monitors, Emulators, etc.

This is the reason why [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/) and [GhostLab](http://vanamco.com/ghostlab/) hasn’t been able to provide more advanced features that the DOM and Styling related features of today’s DevTools.

This constraint also exists for vorlon.js, and that’s why vorlon.js from the very beginning won’t be able to provide what’s required of a modern remote debugging tool. It’s access to information is simply too limited.

This is also why modern DevTools aren’t relaying on dynamic script injection, but instead is using the [remote debugging protocols](http://remotedebug.org/specifications/). These are built into every modern browser, and aren’t limited by the “viewport sandbox”. They provides a much more advanced set of API’s for specifically created debugging and most importantly provided and maintained by the browser vendors.

## What should be the focus of vorlon.js
Remote Debugging protocols already exists, and is wildly used by the browsers’s DevTools and other tools such as Adobe Brackets. There’s a proven need for why these protocols and API’s can’t be exposed inside the viewport, and why these are exposed as a separate interface to the browsers.

If the goal is to build a tool to *“remotely debugging and testing your JavaScript”* the focus should be where the problem is: How to build a system using the existing API’s and protocols that works cross browser and runtimes.

The focus **shouldn’t** be re-implementing a front-end that already exists, and spending time re-implementing debugging-API’s that the browser-vendors already provides in their remote debugging protocols.

This is why I find another Microsoft project much more intersting, and that’s the [IE Diagnostics Adapter](https://github.com/Microsoft/IEDiagnosticsAdapter) from the IE F12 tools team, who has spent the time building an adaptor that makes it possible to use **existing** tools like [Chrome DevTools](https://developer.chrome.com/devtools) and [Adobe Brackets](http://brackets.io) with IE. That’s true innovation, and focus where it needs to be.

We as a community, should get out of the not-invented-here-syndrome, and focus on how we can **re-use** the logic and tools that’s already been built by our wonderful community.

If [vorlon.js](http://vorlonjs.com) for example had used the existing Chrome Remote Debugging protocol instead of inventing it’s own socket.io-based thing, and embraced [RemoteDebug](https://remotedebug.org), tools like Microsoft’s own [Visual Studio](https://www.visualstudio.com/) would work for script debugging (I might be wrong here), and the team wouldn’t have to re-invent the front-end for Console, as [Chrome DevTools](https://developer.chrome.com/devtools) would work out of the box. That would have given [vorlon.js](http://vorlonjs.com) a much better starting point, than starting with nothing.

So to put it on an edge, [vorlon.js](http://vorlonjs.com) seems to be yet-another Microsoft project that’s driven by the not-invented-here-syndrome, and that’s a shame.

I sincerely think we can do better. We should focus on real innovation instead of re-inventing wheels.

We desperately a [better web development workflow](https://kenneth.io/blog/2013/05/21/our-web-development-workflow-is-completely-broken/), so let’s built it by keeping our focus on solving the real problems.

That’s it for now.

/k
