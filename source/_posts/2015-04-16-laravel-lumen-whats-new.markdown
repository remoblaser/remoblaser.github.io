---
layout: post
date: 2015-04-16 12:20:16+00:00
title: "Lumen is here! But whats is it?"
description: "It's finally here! Lumen! A fast and lightweight version of Laravel."
keywords: "laravel, lumen, php"
category: Laravel
comments: true
id: 5

tags:
- Laravel
- Lumen
- PHP
---

It's finally here! Lumen! A fast and lightweight version of Laravel.
But what's a light version of Laravel?
Lumen is the perfect framework for building Laravel based micro-services and smaller projects.

Even though it's a "small" version of Laravel, it still supports all the features you love like Eloquent, Caching, Queues, Validation, Middleware and of course routing.

And if you ever feel like you need the full Laravel stack, you can just copy and paste your project to a fresh Laravel setup and continue working! Awesome!

Let's have a look at it!


## The speed difference

According to lumen.laravel.com, this little boy is able to handle 1900 requests per second.
In comparison: Silex is able to handle 1000 requests per second, Slim 3 manages 1800 requests per second.

Lumen uses [FastRoute](https://github.com/nikic/FastRoute) instead of the full Symphony routing, which is the most time and resource saving part.
It also instantiates the HTTP request lazily and only if the full request is needed.
It forces the developer to enable Eloquent, Sessions, Facades etc. instead of just serving everything out of the box.

With all this small things, Lumen is one of the fastest PHP Micro Framework out there. Oh and did i mention,
YOU CAN JUST COPY YOUR CODE TO A LARAVEL INSTALLATION AND IT WORKS!? AWESOME!


## When to use it?

Lumen is a perfect solution if you're trying to build small web applications or API's.
It's fast, slim and easy.<br />
Basically you could always start a web project in Lumen and then just copy it into a
Laravel installation if you need more features and a full stacked Framework.


## Useful Links
Here are some links you should definitely check out!

[Reddit announcement including discussions with Taylor](http://www.reddit.com/r/PHP/comments/32kajb/lumen_php_microframework_by_laravel/)<br />
[Lumen Website](http://lumen.laravel.com)<br />
[laravel-news announcement and a small interview with Taylor](https://laravel-news.com/2015/04/lumen/)<br />
[Matt Staufer on Lumen](https://mattstauffer.co/blog/introducing-lumen-from-laravel)<br />
[Taylor on Lumen at Laracasts](https://laracasts.com/lessons/introducing-lumen)