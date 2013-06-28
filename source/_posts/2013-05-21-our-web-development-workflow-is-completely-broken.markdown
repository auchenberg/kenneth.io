---
layout: post
title: Our web development workflow is completely broken.
date: 2013-05-21 15:30
published: true
comments: true
categories:
---

I'm sitting here at Google headquaters in Mountain View, and is trying to sum up my take aways from this years [Google IO 2013](https://developers.google.com/events/io/). At the conference I had a chat with [Paul Irish](http://paulirish.com) and [Pavel Feldman](https://twitter.com/repenaxa) on where the Chrome developers tools are headed, which has spurred me to write this blog post.

The web development workflow has been on my mind for a while. I've been talking about it at a number of [CopenhagenJS](http://copenhagenjs.dk) meet-up's, but now is the time put my thoughts down into a blog post.

My passion is to build tools. I love building the fundamental lego-bricks that other's can combine in ways I didn't imagine. The past years I've been building [Podio](http://podio.com), a work platform where we have enabled more then 50.000 organizations to work better by enabling them to build their own tools.

<!--more-->

In the process of building [Podio](http://podio.com), our frontend has been through dramatic changes. We started out in a simple Rails-app with a bit of DOM manipulation on top, but today around 85% of our frontend code is JavaScript. This has had an huge impact on our tooling and the way we go about frontend development.

This shift hasn't only happened at [Podio](http://podio.com), but is happening everywhere. The past 5 years we have fundamentally changed the way we use the browser. The browser is no longer a simple document reader; instead it's a complex application runtime that runs realtime GPU accelerated applications.

But we have a problem.

> Our tools are still based on the assumption that we are inspecting simple documents that have formatting on top, and a few lines of JavaScript on the side.

Let's I take a quick walk down memorylane to recap where we are coming from with our web developer tooling.

## Microsoft Internet Explorer and IE Developer Toolbar ##

Back in the good old IE days, Microsoft [released](http://betanews.com/2005/09/19/microsoft-issues-ie-developer-toolbar/) a wonderful tool called ["IE Developer Toolbar"](https://www.google.dk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CCwQFjAA&url=http%3A%2F%2Fwww.microsoft.com%2Fen-us%2Fdownload%2Fdetails.aspx%3Fid%3D18359&ei=oBCVUd73NOiligL-qoGIDQ&usg=AFQjCNGPJOmdDZBHBQ7bnEO1tIGapmZzEQ&sig2=WVwUTewSiA50I6noi2Ay5g&bvm=bv.46471029,d.cGE). This toolbar enabled us, developers, to inspect the HTML and find the related CSS directly from the browser. The toolbar even had a script-debugger for those writing crazy DHTML. The toolbar was an add-on to IE, and was simply implemented via the IE's toolbar API, so it wasn't fully integrated within the browser - It was slow, but it did the job.

{% img images/ie-developer-toolbar.jpg %}

Take a look the toolbar. Does it look familiar to you? I should, because if you look at any web developer tool today it's heavily inspired by the layout the IE-team did, more than 5 years ago.

With IE Developer Toolbar, we could for the first time, see what was going on inside the browser. We could "inspect the DOM", and because of this functionality many of us moved to IE as our "development browser".

## Mozilla Firefox and Firebug.

After the innovation stopped with IE6, came Mozilla with Firefox, and soon after [Joe Hewitt](http://joehewitt.com/) released [Firebug](http://getfirebug.com/). I describe Firebug as the second generation of DOM inspectors. It looks identical to IE Developer Toolbar, but was a big step up from IE Developer Toolbar when released. It was fast and had a tons of small features that made daily tasks easier or even faster to complete.

Conceptually Firebug is still based on the same assumptions as the IE Developer toolbar. It's a tool designed to "inspect" the document, show the DOM, and highlight the applied styles.

{% img images/firebug.jpg %}

I think the success of Firefox is highly related to Firebug. I believe Firebug was the main argument for many developers choose Firefox as their standard browser.

## Google Chrome and Developer Tools

A few years later Google came around with their [Chromium project](http://www.chromium.org/). First came Chrome on Windows, and then later followed OSX and Linux. Chrome had a fresh minimalistic UI, a revolutionary ([V8](https://code.google.com/p/v8/)) JavaScript engine, and for the first time brought [WebKit](http://www.webkit.org/) to all major platforms. From a tooling perspective Chrome started out by inheriting the default WebKit web developer tools, but not long after the Chrome team began investing in the tooling.

{% img images/chrome_developer_tools.jpg %}

From my perspective the investment into the tooling, and the innovations made in [WebKit](http://www.webkit.org/) and [V8](https://code.google.com/p/v8/), are the main reasons why Chrome quickly became the standard browser for many developers.

The Chrome Developer Tools are the 3rd generation of DOM Inspectors. When released it was big step forward. Many of the small annoying things from Firebug was either fixed or improved, and the inspector itself was the first that was implemented directly in the browser, which meant really good performance.

If you look at the conceptual model for Chrome's Developer tools, it's exactly the same as if we go 5 year back: The tool is mainly designed to inspect simple documents, and nothing more.

As time has gone by, more "tabs" or separate tools, has been added. Today in the Chrome Developer Tools we have a separate DOM Inspector, JavaScript debugger, profiling tools, network analyzer, timeline visualization, console and most importantly a simple code editor. When you look at each tool in the big picture, they are all separate with a minimal integration inbetween.

## Our web development workflow is completely broken.

While the way we build web applications has changed completely, our web developers tools haven't. There has definitely been innovation the recent years, but clearly there is room for more. When I look at the way frontend-developers are using web developer tools in Chrome, Firefox and Internet Explorer, and how they use them together with their editors, it becomes evident that our web development workflow is completely broken.

In the following chart I have tried to sketch out a typical bug-fixing workflow for web developer:

{% img images/todays-frontend-flow.png %}

## Fixing the symptoms with more tools.

Many small tools have been created to fix the symptoms we are seeing in this broken workflow. The main problem with these tools is that they actually made the overall workflow even more complicated.  They have added additional workflows that all requires more tools and processes to be needs to be maintained and started.

{% img images/terminals.png %}

Admitted. I've been one of those people. A few years back I wrote [CSS Reloader](http://blog.kenneth.io/blog/2010/03/21/css-reloader-an-extension-for-firefox-and-chrome/) for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/css-reloader/) and then later [Chrome](https://chrome.google.com/webstore/detail/css-reloader/dnfpcpfijpdhabaoieccoclghgplmpbd?hl=en). CSS Reloader allowed you to force a reload of the stylesheets, which hopefully made it much easier to do pixel pushing.

Today tools like [LiveReload](http://livereload.com/) is a part of our frontend-stack, but when you think about it, it's quite weird, and overly complex to have a local file-watcher running and connected to the browser.

{% img images/livereload-flow.png %}

We have manged to combine many cool technologies as work arounds - to fix the symptoms; not the fundemental problem.

## Developer tools becoming your editor.

More recently our web developer tools started becoming better code editors. This both goes for Firefox and Chrome, but especially the Chrome-team seem to have invested in the editor-part. In Chrome you can even choose to use [CodeMirror](http://codemirror.net/) as your code-editor, but is this really the editor you want to use?

When using the browser as code-editor, we are entering a world of new problems. The browser is designed to abstract away the local file system, and is based upon a read-only/execute-only model. In order to "fix" this we have introduced a new type of browser extensions, that's trying to fix this.

For example: Today we have mapping-extensions like [FireSASS](https://addons.mozilla.org/en-US/firefox/addon/firesass-for-firebug/) for enable better editing of SASS stylesheets, and even here in the [Chrome DevTools Revolutions 2013 session](https://developers.google.com/events/io/sessions/325206725), [Paul Irish](http://paulirish.com) announced that the SASS support using sourcemaps, is available in Chrome stable, as a built-in feature.

Let's stop and think about the concept of SASS sourcemaps? We are mapping CSS to SCSS, because the browser's editor is editing what's being served to the browser - not what's on the local file system. That's a problem because we are using the developer tools as the editor, and only because of that.

In addition to the mapping-problem, using the developer tools as the code-editor raises a set of new question:

- What to expect from the editor within the developer tools?
- Should it replace my existing editor?
- What kind of functionality can I expect?
- Why should I consider replacing my existing editor? Why new brings it to the table?
- What about server-side code editing? Is that covered too?

> Does this mean that the browser vendors are on their way to compete with the editor vendors?

It's also important to realize that the reality for a frontend developer: The application needs to be able to run in multiple browsers.

It doesn't really work to put all of the tooling into one browser, without thinking of the others. What we need is something that makes it easy for us to develop, test and run our app in many browsers - most likely our editor.

## Keep our editors being editors, and let's integrate.

What about we do something different? We keep our editors being our editors, and let them communicate with our browsers. What I in-vision is a total integrated experience from the editor to the browser, that's enabling me to increase my productivity by having a much more sane workflow.

What if you could edit a file in your editor, and have the changes reflected directly in the browser?

Maybe it could work like this:

{% img images/editor_workflow.png %}

Why? First of all I do believe all developers has chosen their editor for good reasons. There are a million editors out there, and each developer has carefully selected his/her editor by a variety of criteria. Maybe it's the refactoring-functionality, the themes or the plugins? It's all individual, each made their trade-offs and its's perfectly fine.

Secondly, by turning the browser developer tools into an editor, the browser-vendors are entering a highly opinionated and religious world. More importantly why re-invent editing-functionality inside the browser when we already got it in our existing editors? It's a waste of good resources, unless the goal is to build the ultimate code-editor. Is it?

Thirdly, what I want to browser-vendors to focus on is to innovate on the platform , instead re-inventing stuff that we already have. Today I consider my browser my application runtime. Actually I have multiple runtimes (IE, Firefox, Chromium, Safari) to support, and it's not making my life easier, if each of them turns into separate editors.

> I think deep integration between our editors and browsers is the key to better a webplatform.

One thing I noted here at I/O, during the keynote was the big applause from all the Android guys, when the Android Studio was announced. One key feature that was highlighted was the feature get an instant preview of the application layout, as they changed it.

We need the same for the webplatform, but our world is a bit more complicated. We got multiple runtimes, many languages, web servers, frameworks and editors, so how about integrating the pieces we already got?

### Remote-debugging protocols and standardization.

We actually already have a way to integrate our editors with our browsers, and it's called remote-debugging protocols. An API to the browser. An alternative interface, and it's available in both Chrome and Firefox.

Chrome introduced this protocol back in [May 2011](http://blog.chromium.org/2011/05/remote-debugging-with-chrome-developer.html), and is best known for the functionality to debug mobile devices from Chrome. Actually the protocol is a part of WebKit, and is also used in Safari, which enables [Safari mobile remote debugging](http://moduscreate.com/enable-remote-web-inspector-in-ios-6/).

The funny thing here is that this concept isn't new. You've had editor integration via Microsoft Script Debugger or Visual Studio since the old Internet Explorer days to debug JSCRIPT, just like any other Microsoft language, but people seem to have forgotten.

Mozilla Firefox also got a [remote debugging protocol](https://wiki.mozilla.org/Remote_Debugging_Protocol), which is great, but we got a fundamental problem.

The remote debugging protocols are incompatible with each other, and each has a different features.

> It's nearly impossible to make a sane integration with these API's.

This is the main reason why we haven't seen that many integrations using these remote debugging protocols. It's simply not worth adding tooling support for experimental features into the editors.

In our community we have brave people, like [Remy Sharp](http://remysharp.com/), who have started an open-source project called [RemoteDebug](https://github.com/leftlogic/remote-debug), that is aimed to provide a consistent debugging interface to all browsers. Hopefully this project will succeed, now that the browser vendors have failed to agreee.

Going forward I think a unified remote debugging protocol is a new key functionality we need in the browser. We need to be able to communicate to the runtime in a standardized way, so tooling-vendors knows that their integration are cross-platform. Once we have a settled on a consistent interface I'm sure we will see more editor-vendors make these integrations.

We can achieve the consistent interface through standardization, and we already got the organizations in place for this.

### What integrations could look like.

We already have seen exciting experiments from [JetBrains](http://jetbrains.com) with [WebStorm LiveEdit](http://blog.jetbrains.com/webide/2012/08/liveedit-plugin-features-in-detail/) and [Stanislav](https://github.com/sokolovstas)'s [Sublime Web Inspector](https://github.com/sokolovstas/SublimeWebInspector), which integrates WebStorm and Sublime Text 2 with Chrome using the remote debugging protocol. Check out these videos:

<figure>
  <iframe src="http://www.youtube.com/embed/wCVwdvufTds" frameborder="0" allowfullscreen></iframe>
</figure>

<figure>
  <iframe src="http://www.youtube.com/embed/LaH_43N34Jg" frameborder="0" allowfullscreen></iframe>
</figure>

### Missing pieces in our web platform.

In order to make deep integrations possible, we also need some extra pieces from the web platform. Essentially we need to be able to re-replay and re-do every single step in a page-load. We need to able to reload assets in a clever way, so when the editor is changing line 28 in a stylesheet, we can update that specific line, and trigger a reflow/repaint.

We also need to be able to reload images and other assets, and to be able to clear the cache for a specifc object. Today we are making many workarounds to bypass the cache for resources - is just stupid.

More importantly we need to be able to do realtime JavaScript editing "edit-and-go", so we don't need to make a refresh and loose in-memory states. We can already do this with [setScriptSource](https://developers.google.com/chrome-developer-tools/docs/protocol/tot/debugger#command-setScriptSource) in Chrome, but what about the other browsers and other resources?

Lastly we also need to figure out how we handle the DOM, and ensure that the already rendered DOM-three somehow is synchronized with our application code we are editing. Maybe WebComponents will make this easier going forward? Who knows? Who are looking into this?

### What about the big picture?

Browser-vendors, this is the kind of problems I want to you look into. They are important to our platform. You already have the resources, so please stop using them to re-implement our editors. Focus on our platform and the big picture. Talk to the editor-vendors, work together and build integrations to bring the ecosystems together.

We can build on top of our already awesome editors. Take a look at innovation [Adobe](http://adobe.com) did with [Brackets](http://brackets.io/). They did a innovative contextual css-editor that allows you to edit the related CSS directly from your HTML-editor.

{% img images/brackets-quick-edit-2.png %}

Imagine if we could bring contextual information from the browser directly into the editor. I'm thinking computed-styles, dimensions, rendering previews on hover. Lets try to think outside of the box, like Adobe did with Brackets.

> Visual debugging could get a whole new meaning, and we could finally show the right information in the right context.

I want to make these kinds of integrations happen. I want to make our web development easier, more productive and most importantly **more fun**.

Let's make it happen.
