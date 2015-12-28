---
date: 2015-02-25 10:27:43+00:00
layout: post
title: "Wordpress redirect guess"
description: "Wordpress automatically guesses a page if a 404 Error occurs. Here's how it works."
keywords: "wordpress, redirect, php, guess"
category: Wordpress
tags:
- Wordpress
- PHP
---

While I was trying to create a simple 301 redirect to a Wordpress post, I noticed a somewhat strange behaviour. Without doing anything, Wordpress would redirect me to a post by just entering a "keyword" behind the URL. I've browsed a little bit and found out why and how to deactivate it.

This is due to the function called "**redirect_guess_404_permalink()**" which is called in the [wp-includes/canonical.php](https://core.trac.wordpress.org/browser/tags/4.0/src/wp-includes/canonical.php) file.

On **line 112**, Wordpress checks if a 404 occured, following the method call on line 139.    

As we can see, Wordpress searches for the **query variable** (the keyword) in every post name. It even checks if a Date query variable is set and searches for the posts published at this date! My first thought about this was: Awesome! But, some people might actually **not like it** and there is no option in Wordpress to **disable this functionality**.

Luckily, if you're able to read and write code, you're able to remove this without touching any of the Wordpress core files. There is a hook available which you could use in your Wordpress theme. Here's the **snippet to deactivate it**:

~~~php
    function disable_redirect_guess($status_header){
        global $wp_query;
    
        if(is_404())
            unset($wp_query->query_vars['name']);
    
        return $status_header;
    }
    
    add_filter( 'status_header', 'disable_redirect_guess' );
~~~
  \\
However, this is a bit of a hack since we just remove the query variables, so **be careful with this piece of code!**