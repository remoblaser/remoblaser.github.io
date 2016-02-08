---
layout: post
title: "Using JWT with Laravel - Part 1: The API"
date: 2016-01-22 10:19:18
description: "Showing off how to create a basic JWT auth with Laravel"
keywords: "jwt, json, web, token, laravel, authentication"
category: Laravel
comments: true

tags:
- JavaScript
- Laravel
---

"JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties." \\
*Quote from [self-issued.info](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)* 

\\
Basically a way to identify or authenticate a user between a API and a Fronted application with a encoded token.
Thus we can securely transmit information between two parties (ie. API and Frontend).

I'm not going too deep into the design and structure of a JWT, there are enough resources handling this question, [here's a good one](https://jwt.io/introduction/).

We're going straight to the main part: **How to use JWT with Laravel**.
Our goal in this first part is to build a simple API which handles a simple authentication form.
In the second Part we will set up a Frontend application consuming this API.

Afterwards you could do all sort of things with this basic setup.

# Part 1: The API

## Laravel setup

Luckily, there's a wonderful [composer package](https://github.com/tymondesigns/jwt-auth) from Sean Tymon, which basically does a lot of the sruff for us.
Let's go ahead and create a Laravel installation and include the package.

~~~bash
    $ composer create-project laravel/laravel
    $ composer require tymon/jwt-auth
~~~

Afterwards we include the package in our providers in *config/app.php*:

~~~php
    'providers' => [
        ...
        Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class,
    ],
~~~

And we register the facades in the same file:

~~~php
    'aliases' => [
        ...
        'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
        'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class,
    ]
~~~

Now we can publish the JWT configuration and generate a secret key with these simple artisan commands

~~~bash
    $ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
    $ php artisan jwt:generate
~~~

Done! We've successfully added JWT support to our Laravel installation.

Keep in mind to update the **app/jwt.php** configuration if you have custom settings (for example the User model at a different Namespace).
There's a good documentation about the options over at the [GitHub wiki](https://github.com/tymondesigns/jwt-auth/wiki/Configuration).

## Authentication API
Let's create a Basic Authentication Controller to handle incoming auth requests

~~~bash
    $ php artisan make:controller AuthController
~~~

And add some basic routes to our *app/Http/routes.php* file

~~~php
    Route::post('auth/login', 'AuthController@login');
~~~

Thats all we need for this tutorial.
The logout will happen on the client/frontend side, sine we can just destroy the token.
Now we can set up these Methods in our *AuthController*.

~~~php
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }
}
~~~

Alright, keep in mind to register the Middleware if you're going further than just a simple login.
Over at *app/Http/Kernel.php* add these two Middlewares.

~~~php
    protected $routeMiddleware = [
        ...
        'jwt.auth' => \Tymon\JWTAuth\Middleware\GetUserFromToken::class,
        'jwt.refresh' => \Tymon\JWTAuth\Middleware\RefreshToken::class,
    ];
~~~

Thats it. Have fun coding! Come back next week for the second part, where we will set up our Frontend.
