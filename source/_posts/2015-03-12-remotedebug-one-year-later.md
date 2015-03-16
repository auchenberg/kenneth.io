---
layout: post
title: RemoteDebug and cross-browser DevTools. One year later.
date: 2015-03-12 12:00
published: true
comments: true
categories:
og_image: images/posts/remotedebug-one-year/remotedebug-logo.jpg
---
 
This post has been on my mind for a while now. I’ve kept pushing it, but now is the time to do a status of my RemoteDebug initiative, that I launched a little more than a year ago.

I announced [RemoteDebug](http://remotedebug.org/) as a separate initiative, with the hope of one or more of the established vendors would join, and help drive the initiative forward. 

That didn’t happen.

{% img /images/posts/remotedebug-one-year/remotedebug-logo.jpg %}

<!--more--> 

During the past year I’ve had the pleasure to discuss RemoteDebug with great minds from Google, Mozilla, Microsoft, Adobe, W3C, and many others. I even had pleasure to attend the [W3C TPAC](http://www.w3.org/2014/11/TPAC/) in Santa Clara, where I gave a short presentation to the Browser Testing and Tools Working Group (Thanks, [Wilhelm](https://twitter.com/wilhelmja)), as I consider a common remote debugging protocol, a low-level API where things like WebDriver chould be implemented on top.

So, a year in, [RemoteDebug](http://remotedebug.org/), as a an initiative, hasn’t moved much forward, but I’m telling myself that my rants and RemoteDebug has helped the community to understand the powerfullness of remote debugging, cross-browser DevTools, and why there's need of a common interface to our browsers. 

## I dropped the ball after the announcement
I announced the [RemoteDebug](http://remotedebug.org/) initiative at the [FullFrontal conference](http://ffconf.org/), and the feedback was overwhelming. I think it generated 1000+ tweets, 500+ followers in the following days. Wow. 

This meant that I spent most of my time in the following weeks, answering tweets and writing emails. I even setup a [RemoteDebug google group](https://groups.google.com/forum/#!forum/remotedebug), with the hope that people would contribute, but that didn't happen either.

Around the same time I was offered an opportunity inside [Citrix](https://citrix.com), that meant I would be leaving the [Podio](https://podio.com) team, and joining the Citrix Research team in San Francisco. This was an exciting project, and meant I've spent the past year diving into the WebRTC world, but it had the consequence that I didn't have the time to execute on RemoteDebug.

Looking back I should have prioritized to work on RemoteDebug, while the initiative still had the attention of people, or at least made sure, that there were other contributers that could move the initiative forward, while I was busy [disrupting GoToMeeting](https://free.gotomeeting.com) from the inside. But hey, you live and you'll learn.

## DevTools are the “last bastion” for browser vendors

During the past year I've learned that true unification of DevTools isn’t in the (current) interest of the browser vendors. DevTools are "the last bastion" for browser vendors where they can innovate and differentiate in order to attract developers to their "platform".

At [EdgeConf in London](https://edgeconf.com/2014-london) I was a part of the DevTools panel where I had a heated dicussion with [Joe Walker](https://twitter.com/joewalker) from the Mozilla DevTools team, as we disagreed on some quite basic things. I think the DevTools teams are living in their own little "bubbles" that doesn't take into account that most developers need to learn multiple tools in order do their daily cross-browser work. 

{% img /images/posts/remotedebug-one-year/edgeconf.jpg "Source: https://edgeconf.com/2014-london" %}

Luckily my point resonated with others, and one of the persons I highly respect, [Jeremy Keith](https://twitter.com/adactio), wrote a [great blog post with his reflections](https://adactio.com/journal/6719) on this.

I think we can do better than adding the same keyboard shortcuts our DevTools. I still believe that if a browser vendor went all-in on cross-browser tooling, and did it well, that vendor would win most developers. 

Today, most developers, doesn't care about the runtime, but they DO care about the tooling. So if developers could use ONE tool, in-browser/editor/whatever, with all of their daily browsers, that would bring some real value on the table, instead of today where most vendors are forcing developers to learn each of their browser-specific tools.

## A common protocol is a "chicken or egg" problem

Over the last year I've learned that a common remote debugging protocol is a "chicken or egg" problem. Both Chrome and Firefox already have open protocols that are documented, and used by their respective DevTools, but at the same time they also are the only "official" consumer of these protocols. This means that each browser vendor has the flexisbility to change the protocols to fit their needs, without the constraints of other consumers. This gives the DevTools teams a great amount of agility, but this is also holding others back integrating with the protocols, as they there's no standard to adhere to.

{% img /images/posts/remotedebug-one-year/standards.jpg "Source: http://xkcd.com/927/" %}

I've talked to several non-browser tooling vendors, and all of them would love a common interface to browser(s), but currently they are holding back integrating with the existing remote debugging protocols, because they first are too browser specific, and to fragile. 

Today each tooling vendor would need to repeat the integration work for each protocol, and without being sure if the integration would work in 6 months from now, this has multiple times resulted in vendors disregarding the existing protocols and rolling their own.

At the same time, I've talked to browser vendors, and they are afraid that a common interface would affect their agility, and slow-down the innovation within their DevTools. A common protocol with a standardized interface would definitely affect the agility of the DevTools teams, as they would have to keep the keep the contract of the protocol, but I don't see that as a problem. Everything we build for the web is based upon standards and agreements, so this constraint wouldn't be something new - it would be a natural thing for people building the web. 

If I were building a platform, it would be in my interest to have as many tooling vendors building on top of my platform. I therefore see it as the browser vendors responsibility to expose the primitives for other vendors to build upon. It shouldn't be the responsibility of tooling vendors to figure out ways to talk to the browsers. The more tools that are integrated with a platform, the more relevant and sticky it would become.

So currently we have the browser vendors saying "Prove the demand for a common interface, and we'll consider it", and the tooling vendors says "We need a common interface, the existing interfaces are too much effort, but we can't take the investment to build common thing for all browsers". 

It's a classic "chicken or egg problem", so where do we start? I still don't know.

## Mozilla embracing cross-browser debugging gives me hope

I was attending the [Extensibilty Web Summit](http://lanyrd.com/2014/extwebsummit-berlin/) in Berlin, where I had a chance to discuss RemoteDebug, when Mozilla announced that they wanted to embrace cross browser debugging with their new Firefox Protocols Adaptors (codename Valence), which honestly came as a bit of a (happily) surprise. 

At the last meeting I had with [David Camp](https://twitter.com/campd) and [Heather Arthur](https://twitter.com/harthvader) in the lovely Mozilla SF offices, Mozilla didn't seem overly positive about a common protocol, as I were advocating for using the wildly-used Chrome protocol as the starting point. I think Dave misunderstod my intention, as I'm not merried to the Chrome protocol, but to me, it still seems to be the best starting point, due to it's protocols existing usage and simplicity. 

{% img /images/posts/remotedebug-one-year/firefox-protocol-adaptors.jpg "Source: http://arstechnica.com/information-technology/2014/09/debug-chrome-safari-apps-from-firefox-with-new-add-on/" %}

I've been following the [Valence project](https://github.com/campd/valence) for a while now, and I'm really excited to see [J Ryan](https://twitter.com/jryans), [Paul Rouget](http://paulrouget.com/), [Panagiotis Astithas](https://twitter.com/pastith), and [others](https://github.com/campd/valence/graphs/contributors) 
 on mapping out the differences between Firefox, Chrome and Safari. They put a lot of energy into the adaptors, and they actually got stuff working pretty damn well. 

It's really exiting to see a browser vendor committing to making their DevTools work with other browsers (kinda my dream), but at the same time I had hoped they joined RemoteDebug and worked towards a common protocol, instead of “doing their own thing”. 

I understand the reasons for this, as [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) with cross-browser tooling, is a compelling offering that potentially could make developers move back to Firefox, but at the same time, it's yet another example of DevTools being as a instrument to move market shares.

In my view, it would have been better for the web platform, and for the existing tooling if Mozilla has embraced the Chrome protocol, as tools like Adobe Brackets and Microsoft Visual Studio then out-of-the-box would have worked with Firefox. 

But the important thing here is that a browser-vendor has started looking into the protocol differences and that's freaking awesome.

## Re-use of DevTools across platforms

During the past year we also seen Chrome DevTools being re-used with other platforms outside the browser, which makes a really compelling use-case for a common protocol. I've made a simple [contribution to node-inspector](https://strongloop.com/strongblog/whats-new-in-the-node-inspector-v0-7-debugger/) that removed the dependency of socket.io, and made node-inspector compliant to the chrome protocol by using pure WebSockets. One step tiny closer. 

We have also seen Square putting some effort into [PonyDebugger](https://github.com/square/PonyDebugger), that enables you do use Chrome DevTools use debug native iOS applications, and most recently we seen Facebook release, [Stetho](http://facebook.github.io/stetho/), a bridge that enables developers to debug their native Android apps using Chrome DevTools. 

{% img /images/posts/remotedebug-one-year/stetho-discovery.jpg %}

[Stetho](http://facebook.github.io/stetho/) in particular is interesting, because it's using the same mechanism as chrome://inspect, powered by ADB, to make the Android apps discoverable by Chrome, which provides a neat user experience.

I find the perspectives of using DevTools with other platforms really interesting, and I already elaborated some thoughts in my [Taking Chrome DevTools outside the browser](https://kenneth.io/blog/2014/12/28/taking-chrome-devtools-outside-the-browser/) post, but one thing is sure, re-use of DevTools outside the browser is yet another argument for a common protocol.

## New tooling using remote debugging protocols

In addition to seeing DevTools re-use across platforms, we have also started seeing new kind of tooling being built in top of the remote debugging protocols. 

{% img /images/posts/remotedebug-one-year/calibre.jpg %}

One example is [Calibre](https://calibreapp.com/), a performance tool that is using the Chrome Remote Debugging protocol to extract performance related information from Chrome. 

Another is [Amok](http://caspervonb.com/javascript/tools/live-edit-javascript-amok/), which also uses the Chrome Remote Debugging protocol to enable live editing of JavaScript files in any editor, by using the API to how-swap JavaScript files. Neat.

As a community I think we need to build more tools that leverages the browser logic instead of re-implementing within our tools.

## Too early for W3C or other standard bodies

Originally I thought [RemoteDebug](http://remotedebug.org/) would be a fitting project for W3C or WHATWG, but during the past year I reached the conclusion that taking the remote debugging protocols through the official standardization process, simply is too early. I spoke with the [W3C Browser Testing and Tools Working Group](http://www.w3.org/2011/08/browser-testing-charter.html) to hear if they were interested in RemoteDebug, and the answer was that none of the members were working on DevTools, which kinda ruled the working group out.

First, we still need to map out the needed functionality, and reach a common ground on the basic protocol. This could easily happen in a non-W3C environment between vendors, and once we have something more tangible, this work could later be moved to W3C or any other standardsbody

## Going forward

So, I'm now one year into RemoteDebug. It’s a bold vision, and there's a lot of work ahead. I was too optimistic, thinking that vendors naturally would pick this initiative up, and drive it forward. But, here in 2015 I've started to see things happening in the corners, so I'm hopeful that we will move RemoteDebug forward in 2015.

It's extremely hard for me to have an impact, when I'm not working on the platform nor the tools. I'm kinda the odd-one-out that's yelling from the side, but I do want to make a common interface to our browsers happen. 

This is why I [quit my job at Citrix](https://kenneth.io/blog/2014/12/12/leaving-citrix-time-for-a-break/), to first of all take a break, but also because I realized that developer tooling and developer evangelism are my passion. That's what I wanna do going forward. Now I just need to figure out how and where to do that.

I'll be speaking about [RemoteDebug](http://remotedebug.org/) and how I see the future of developer tooling at [JSCamp](www.jscamp.ro) in June, so if you are interesting to hear more about RemoteDebug, join me in Romania!

The open web follows standards. Our tools should too.

/k
