---
layout: post
date: 2015-04-08 12:20:16+00:00
title: "Colorize Android statusbar for your Website"
description: "With a simple meta tag called theme-color you're able to submit a color code which will then be used on Android Smartphones."
keywords: "android, statusbar, color, meta, html"
category: Frontend-shizzle
tags:
- HTML
- CSS
---

Since Android 5.0 every tab is considered a App on your phone.
Besides that, you can now colorize the statusbar for your website!
With a simple meta tag called **"theme-color"** you're able to submit a color code which will then be used on Android Smartphones.

I've tested this functionality with my own blog and the publishingblog.ch website, which is another site i'm blogging on.
On the Screenshots you can clearly see, how this behaves. The Twitter app has it's colorized statusbar aswell as the two websites stated above. The [weloveyou.ch](http://weloveyou.ch) Website does not have a meta tag and thus the statusbar remains white.

Here's the HTML snippet to it. Just simply place the meta tag in your head part and you're done!

~~~html
<head>
    <meta name="theme-color" content="#53A6DC">
</head>
~~~