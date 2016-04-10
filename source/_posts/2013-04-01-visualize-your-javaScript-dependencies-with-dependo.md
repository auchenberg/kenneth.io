---
layout: post
title: Visualize your JavaScript dependencies with dependo
date: 2013-04-01 21:23
comments: true
alias: blog/2013/01/23/visualize-your-javaScript-dependencies-with-grunt-dependencygraph
---

<div class="update-box">
  <p><strong>Update:</strong> grunt-dependencygraph has been replaced by dependo - a more modular version, wrapped up as a NPM-package with both an API, CLI and Grunt task.</p>
</div>

It all started a few months back when I started our "AMDification project" at [Podio](https://podio.com), where we decided to introduce [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) in our codebase, in order to take advantage of tools like [RequireJS](http://requirejs.org/), and [r.js](https://github.com/jrburke/r.js/).

More importantly I also wanted to gain a better overview of the dependencies in our code, by being able to extract the module definitions and their dependencies in a systematic way. Using [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) has enabled this in a simple way, because much of the tooling already existed.

But for a long time I've been looking for a visualization tool to help me visualize the JavaScript dependencies - without any luck.

<!--more-->

Okay, I found a few, but they use [GraphViz](http://www.graphviz.org/), or similar, to  generate huge images that is impossible to handle when you generate a graph of a larger code-base.

I want something better. Something similar to Google Maps, where you have a big graph that's zoomable by mouse or gestures, combined with dragging, to enable panning when the graph is zoomed. I haven't been able to find something like this, so I've  taken the write it myself.

## Introducing dependo
Let me introduce [**dependo**](https://github.com/auchenberg/dependo). It's a small visualization tool that draws an force directed graph of JavaScript dependencies that has been annotated with either [CommonJS](http://www.commonjs.org/), or [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD). Behind the scene I'm using a wonderful library named [node-madge](https://github.com/pahen/node-madge/), to extract the dependencies and combined with the power of [D3.js](http://d3js.org/) I  draw a beautiful zoomable directed graph.

It's all wrapped up as a simple node-module, available on [NPM](https://npmjs.org/package/dependo), with both an API and CLI. I also written a [grunt](http://gruntjs.com/)-task that can be found here [grunt-dependo](https://github.com/auchenberg/grunt-dependo), so it's convenient to hook into your grunt-build system. The output is a simple HTML-file, with everything embedded, so you can publish it directly to your build server, etc.

## Example: RequireJS multi-page visualization
Enough talk. The best way to show something is by example, so here I generated a graph of the official RequireJS [multipage](https://github.com/requirejs/example-multipage) example:

<figure>
  <iframe src="http://auchenberg.github.com/dependo/example/"></iframe>
</figure>

It's still early days, but I think this tool will help developers getting a better overview of modules and their dependencies. I really hope you like this tool too.

Have an good idea, or wanna contribute? All feedback is highly appricated.

[https://github.com/auchenberg/dependo](https://github.com/auchenberg/dependo)
