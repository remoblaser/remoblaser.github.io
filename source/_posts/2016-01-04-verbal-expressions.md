---
layout: post
title: "Verbal expressions: RegEx made easy"
permalink: verbal-expressions
date: 2016-01-04 08:55:31
description: "Verbal expressions, a easy way to construct regular expressions"
keywords: "verbal, expressions, regex, regular, expression"
category: PrettyCoding

tags:
- Verbal Expressions
- RegEx

---

In my previous post i confessed the fact, i'm really bad with regular expressions.
During the weekend a tweet popped up with a link to [this beautiful library called "VerbalExpressions"](https://github.com/VerbalExpressions/JSVerbalExpressions).

VerbalExpressions helps you to build up your regular expressions, by simply chaining methods to create lines which basically do what they read.
Behind the scenes, VerbalExpressions just creates a simple RegEx which we then use to validate a given string.

Here's a example taken from their GitHub page. We validate a string to test, if we have a valid URL.
VerbalExpressions is ported in a few languages so far, you can find a full list on their [GitHub page](http://verbalexpressions.github.io/). 
I've taken the JavaScript approach for this example.

~~~JavaScript
    // Create an example of how to test for correctly formed URLs
    var validator = VerEx()
                .startOfLine()
                .then( "http" )
                .maybe( "s" )
                .then( "://" )
                .maybe( "www." )
                .anythingBut( " " )
                .endOfLine();

    // Give a simple URL to validate
    var url = "http://blog.remoblaser.ch";

    // Use RegExp object's native test() function, since VerEx returns a RegEx
    if( validator.test(url)) {
        alert( "We have a correct URL ");
    }
    else {
        alert( "The URL is incorrect" );
    }

    console.log( tester ); // Outputs the constructed RegEx: /^(http)(s)?(\:\/\/)(www\.)?([^\ ]*)$/
~~~

Stuff like replacing strings is made even simpler:

~~~JavaScript
    // Create a string
    var replaceMe = "I really should learn regular expressions";

    // Create an expression that seeks for word "regular"
    var expression = VerEx().find("regular");

    // Execute the expression like a normal RegExp object
    var result = expression.replace( replaceMe, "verbal" );

    alert( result ); // Outputs "I really should learn verbal expressions"
~~~

There you go! No need for those silly RegEx codes (even though i really should have a look at them).