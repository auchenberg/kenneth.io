---
layout: post.html
title: How to use desktop icons in Google Chrome - the HTML5 way.
categories: Uncategorized
---

Today I wondered how Google Reader and Google Mail was having nice high resolution icons when I saved a application shortcut to them in Google Chrome (currently a windows only feature).

<!--more-->

I searched a bit, but had trouble finding documentation on this functionality. Even the Google Chrome/Chromium developer pages didn't contain anything. But after some more research, I discovered a small <a href="http://www.google.com/chrome/intl/en/webmasters-faq.html">Webmaster FAQ for Google Chrome</a> that contained a single example on how to add icons, application name, description and application urls.

The code example:
<pre>&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
 &lt;head&gt;
  &lt;title&gt;Gmail&lt;/title&gt;
    &lt;meta name="application-name" content="Gmail"/&gt;
    &lt;meta name="description" content="Google's approach to email"/&gt;
    &lt;meta name="application-url" content="http://www.gmail.com"/&gt;
    &lt;link rel="icon" href=gmail_32x32.png sizes="32x32"/&gt;
    &lt;link rel="icon" href=gmail_48x48.png sizes="48x48"/&gt;
 &lt;/head&gt;
 &lt;body&gt;</pre>
When I saw this code example the first thing that hit my mind was "This code is invalid!".

Take a look at the sizes-attribute. This attribute isn't a part of any final HTML specification, but then I had a look at the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#rel-icon">HTML5-specification</a>, and it seems to be that Google Chrome is following the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#rel-icon">HTML5-specification</a> for external icon resources (an obvious choice!).

The <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#rel-icon">HTML5 specification 4.12.3.7 Link type "icon"</a>,  defines as following:
<pre>The specified resource is an icon representing the page or site, and should be used by the user agent when representing the page in the user interface.</pre>
You might wonder what the correct values of sizes-attribute could be, and luckyly the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#rel-icon">HTML5-specification</a> tells a bit more about the sizes-attribute.
<pre>If specified, the attribute must have a value that is an <a href="common-microsyntaxes.html#unordered-set-of-unique-space-separated-tokens">unordered set of unique space-separated tokens</a>. The values must all be either <code title="attr-link-sizes-any"><a href="#attr-link-sizes-any">any</a></code> or a value that consists of two <a title="valid non-negative integer" href="common-microsyntaxes.html#valid-non-negative-integer">valid non-negative integers</a> that do not have a leading U+0030 DIGIT ZERO (0) character and that are separated by a single U+0078 LATIN SMALL LETTER X character (x)</pre>
This means if you have two options for defining a size of an icon. You could either use "any" that represents that a resource which contains a scalable icon, or you could use a size in this pattern "[width]x[height]" with non negative integers that represents the icon size in pixels.

You are able to define multiple resource links for icons in various sizes.   Take a look at this example from the HTML5 specification:
<pre>&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
 &lt;head&gt;
  &lt;title&gt;lsForums — Inbox&lt;/title&gt;
  &lt;link rel=icon href=favicon.png sizes="16x16" type="image/png"&gt;
  &lt;link rel=icon href=windows.ico sizes="32x32 48x48" type="image/vnd.microsoft.icon"&gt;
  &lt;link rel=icon href=mac.icns sizes="128x128 512x512 8192x8192 32768x32768"&gt;
  &lt;link rel=icon href=iphone.png sizes="59x60" type="image/png"&gt;
  &lt;link rel=icon href=gnome.svg sizes="any" type="image/svg+xml"&gt;
 &lt;/head&gt;
 &lt;body&gt;</pre>
As you can see this page would support a broad range of icon sizes form the commonly known favicon to a scalable svg icon.

We can only hope that future browsers, and existing ones (Safari Mobile on iPhone, currently having it's own resource type) will start supporting this specification, since it would save us, web developers, a bit of work.
