---
layout: post
title: "What if you could use Chrome Devtools with Mozilla Firefox?"
date: 2013-12-09 20:14
published: true
comments: true
categories:
---

To many front-end developers this seems like a ubiquitous dream, but is it really?

About a month ago I launched an idea I’ve had for a while. The idea is called [RemoteDebug](http://remotedebug.org), and is an initiative to unify remote debugging across browsers. As a part of my presentation at [FullFrontal conference](http://2013.full-frontal.org/#our-web-development-workflow-is-completely-broken) where I talked about RemoteDebug, I demoed an early prototype of using Chrome DevTools together with Mozilla Firefox.

I want to tell you a bit more about the prototype.

{% img "" /images/remote-debug-firefox-animation.gif %}

<!--more-->

To make the demo happen I haven't invented something completely new. Instead I’ve written something I call a “RemoteDebug bridge”. It acts as a translator between the different dialects of remote debugging protocols.

My vision is to provide a bridge for each remote debugging protocol, but for my demo I’ve written a bridge called [remotedebug-firefox-bridge](https://github.com/auchenberg/remotedebug-firefox-bridge). It acts as a translator between [Google Chrome Remote Debugging](https://developers.google.com/chrome-developer-tools/docs/debugger-protocol) and [Mozilla Firefox Remote Debugging](https://wiki.mozilla.org/Remote_Debugging_Protocol), and can be seen in action in the animiated gif above.

The bridge is implemented as a small node app that connects to Firefox by using Firefox's existing remote debugging protocol, translates the commands and then provides a Chrome Remote Debugging compliant HTTP and WebSocket endpoints, which Chrome DevTools then is configured to connect to.

It make it more understandable I created a small screencast showing it in action:

<figure>
  <iframe src="http://www.youtube.com/embed/86qg7zYh3AY" frameborder="0" allowfullscreen></iframe>
</figure>


It's still an early prototype, but [remotedebug-firefox-bridge](https://github.com/auchenberg/remotedebug-firefox-bridge) shows some of the possibilities that will be possible when we, as a community, unify remote debugging in our browsers.

If you think this is a good idea, and want to see this it happen, please contribute to [RemoteDebug](http://remotedebug.org) and help me pass this idea along to our browser vendors.

This is just the beginning. Imagine where we can go from here.
