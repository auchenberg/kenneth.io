---
layout: post.html
title: "The messy state of Web Notifications in Blink and Webkit"
date: 2013-07-15 19:21
published: true
comments: true
categories:
---

Lately I've been working with the [Web Notifications API](http://notifications.spec.whatwg.org/), and while working I realized that Chrome ins't following the specification. In this post I will take you through the messy state of Web Notifications.

Showing desktop notifications from the web, was a web-dream for many frontend-developers, until [Fluid](http://fluidapp.com/) enabled it via an [Growl](http://growl.info/) integration in OSX and exposed it as JavaScript API in Fluid. It became quite popular, and many web2.0 cool cats like [Basecamp](http://37signals.com/svn/posts/797-fluid-wrap-your-favorite-web-apps-in-their-own-browser) integrated with it, either themselves or in user scripts by their users.

Soon after followed WebKit-based browsers via it's own notification system, and exposed as an webkit-prefixed API. The Webkit notifications was available on all major platforms, but never became popular. Most likely because the of each notification wasn't what I could call pretty.

{% img "" /images/webkit_notification.png "Source: http://www.neowin.net/news/chrome-gets-desktop-notifications-through-webkit" %}

Last year desktop notification was standardized into the Web Notifications specification, which now lives both as a [W3C draft]((http://www.w3.org/TR/notifications/), and as a [WHATWG standard](http://notifications.spec.whatwg.org/). [Apple](http://apple.com) was one of the first vendors to implement the specification in Safari 6, and announced it as a key-feature, when they released Safari 6 together with [OSX's Notification Center in OSX Mountain Lion](http://developer.apple.com/library/safari/#documentation/AppleApplications/Conceptual/SafariJSProgTopics/Articles/SendingNotifications.html).

Later along followed Chrome implementing the standardized specification, while keeping webkit-prefixed API around.

This is where the mess began.

<!--more-->

## The Web Notifications specification

The W3C Web Notifications specification (now referred as the "the standard") is quite simplistic, and exposes  a ```Notification``` object to represent a single notification.

Below is the IDL for the standardized API. Here it's important to notice the static attribute ```permission``` which is get the current permission state.

	[Constructor(DOMString title, optional NotificationOptions options)]
	interface Notification : EventTarget {
	  static readonly attribute NotificationPermission permission;
	  static void requestPermission(optional NotificationPermissionCallback callback);

	  attribute EventHandler onclick;
	  attribute EventHandler onshow;
	  attribute EventHandler onerror;
	  attribute EventHandler onclose;

	  void close();
	};

	dictionary NotificationOptions {
	  NotificationDirection dir = "auto";
	  DOMString lang = "";
	  DOMString body;
	  DOMString tag;
	  DOMString icon;
	};

	enum NotificationPermission {
	  "default",
	  "denied",
	  "granted"
	};

	callback NotificationPermissionCallback = void (NotificationPermission permission);

	enum NotificationDirection {
	  "auto",
	  "ltr",
	  "rtl"
	};

## Chrome and it's faulty implementation.

The reason why I'm highlighting the static accessor ```permission``` is because it's problematic in Chrome. In the screenshot below I'm inspecting ```Notification``` in Chrome 27's DevTools.
{% img "" /images/chrome_web_notifications.png "" %}

As you can see, the ```permission``` attribute is simply missing from ```Notification```, which makes it impossible to get the current permission state in Chrome.

Luckily since Chrome still keeps the [non-standard webkit-prefixed API](http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification) around, we can fallback to, but it's has a completely different return signature than the standard. Sigh.

The webkit-specific API is exposed on ```webkitNotifications```, webkit-prefixed and in plural. To get the current permission-state you have to call ```checkPermission``` which returns an ```integer```, and not a ```string``` as defined in the standard.

This is messy, but it gets worse.

## Changing the standard's specification.

When Safari 6 was released, the Web Notifications specification was modeled after the, now deprecated, [Feature Permissions specification](http://dev.w3.org/2009/dap/perms/FeaturePermissions.html).

	[NoInterfaceObject]
	interface NavigatorPermissions {
	    const long USER_ALLOWED = 2;
	    const long DEFAULT_ALLOWED = 1;
	    const long DEFAULT_DENIED = -1;
	    const long USER_DENIED = -2;
	    long permissionLevel (in DOMString feature);
	    void requestPermission (in DOMString feature, in Function callback);
	    attribute DOMString[] privilegedFeatures;
	};

This means we got WebKit builds out there, where you need to call the function ```permissionLevel``` to get the current permisssion state. So even with a standard in place, we need to handle the different versions of the standard.

That's messy!

To make keep things sane, an engineer from Apple, committed a [change in Webkit](https://bugs.webkit.org/show_bug.cgi?id=88919) to make the Notification API follow the updated specification. This means Safari 6.0.5 is compliant to the current specification, which simplifies things, but reality is we still need to handle older Safari version(s) and webkit builds.

## Abstracting the mess away.

So wouldn't it be nice if all these messy parts were abstracted away, so you as a front-end developer, just could show those nice notifications?

We already a bunch of library out there like [notify.js](http://notifyjs.com/), to help even out the browser differences, but I haven't been able to find a library that caters for these specific problems in Safari and Chrome. Existing libraries also provides an new API, which isn't what I want, since I quite like the API defined in the specification.

I'm not interesting in emulating the API if Web Notifications isn't available The aim is to fix the faulty implementation.

What we need is a kind of polyfil, to even out the messy implementations within Webkit and Blink, used by Chrome and Safari.

## Polyfiling the gaps with WebNotification.js.

Let me introduce [WebNotification.js](https://github.com/auchenberg/WebNotification.js), a polyfil for ```Notification```, that makes Chrome and other webkit-based browsers standards-compliant.

Simply construct ```Notification``` and it returns an instance of a ```Notification```, like you would expect. When requesting permissions, it follows the specification(s), and fallsback to the prefixed webkit API, when available. To demonstrate the need WebNotification.js I did a small JsFiddle with a little demo where you can request permissions and show a simple notification.

<figure>
	<iframe width="100%" height="300" src="http://jsfiddle.net/auchenberg/sFE4Q/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</figure>

[WebNotification.js](https://github.com/auchenberg/WebNotification.js) fixes the fauly implementation in Chrmoe and enables you to show notifications in Chrome 27+, Safari 6+, and Firefox (as of version 22) all using the standardized API.


## Going forward in Blink and Webkit.

Going forward I really hope the Chrome team get's their faulty implementation cleaned up. I've already open several issues ([here](https://code.google.com/p/chromium/issues/detail?id=163226), and [here](https://code.google.com/p/chromium/issues/detail?id=139594) ) in the Chromium bug tracker, but [little process](https://code.google.com/p/chromium/issues/detail?id=139594#c16) has happened over the past year.

In my search for an explanation of the faulty implementation in Chrome, I asked on the #blink IRC channel, and got told that the reason why Chrome hasn't implemented the static attributes, is caused by [V8](https://code.google.com/p/v8/), V8 simply doesn't support static attributes. You can read more about the details in [this issue](https://code.google.com/p/v8/issues/detail?id=2281) in the Chromium tracker.

This explains why the implementation in Chrome is the way it is, but this probably also means we are stuck with the need of polyfils like [WebNotification.js](https://github.com/auchenberg/WebNotification.js), for a while out in the future.

## Chrome Rich Notifications

In the meantime the Chrome team has been doing some interesting things for their packaged apps, with the [recent release of Rich Notifications](blog.chromium.org/2013/05/rich-notifications-in-chrome.html), that brings a full notification system into the core of Chrome.

{% img "" /images/chrome_rich_notifications.png "Source: http://blog.chromium.org/2013/05/rich-notifications-in-chrome.html" %}

Rich Notifications is really exciting from an experience perspective, and provides a cross-platform (as in operating system) notification system that eventually is going to work on mobile, desktop and ChromeOS.

From a standardization perspective  Rich Notifications is a bit worrying, as it's available as a chrome-specific API, which potentially makes the future of Web Notifications even more messy.

I hope we sometime in the future can take the learnings from Rich Notifications in Chrome, and bring them to the Web Notifications specification, now when we have the Web Notifications API supported in Chrome, Safari and Firefox (as of Firefox 22).

Until then, enjoy the now fully working Web Notifications in Chrome.

<div class="update-box">
  <p><strong>Updates</strong>
    <ul>
      <li>24-10-2013: The previous linked bugs in Chrome has been fixed. Web Notifications now work as expected. Disregard this article.</li>
      <li>03-03-2014: Chrome is about to remove the legacy Web Notifications API from Chrome M35 (Stable @ May 20 2014). Read the <a href="https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/8vqyfHa8_dw">intent to remove</a>.</li>
    </ul>
</div>



