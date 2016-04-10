---
layout: post.html
title: Slides and code from my ANUG jQuery CodeCamp at Vertica
categories: Uncategorized
---
This saturday I hosted a jQuery CodeCamp at <a href="http://vertica.dk">Vertica</a> in Århus, Denmark.  The code camp was arranged by <a href="http://anug.dk">ANUG</a>, a local .NET user group in Århus, which is one of the most active .NET user groups in Denmark. It was really awesome to see that many people meetup on a saturday to do some jQuery hacking!

<!--more-->

My intention with the CodeCamp was to give a brief introduction to jQuery, and do a presentation about all the things you can't read about in the documentation. But since this was a CodeCamp I also had a mission for the attendees.

The mission was that all the attendees, by the end of the CodeCamp should had been building they own chat client, which connected to a chat-server I had build using <a href="http://socket.io">socket.io</a> and <a href="http://nodejs.com">node.js</a>.

I knew from the very beginning that the mission was quite ambious for a crowd that wasn't used to do jQuery/JavaScript stuff, but we succeded! All the attendees managed to build a chat-client that connected to the server, and one even managed to implement a google-maps mashup that showed the location of each connected user!

Here's the slides from the CodeCamp:
<figure class="slides">
  <object id="__sse5545896" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="650" height="535" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="src" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=kennethauchenberg-jquerycodecamp-101024153558-phpapp02&amp;stripped_title=jquery-codecamp&amp;userName=auchenberg" /><param name="name" value="__sse5545896" /><param name="allowfullscreen" value="true" /><embed id="__sse5545896" type="application/x-shockwave-flash" width="650" height="535" src="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=kennethauchenberg-jquerycodecamp-101024153558-phpapp02&amp;stripped_title=jquery-codecamp&amp;userName=auchenberg" name="__sse5545896" allowscriptaccess="always" allowfullscreen="true"></embed></object>
</figure>

The source code for the chat-server can be found right here: <a href="http://github.com/auchenberg/jquery-codecamp">http://github.com/auchenberg/jquery-codecamp</a>
