---
layout: post
title: Taking Chrome DevTools outside of the browser.
date: 2014-12-28 10:00
published: true
comments: true
categories:
og_image: images/posts/devtools-app/og.jpg
---

For a while I've been wondering how much work it would be to take Chrome DevTools outside of the browser, and into it's own app - independent of Chrome. 

So about a month ago, where I had a quiet evening in the airport I pulled Chrome DevTools from the [git repo](https://chromium.googlesource.com/chromium/blink/+/master/Source/devtools/), and wrapped the app with [node-webkit](https://github.com/rogerwang/node-webkit). After a few hours, after figuring out how node-webkit worked, I had a functional prototype of DevTools as a standalone app. 

<figure>
	<blockquote class="twitter-tweet" lang="en"><p>Chrome DevTools as a stand-alone app via node-webkit. Next-up workspaces. (<a href="https://twitter.com/paul_irish">@paul_irish</a>, <a href="https://twitter.com/addyosmani">@addyosmani</a>) <a href="https://t.co/j0j78p2Mhp">https://t.co/j0j78p2Mhp</a> <a href="https://twitter.com/hashtag/airporthacking?src=hash">#airporthacking</a></p>&mdash; Kenneth Auchenberg (@auchenberg) <a href="https://twitter.com/auchenberg/status/534222665155108864">November 17, 2014</a></blockquote>
</figure>

<!--more--> 

After I had the prototype working, the next thing was to polish the UI into something more pretty and functional. 

## Polishing the UI with Material design.

In these "material times", where everything is getting re-designed into the material design pattern, it was natrual to grab the [AngularJS Material](https://material.angularjs.org) components, and try to create a somewhat material-inspired UI. 

As a developer, with no special design expathise, I spent quite some time reading the [Material design specification](https://www.google.com/design/spec), and I was quite surprised how little "desktop" focus there is in the spec. It's like the design team simply have forgotten that we have this thing called a "desktop" computer, where we use these oldschool interactions called mouse and keyboard. 

Actually, the only mention of "desktop" I've been able to find was under the ["tabs component"](https://www.google.com/design/spec/components/tabs.html#tabs-usage).

{% img /images/posts/devtools-app/components_tabs_usage_desktop1.png "Source: http://www.google.com/design/spec/components/tabs.html#tabs-usage" %}

So I spent quite some time searching for examples of how material should be applied to desktop apps, and after a while I came to the conclusion that there wasn't any great examples around, so I started experimenting.

## Hello Chrome DevTools App.

Let me introduce what I call the [Chrome DevTools App](https://github.com/auchenberg/chrome-devtools-app). It's a standalone app who runs Chrome DevTools in it's own process. It's powered by [node-webkit](https://github.com/rogerwang/node-webkit), and it's able to run on Windows, Mac and Linux, completely independent of Chrome.

{% img /images/posts/devtools-app/app-intro.png %}

{% img /images/posts/devtools-app/app-inspector.png %}

When you start the app, you are presented with a list of "targets", similar to how they are presented inside Chrome at chrome://inspect. For now, you'll need to have an instance of Chrome running with remote debugging enabled, before the targets show up, but going forward we can make that much easier.

Clicking on one of the targets, and you are taking to the second screen in the app. This is where Chrome DevTools is instantiated, and connected to the relevant Chrome Remote Debugging endpoint. From here you can use Chrome DevTools just like you are used to within Chrome, there's no difference. 

I also added a back button that allows you to quickly switch between different targets, as show in the below demonstration.

<figure>
	<iframe src="//www.youtube.com/embed/4oBSlY9J-iA" frameborder="0" allowfullscreen></iframe>
</figure>

If you want to tryout the [Chrome DevTools App](https://github.com/auchenberg/chrome-devtools-app), you should checkout the GitHub repo, [https://github.com/auchenberg/chrome-devtools-app](https://github.com/auchenberg/chrome-devtools-app), where I've written a little guide on how to get started. 

Please aware this project is highly experimental, and I can't guarantee that stuff won't blow up, but give it a try, and let me know what you think ;)

## Perspectives of taking DevTools outside of the browser.

As a part of this exploration there's a few perspectives of taking DevTools outside of the browser, that I find super interesting.

### Chrome DevTools is close to a functional editor.
Chrome DevTools is pretty damn close to be a fully featured editor. I've been [quite vocal](https://kenneth.io/blog/2013/05/21/our-web-development-workflow-is-completely-broken/) about this in the past, as I still think DevTools should be something **different** than a editor, but in the perspective of separating DevTools from the browser, we could easily make the editor part of DevTools much more prominent. 

With a relatively few UI changes, as DevTools already have functionality to read the filesystem via it's much hidden Workspaces feature, we could turn DevTools into something like a basic version of [Brackets](brackets.io). It's straigtforward to do.

### Browser independence.
Another perspective of seperating DevTools from the browser is the independence of one specific browser. If Chrome DevTools wasn't bundled together with Chrome, but something you installed seperately, we wouldn't have the bias that DevTools only should work with the browser it came bundled with. 

Why are DevTools still bundled with the browsers? 
What if clicking "inspect element" simply started an external DevTools app?

### Working with other browsers (via [RemoteDebug](http://remotedebug.org)).
With DevTools separated from one specific browser, a natural next step would be making the DevTools app work with other browsers. I already explored this idea about a year ago, in my [What if you could use Chrome DevTools with Mozilla Firefox?](http://localhost:4000/blog/2013/12/09/what-if-you-could-use-chrome-devtools-with-firefox/) blog post, where I showed how my [RemoteDebug Firefox adaptor](https://github.com/auchenberg/remotedebug-firefox-bridge), could be used with Chrome DevTools. 

Imagine if the adaptor was packaged as a Firefox extension (yes, it's possible), and Firefox instances suddenly showed up in the "targets" list within the DevTools app? 

We could easily to the same thing for Safari, via [Google's Safari to Webkit remote debugging proxy](https://github.com/google/ios-webkit-debug-proxy). 

It's not science fiction.

### Working with other runtimes like node.js and iOS.
Another perspective of having DevTools as a seperate app, is to re-use DevTools with runtimes other than our browsers. 

We have already seen this with projects like [node-inspector](https://github.com/node-inspector/node-inspector), that enables developers to debug their node.js applications using Chrome DevTools. We have also seen other explorations like [PonyDebugger](https://github.com/square/PonyDebugger), that allows developers to debug their native iOS applications using Chrome DevTools.

{% img /images/posts/devtools-app/ponydebugger.png "Source: http://github.com/square/PonyDebugger" %}

I find this perspective really interesting, as there's something about being able to re-use our tooling with various runtimes. It's just nice to be able to re-use all the hardwork put into DevTools, instead of reinventing the wheel(s), just because the runtime is different.

Today both node-inspector and PonyDebugger are including their own DevTools front-end, which is a version of Chrome DevTools hosted via a small HTTP server running locally. By having DevTools as a standalone app, there isn't a need for these tools to include their on front-end. Instead they simply should make their remote debugging endpoint discoverable to applications like [Chrome Devtools App](https://github.com/auchenberg/chrome-devtools-app).

Imagine if we used [mDNS](http://en.wikipedia.org/wiki/Multicast_DNS) to expose remote debugging targets on the network from various runtimes like node.js and browsers, and made the Chrome DevTools app look for them. 

It would be much better experience for local developers, but also enable concepts like pair programming, remote support, etc.

## Looking forward.

This could be the beginning of something new and exciting in the world of DevTools. I hope to have time to explore this idea more in 2015, as I believe it has a lot of potential. 

If you like this idea, or find it utterly stupid, please leave a comment, as I love any kind of feedback.

