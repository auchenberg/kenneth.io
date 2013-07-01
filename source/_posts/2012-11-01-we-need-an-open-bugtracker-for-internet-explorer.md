---
layout: post
title: We need a open bug tracker for Internet Explorer
date: 2012-11-01 11:00
comments: true
categories: browsers
---

Today I had an issue with drag & drop using jQuery UI's sortable. It was isolated to IE10, only when scrolling, so I started to research to to see if it was a bug within jQuery UI, jQuery or maybe even inside IE10.

<!--more-->

## jQuery UI ticket

In my search I first found a [jQuery UI ticket](http://bugs.jqueryui.com/ticket/8633), that lead me to a jQuery ticket ["EVENT.PAGEX AND PAGEY HAVE INCORRECT VALUES IN IE10 ON WINDOWS 8 RTM"](http://bugs.jquery.com/ticket/12343).

## jQuery ticket

In this jQuery ticket, created 7 weeks ago, people are discussing the cause of this, and they confirm it's a bug **within Internet Explorer 10**. The RTM version.

## IE10 bug report

This jQuery ticket, didn't lead me to a issue reported in the Internet Explorer bug tracker, instead it has this final comment:

"I heard back from Microsoft, they have a patch that will go out a few days after the official public release that will fix this issue. There's no reliable marker that jQuery can use to tell fixed vs unfixed implementations, so your best bet is to tough it out until then."

## The need for an open bug tracker
This is **EXACTLY** the reason why we **NEED** an open bug tracker for Internet Explorer. As a frontend-developer, need to know about these issues, because they affect how and what I'm building.

I want to know the open issues in any browser. What progress they are making, and most importantly when the fixes goes out. I can follow the status of bugs reported in Chrome, Firefox, Gecko, Webkit, etc, but where is the openness from Microsoft?

I don't want to end up in a jQuery bug tracker to find out about bugs in Internet Explorer. They belong to it's own open bug tracker.

I know there is a bug tracker for Internet Explorer (somewhere at connect.microsoft.com), but it's really hard for me as a developer to follow what's going in in IE, especially compared to the other browsers out there.

Microsoft, if you want us frontend developers support and build applications for your platform (IE), you need to bring us closer to your browser.

**Openness is the necessary step forward.**


