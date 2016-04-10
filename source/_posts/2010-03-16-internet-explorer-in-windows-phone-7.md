---
layout: post
title: Internet Explorer User Agent revealed in Windows Phone 7
categories: Uncategorized
---
I'm here at the Microsoft MIX 2010 conference with <a href="http://madskristensen.net">Mads Kristensen</a> and <a href="http://larholm.com">Thor Larholm</a>. At the Mix10 conference, the Windows Phone 7 teams had some very big announcements – a lot of it had been kept secret and first revealed to the public now. Some of these secrets are the user agents of Internet Explorer for Windows Phone 7, which they simply wouldn’t give us.

<!--more-->

I had a chance to play with the phone, but the Microsoft guys were not really that keen on revealing what browser version it is running. Despite this, I managed to secure a copy of the useragent string from the ASUS Galaxy 6 device:
<blockquote><strong>Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0) Asus;Galaxy6</strong></blockquote>

Unlike the iPhone, Windows Phone 7 will launch with a browser that does not support the latest web standards. Far from it, actually, as IE7 is already starting to feel outdated.

The IE team told me that the browser in Windows Phone 7 is a mobile version of IE7 with certain features ported from IE8. So it doesn’t use the full Trident 4 layout engine that IE8 uses, but instead Trident version 3.1 with a few extra capabilities.

This basically means that<strong> we should not </strong>expect to build HTML5-enabled apps for the Windows Phone 7. I perceive this as a very clear signal from Microsoft, that confirms Microsoft are going all-in on the Silverlight-platform for mobile development.
