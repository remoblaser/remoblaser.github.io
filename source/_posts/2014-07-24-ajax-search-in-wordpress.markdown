---
date: 2014-07-24 06:24:58+00:00
layout: post
title: "AJAX search in Wordpress"
description: "Creating a AJAX search in Wordpress is easy! Really!"
keywords: "wordpress, ajax, search, jquery"
category: Frontend-shizzle
comments: true
id: 1

tags:
- AJAX
- Wordpress
---

Some time ago i was experimenting and trying to create a OSX-Spotlight like search function with HTML and Wordpress.
To do this, i need a AJAX call to the backend. Luckily this is easily supported by Wordpress!

## Activate AJAX in Wordpress
First of all we need to hook into the template_redirect function and activate a AJAX call for a specific path:
    
~~~php
    add_action('template_redirect', 'enable_ajax_requests');
    
    function enable_ajax_requests() {
        wp_localize_script('function', 
            'ajaxsearch', array(
              'ajaxurl' => admin_url('admin-ajax.php')
            )
        );
    }
~~~

  \\
Afterwards we register our function:

~~~php
    add_action('wp_ajax_getSearchResults', 'getSearchResults');
~~~

 \\
If you would like to restrict the method for logged in users only, use this:

~~~php    
    add_action('wp_ajax_nopriv_getSearchResults', 'getSearchResults');
~~~


## Create your method
Now we can create our function. I recommend writing those in a different file and require it in functions.php.

~~~php
    function getSearchResults() {
         //stuff
         echo json_encode($searchresult);
         die();
    }
~~~
    
## On to JavaScript
Now we can just call the method with JavaScript, i've done this with jQuery, which looks like this:

~~~javascript
     jQuery.ajax({
        url: 'http://mywebsite.com/wp/wp-admin/admin-ajax.php',
        data: ({action : 'getSearchResults'}),
        success: function(message) {
            var data = JSON.parse(message);
        }
    });
~~~