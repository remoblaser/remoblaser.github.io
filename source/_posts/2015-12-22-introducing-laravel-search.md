---
layout: post
title: "Introducing my easy to use Laravel search package"
date: 2015-12-22 09:20:45
description: "In this Blogpost i'm going to introduce to you my Laravel search package."
keywords: "laravel, search, remoblaser, package"
category: Laravel
comments: true

tags:
- Laravel
- Search
---

A while ago i've created a [Laravel search package](https://github.com/remoblaser/laravel-search) to easily search through your Eloquent Models / Database. I guess it's time to show it off here and explain to you, how it works.

## Install it
To install it, simply cd into your application and tell composer to add the package to your dependencies.

~~~bash
    $ composer require remoblaser/search
~~~

## Add it to Laravel

Now let's tell Laravel to use this package by adding it to your *providers* array in *"app/app.php"*.

~~~php
    'providers' => array(
        ...
        'Remoblaser\Search\SearchServiceProvider',
    ),
~~~

  \\
Additionally we want to register a Facade to easily access the functionality everywhere we want.
In *"app/config.php"* again, add the following line to your *aliases* array.

~~~php
    'aliases' => array(
        ...
        'Search' => 'Remoblaser\Search\Facades\Search'
    ),
~~~
  \\
Alright, got em! To finish off everything, run the *"php artisan vendor:publish"* command to create a search configuration for your app. In there, we define which Eloquent Models we would like to search through.

## Use it
Let's imagine we have a Simple User Model. Actually let's take the default Laravel User Model which looks like this:

| Column        | Type            | Additional  |
| ------------- |:---------------:| -----------:|
| name          | string          |             |
| email         | string          | unique      |
| password      | string          |             |

  \\
In a first step we're going to enable a search on the User's name.
First, tell the search to look in this specific Model.
In our published config file, add the Model and define a keyword for later use witht he Facade:

~~~php
    return array(
        'users' => 'App\User',
    );
~~~

  \\
Now let's tell our Model to implement the *SearchableTrait* which actually adds the functionality to search through the Model.
Additionally we can specify a array called *"searchFields"* where we define, which columns we want to search through.
In our example, we only want to search for the "names" of the User. You're however free to define as much columns as you want.

~~~php 
    <?php namespace App\User;

        use Remoblaser\Search\SearchableTrait;

        class User extends \Eloquent {
            use SearchableTrait;

            protected $searchFields = ['name'];
        }
~~~

  \\
Thats it! Now we can finally search through the Users table from everywhere we want.
Just use the *Search* facade, followed by the keyword we defined in our config.
Or search through all Tables by simply using *"Search::all()"*.
As a parameter, we use the word we would like to search.

~~~php  
    Search::users('john'); // Only search through the App\User table
    Search::all('john'); // Search through all the Tables defined in our config
~~~

  \\
Easy, right? 