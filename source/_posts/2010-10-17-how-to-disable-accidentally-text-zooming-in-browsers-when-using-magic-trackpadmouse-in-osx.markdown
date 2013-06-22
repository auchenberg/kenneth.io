---
layout: post
title: How to disable accidentally text-zooming in browsers when using Magic Trackpad/Mouse in OSX
categories: Uncategorized
---
One thing has lately annoyed me, and it has been the accidentally text zooming in my browsers (Google Chrome, Firefox and Safari), when using the Trackpad, Magic Trackpad or Magic Mouse.

<!--more-->

The text zooming happens because the pinch-gesture (zoom) has been enabled for the trackpad/mouse, which by default, is mapped to text-zooming in the browsers.

To disable the text-zooming I used a tool called MultiCluch, which is a input-filter that monitors all multi-touch-input and remaps the gestures to keyboard-combinations. So what I did was to map the zoom-in and zoom-out gestures in Google Chrome to a keyboard combination that is doing absolutely nothing.
<ul>
	<li>Install MultiCluch from <a href="http://wcrawford.org/2008/02/28/everytime-i-think-about-you-i-touch-my-cell/">http://wcrawford.org/2008/02/28/everytime-i-think-about-you-i-touch-my-cell/</a></li>
	<li>Add Google Chrome (or the browser you are using), by clicking the small +</li>
	<li>Add a mapping for zoom-in and zoom-out to a keyboard combination without any action (I used CMD+CTRL+SHIFT+ALT)</li>
	<li>Restart your browser</li>
	<li>Bingo, text-zooming is now disabled!</li>
</ul>
