---
layout: post
title: "Enums for JavaScript: Enumify"
date: 2016-01-18 11:08:51
description: "Enumify is a JavaScript library which provides enum functionality for ES6, inspired by Java's enums"
keywords: "javascript, es6, enum, enumify, libraty"
category: ES6
comments: true

tags:
- JavaScript
- ES6
- Library
- Enums
---

Everyone coming from Java, C# or a similar language knows what enums are.
For the others: Enums are a list of constants. Predefined values which do not represent any numeric or textual data.
As an example you could define available Colors in an enum, like Colors.RED, Colors.BLUE etc.

With the power of ES6 and the Open Source library [Enumify](https://github.com/rauschma/enumify) we can now use enums in JavaScript.

Some might say: "But there is already a possibility to use enums in JavaScript" and ofcourse you're right.
Native JavaScript enums look like this:

~~~javascript
    const Color = {
        RED: 0,
        BLUE: 1,
    }
~~~

But defining enums like this comes with a handful of problems. \\
**First of all**, if you log a value, you do not see it's name, only the number assigned. \\
**Secondly**, those values are not unique, you could mix them up with other values. \\
**Last but not least**, you cannot check if Color.RED or Color.BLUE is an instance of Color. 

You could play around with Symbol() and other verbose stuff to get a better way of handling those, but who cares if you have a simple library, right?

Let's try to use enums with enumify, you could simply include the library's js file, but i'm going to use npm to resolve the dependencies.

~~~bash
    $ npm install enumify
~~~

Now let's create our enum

~~~javascript
    import {Enum} from 'enumify'
    
    //Define a enum and make it extend "Enum"
    class Color extends Enum {}

    //Initialize the enum with your values
    Color.initEnum(['RED', 'BLUE']);
    
    //Test it out
    console.log(Color.RED); // Color.RED
    console.log(Color.BLUE instanceof Color); // true
    console.log(Color.enumValueOf('RED') === Color.RED); // true

    for (const color of Color.enumValues) {
        console.log(color);
    }
    // Color.RED
    // Color.BLUE
~~~

Handsome, right? \\
For more information, check out the GitHub Library [here](https://github.com/rauschma/enumify)

