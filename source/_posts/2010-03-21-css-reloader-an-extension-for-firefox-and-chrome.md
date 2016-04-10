---
layout: post.html
title: CSS Reloader - an extension for Firefox and Chrome
categories: Uncategorized
---
Some months ago at Vodafone, I was finding myself doing a huge amount of F5's duing the day while I was pixel-pushing parts of the layout of  at <a href="http://360.com">360</a>. 30 minutes later a new Firefox extension was born - <a href="https://addons.mozilla.org/da/firefox/addon/46211">CSS Reloader</a>.

<!--more-->

<a href="https://addons.mozilla.org/da/firefox/addon/46211">CSS Reloader</a> is an extension that allows you to reload the stylesheets of any site with an simple press to F9 (and via the context-menus).

I choose this shortcut, because it wasn't used by any other extension in Firefox, and the key position is quite nice. In the middle of F5 (refresh), and F12 for (Firebug).
You may wonder why I would make such an extension, but imaging you building a true web application, such as <a href="http://360.com">360</a>, where almost everything is happing in the client. This means that if you are tweaking the layout of a model placed in a sub-view, you would have to go to this view every time, and the open the selected modal ( or just make you invokable from the JavaScript console). Anyways it takes time to restore the application state, and with CSS Reloader you can bypass that, because all the state is kept. It's only ghd stylesheets that is being reloaded.

To begin with I released a version of<a href="https://addons.mozilla.org/da/firefox/addon/46211"> CSS Reloader for Firefox</a>, which already has been downloaded more than 7.700 times, so I guess some developers out there also thinks is quite usefull ;)

Because of the response (and my lately switch to Chrome) I decided to do an <a href="https://chrome.google.com/extensions/detail/dnfpcpfijpdhabaoieccoclghgplmpbd">Chrome-version of CSS Reloader</a>. The first version of this is avaiable at the Chrome extension gallery, but since the extensibility of Chrome isn't the same as in Firefox, the Chrome-version is limited to only the F9-key.

CSS Reloader is my first browser extension and is literally 16 lines of code, that saves me  (and the rest of the 360-team) some time during the development 360, which then can be used on better things such as features, extensions and social-beering ;)

Please, let me know what you think of CSS Reloader! What can be improved?
