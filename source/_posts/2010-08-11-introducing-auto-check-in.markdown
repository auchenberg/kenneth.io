---
layout: post
title: Introducing Auto-Check-in
categories: Uncategorized
---
The past few days I worked on a new mashup-project I wanted to realize since the day I started used Foursquare...

<!--more-->

Let me introduce <a href="http://autocheckin.appspot.com/">Auto-Check-In</a>. It's a new service that removes the hassle about remembering to check-in, since it's doing to for you. <a href="http://autocheckin.appspot.com/">Auto-Check-in</a> does not require (yet) another app running in the background, since it's using Google Latitude to get the your location (Google Latitude is build in into all Android devices, and with an iPhone you need to run one app in the background).

The service is asking for users location every 5min, and if the user has been at the same spot for the configured timespan, the system is asking foursquare for the near by venues and finally checking the user into the closest one.

For the technical interested, I've build the service in Python, and it's running on <a href="appengine.google.com">Google App Engine</a>, with a true async architecture, which takes advantage of the newly released <a href="http://code.google.com/appengine/docs/python/taskqueue/">Task Queues in App Engine</a>.

I teamed up with my friend and colleague <a href="http://mortenjust.com">Morten Just</a>, which had a lot ideas on how the service should work, and the same afternoon he had a user interface ready.

<a href="http://autocheckin.appspot.com/">Auto-Check-In</a> is currently running in a public alpha, and is having about 100 active users that each and every day is checking into a lot of venues, without they need to remember it.

<strong>Roadmap:</strong>
<ul>
	<li>Ranking of near-by-venues, to select a more qualified venue than the closest one.</li>
	<li>Black/white-listing.</li>
	<li>Geofencing.</li>
	<li>Add support for Gowalla, Yelp, Brightkite, etc.</li>
	<li>Gather location from more sources than Google Latitude.</li>
</ul>
