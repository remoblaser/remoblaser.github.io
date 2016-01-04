---
date: 2015-02-25 10:27:43+00:00
layout: post
title: "Native HTML Dropdown autocompletion"
description: "HTML natively supports autocompletion for Dropdowns!"
keywords: "html, dropdown, autocomplete, datalist"
category: Frontend-shizzle
comments: true
id: 3

tags:
- HTML
- CSS
---

HTML Dropdowns are pretty neat, right? But have you ever tried expanding them to have autocompletion? It's frustrating and ends up with a lot of JavaScript Code.
But there is actually a way easier way! HTML natively supports autocompletion for Dropdowns!

With the HTML tag <**datalist**> you're able to create a dropdown, which supports **autocompletion**! That's right, **no JavaScript!**

First of all, you need to define a **input field** which will serve as the holder for the Values and also represents the dropdown.
Afterwards use the datalist tag just like a normal **select** tag, give it a ID and point the input field on it.

~~~ html
    <input list="names" />

    <datalist id="names">
       <option>Tom</option>
       <option>Hans</option>
       <option>Marco</option>
       <option>Angela</option>
       <option>Joel</option>
    </datalist>
~~~ 
  \\
And this is how it looks in the browser:



<input list="names" />

<datalist id="names">
   <option>Tom</option>
   <option>Hans</option>
   <option>Marco</option>
   <option>Angela</option>
   <option>Joel</option>
</datalist>  



Awesome right? But **be careful**, not every browser supports this feature, make sure to check out [caniuse.com](http://caniuse.com/#search=datalist) to see, which browser supports this feature.

