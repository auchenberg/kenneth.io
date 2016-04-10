---
layout: post
title: "zero-config local wildcard domains/dns with .dev"
date: 2014-01-08 12:00
published: true
comments: true
categories:
---

A few days ago I was [reminded](https://twitter.com/raamdev/status/430436370977284096) of little script I wrote, and a domain I bought some late night back in 2012. I never took the time to wrap it up as something releasable, but today I spent a few hours building a little website and writing this blog post.

Since the very beginning of [Podio](http://podio.com) we have been using subdomains extensively to provide organizations with their every own URL. Today we are no longer using subdomains for various reasons, but back then I spend a bit of time finding a good solution to get wildcard *.dev domains working in my development environment. 

You should think running a development environment with wildcard *.dev domains is a no-brainer. Ignorantly, I thought I just could add a wildcard entry in my /etc/hosts, and bam it would work. 

It’s not that simple.

<!--more-->

As I found out, it’s not possible to add wildcard entries in your /etc/hosts, and that’s no magic solution to make it work. The way to make it work, the solution is setup a local DNS server, that resolves the traffic to 127.0.0.1, where .dev domains are configured to use the local DNS server.

Sounds complicated? Yeah, there’s plenty of instructions out there telling you to run a few scripts, but all of them seems complicated, and I thought it could be simpler.

So I wrote a small script called [.dev](http://dev.sh), which is installed with a single command from your terminal 

To reveal the details, then [.dev](http://dev.sh) is a small shell script that installs dnsmasq, a lightweight DNS server, registers it as a LaunchDaemon, so it starts when your computer boots, and configures Resolver in OSX to resolve *.dev traffic to dnsmasq.

Read more at [.dev](http://dev.sh).



