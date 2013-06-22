---
layout: post
title: New version of CSS Reloader for Chrome is out
categories: Uncategorized
---
It has been a long time since I did changes to my CSS Reloader browser extension. This evening I had some time, and pushed a updated version of CSS Reloader for Chrome out in the public.

<!--more-->

The new version contains a revised code-base, which is way more well structured and cleaner, and I also added som new features:
<ul>
	<li>Much requested options-page has been added - allows you to change the keyboard shortcut.</li>
	<li>CSS Reloader got a nice new logo (credits goes to <a href="http://www.everaldo.com/crystal/">Everaldo Coelho</a> for the lovely icon.)</li>
</ul>

<img class="size-full wp-image-178 alignleft" title="CSS Reloader Options-2" src="http://blog.kenneth.io/wp-content/uploads/2011/01/CSS-Reloader-Options-2.jpg" alt="" width="650" />



Technically  I was quite fun to add the options-page, because the settings is persisted in <a href="http://dev.w3.org/html5/webstorage/">LocalStorage</a>, which is only available for the <a href="http://code.google.com/chrome/extensions/background_pages.html">background-pages</a> in  the extension, and not the <a href="http://code.google.com/chrome/extensions/content_scripts.html">content-script</a> that is injected into every tab. To expose the settings for the <a href="http://code.google.com/chrome/extensions/content_scripts.html">content-script</a> I have taken advantage of the <a href="http://code.google.com/chrome/extensions/messaging.html">message passing implementation</a> in Chrome, that allows the extension-parts to communicate using events.


Get the updated version of <a href="https://chrome.google.com/extensions/detail/dnfpcpfijpdhabaoieccoclghgplmpbd">CSS Reloader for Chrome</a>, or check the <a href="https://github.com/auchenberg/css-reloader">source-code</a> out, to see the funky-ness
