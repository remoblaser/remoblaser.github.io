---
layout: post
title: "The Power of grep"
date: 2016-01-01 19:32:35
description: "A powerful, easy and fast way to search through files: grep."
keywords: "grep, easy, how to, tutorial"
category: bashing
comments: true

tags:
- grep
- Bash
---

Every time i see a colleague searching for a specific keyword in various files, they open up the big search on their IDE or favourite Text-Editor.

But there is a way faster and more powerful way to do this, as you might suspected, i'm talking about grep.

grep is a command-line utility for Unix-like systems, there are also several Windows alternatives, like [PowerGREP](http://www.powergrep.com/grep.html).

To search for a given file in a file, the command looks like this

~~~bash
    $ grep <keyword> <file>
~~~

To search inside a directory, we just add the *-r* parameter.
For example, i want to search for the phrase "Hello World" inside all files in the current directory (and of course subdirectories)

~~~bash
    $ grep -r "Hello World" . 
~~~

Normally, i also add the *-n* parameter, to get the line number in the file of each result.
Another example: i want to find every *h1* tag inside all the *.html files inside my projects directory

~~~bash
    $ grep -r -n "<h1>" *.html
~~~

If you're familiar with Regular Expressions (i'm not really good with them), you could also supply a RegEx instead of a keyword.

A full manual about grep can be found on the [gnu.org](http://www.gnu.org/software/grep/manual/grep.html) site.

Closing out: grep is very powerful and fast, consider using it instead of the bloated search of your editor.


P.S.: Happy new year!