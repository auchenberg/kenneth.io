---
layout: post
title: "Word wrapping/hyphenation using CSS."
date: 2012-03-04 14:34
comments: true
categories:
---


A few days back I spent most of my afternoon looking into how I could achieve proper word wrapping within elements with a dynamic width.

At [Podio](https://podio.com), we have a fluid layout, with a dynamic width, to deliver a responsive user experience. This means no element is having a fixed width, instead width's are defined as percentages. This causes some headaches, now and then. Word wrapping caused a major one.

Initially I thought: It's a no-brainer, just add ```word-wrap: break-word``` to the element, and it should do the wrapping.

It's not.

<!--more-->

When you have an element with a dynamic width ```word-wrap: break-word```, isn't having any effect. Today's browsers don't use the calculated width to enforce the wrapping. Instead they seem to ignore the declaration.

## Wonders of a dynamic width.

In this example I used a generic layout for a two column layout, using table-cell and floats.

<figure class="codepen">
  <iframe width="100%" height="300" src="https://jsbin.com/bofaho/1/embed?output" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</figure>

As you can see in this example, the long word isn't wrapped into multiple lines, it breaks the layout.

So how do we make it look more like this?

<figure class="codepen">
  <iframe width="100%" height="300" src="https://jsbin.com/cawoxu/1/embed?output" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</figure>

## Our options with HTML and CSS

In my research I found a lot of proposals on how to fix this issue. Most of them was a suggestion to add a fixed width to the element. Sometimes you need the dynamic width, like when you use the media-block from [OOCSS](http://oocss.org/), so what's the alternatives?


## &lt;WBR&gt; and &amp;#8203; tags
The past years I've been using &lt;WBR&gt; and &amp;#8203; tags to insert optional line breaks into long paragrahs of text. This solution became quite made popular after [Quirksmode](http://www.quirksmode.org/oddsandends/wbr.html), made documented it.

This technique is is widely used around the web, including places like Facebook. And there seem to be wbr-encode implementation for all major languages functions, but they all have one common problem. As soon you are outputting markup, and want to break up long words within tags it starts to get messy. To overcome this, it ends up in a lot of regex nightmare, and ultimately, a slow HTML parser, to ensure proper breaking.

This slows down rendering dramatically.

## What about CSS?

Wouldn't it be better, if the browser could do the work?

In my search for a working CSS declaration, I found [```word-wrap```](https://developer.mozilla.org/en/CSS/word-wrap), which isnt working with a dynamic width, so I continued and found a new CSS3 declaration [```word-break```](http://www.w3.org/TR/css3-text/#word-break), which is described as: "This property specifies line break opportunities within words."

Great, so let's try it out in a WebKIt-based browser:

<figure class="codepen">
  <iframe width="100%" height="300" src="https://jsbin.com/guciko/1/embed?output" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</figure>

Bamn, we got it. ```word-break: break-all``` is the way to go for WebKit..

But then I fired up IE8 and Firefox, and realized that it didn't work, so I continued my search...

It seems like the ```word-break``` declaration is prefixed in Internet Explorer 8 standards mode, so you need to add a prefix:

     -ms-word-break: break-all;
         word-break: break-all;

But what about Firefox? The Mozilla guys has chosen not to implement ```word-break``` support into Gecko. Instead they focused on supporting something new and exciting, the [CSS3 Hyphenation](http://www.w3.org/TR/css3-text/#hyphenation) specification.

## CSS3 Hyphenation
Hyphenation is the better word-break. It's locale aware, and inserts the [hyphen](http://en.wikipedia.org/wiki/Hyphen) character at the correct place, when breaking the words.

The support of [CSS3 Hyphenation](https://developer.mozilla.org/en/CSS/hyphens) has started in Firefox 6 for the english languages, and several other langugages was added in Firefox 8. Word hypenation is dependent on a dictionary, so you must specify the ```lang``` attribute on the HTML element or one of the target elements ancestors, to help the browser use the right dictionary.

It's already supported in WebKit, currently prefixed, which means [Safari 5.1+ and iOS 4.2](http://caniuse.com/css-hyphens).

[CSS3 Hyphenation](http://www.w3.org/TR/css3-text/) isn't supported in Chrome, since Chrome doesn't ship with any [hypenation dictionaries](https://twitter.com/fakebaldur/status/176625058440167424), but since Chrome supports ```word-break: break-all```  we are good.

To support hyphenation in Safari, Firefox (and future Chrome versions), you will need to do:

    -webkit-hyphens: auto;
       -moz-hyphens: auto;
        -ms-hyphens: auto;
            hyphens: auto;

## Webkit and mystic "word-break: break-word"

When using the ```word-break: break-all```  property, is has the sideeffect, that words are being broken up at weird positions, because the ```break-all```, means all words needs to be broken up.

An example of this looks like this:

<figure class="codepen">
  <iframe width="100%" height="300" src="https://jsbin.com/tomapa/1/embed?output" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</figure>

To fix this, I discovered, that you can use ```word-break: break-word``` which seems to be an undocumented and non-standard property value in WebKit. This makes the word wrapping behave like ```word-wrap: break-word```, but works with dynamic widths.

<figure class="codepen">
  <iframe width="100%" height="300" src="https://jsbin.com/dayaxi/1/embed?output" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</figure>

As you can see in the above example, the word wrapping looks much better using  ```word-break: break-word```. This leaves us behind with IE, which still would wrap the words at weird positions.

Luckely CSS Hyphenation is supported in IE10 in a prefixed form, so eventually IE won't be a problem.

## The solution

So the cross browser solution for doing word wrapping using CSS only is a combiation of ```word-break```, ```word-break: break-word``` and ```hyphens```:

    /* Warning: Needed for oldIE support, but words are broken up letter-by-letter */
     -ms-word-break: break-all;
         word-break: break-all;

         /* Non standard for webkit */
         word-break: break-word;

    -webkit-hyphens: auto;
       -moz-hyphens: auto;
        -ms-hyphens: auto;
            hyphens: auto;

This is working in Internet Explorer 8+, Firefox 6+, iOS 4.2, Safari 5.1+ and Chrome 13+.

<figure class="codepen">
  <iframe width="100%" height="300" src="https://jsbin.com/deqobi/1/embed?output" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</figure>

The end result is simpler markup, and faster rendering, since we don't need encode our strings with &lt;WBR&gt; and &amp;#8203;.

Goodbye &lt;WBR&gt;, I don't need you anymore.

<div class="update-box">
  <p><strong>Updates</strong>
    <ul>
      <li>20-01-2015: Changed JSfiddles to JSbins due to lack of HTTPs support.</li>
      <li>03-01-2015: Added warning about <code>word-break: break-all</code>, as it causes words to be broken up letter-by-letter.</li>
      <li>27-07-2013: Added note about  <code>lang</code>-attribute for CSS Hyphenation, and added <code>-ms-hyphens</code> for IE10. (Credits: <a href="http://twitter.com/simevidas">Šime Vidas</a>)</li>
      <li>Included a section about <code>word-break: break-word</code> in WebKit (Credits: <a href="http://twitter.com/mkristensen">Mads Kristensen</a>)</li>
      <li>Added proper references to <code>word-break: break-all;</code>, and highlighted that CSS3 Hyphenation isn't supported in Chrome (Credits: <a href="http://twitter.com/fakebaldur">Baldur Bjarnason</a>)</li>
    </ul>

</div>

