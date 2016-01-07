---
layout: post
title: "Laravel Multi-language Models / Database"
date: 2016-01-07 08:58:16
description: "A proof of concept on how to accomplish multilanguage Databases and Models in Laravel"
keywords: "laravel, multilanguage, database, models, eloquent"
category: Laravel
comments: true

tags:
- Laravel
- Database
- Multi-language
---

Recently i had the opportunity to finally build up a Laravel project with multiple languages.\\
I've looked up multiple resources to have a look for the current "best practice" in this area.\\
I stumbled on a lot of good ideas and i'd like to show you today, how i did it.

# The Problem
The full App needs to be multilanguage, texts, buttons etc.\\
For the static stuff i'm blessed with the wonderful functionality [Laravel](https://laravel.com) provides.\\
I can just use the built in [localization](https://laravel.com/docs/master/localization) feature.

For the stuff stored inside the Database however, i need a little concept.\\
I need to be able, to add any Language at any given time.\\
This means, our Database design and our application needs some sort of functionality to add new languages and set up everything properly.


# The Concept
A multilanguage Database design really depends on your needs and favours.
I like the approach of creating a seperate table for the translations of a relation.
Usually i give these tables the same name as the reference table and suffix them with *_translations*.

Let's say we have a Blog application and our posts need to be avaialable in multiple languages.
This would be my approach to handle it


### Table posts

| Column        | Type            | Additional    |
| ------------- |:---------------:| -----------:  |
| id            | integer         | index, unique |
| published     | integer         |               |


<br />

### Table post_translations

| Column        | Type            | Additional    |
| ------------- |:---------------:| -----------:  |
| id            | integer         | index, unique |
| language      | string          |               |
| title         | string          |               |
| content       | text            |               |
| post_id       | integer         | foreign       |


## How do i want to use it?
After that pretty simple Database setup i asked myself: "How would i like to use it?"\\
I like planning my application like this, it enforces me to write all my code and APIs way simpler.\\
I go ahead, create a simple example and write down the function calls, even though they do not exist yet.\\

For this example i sat down and just wrote the process of creating, reading, updating and deleting a entry.

~~~php
    //Creating/Deleting a post and all translations should happen automatically once i create/delete a post

    //Read the title in the currently set language
    $post->translation()->title;

    //Read the title in the language "de"
    $post->translation('de')->title;

    //Update a post
    $post->translation()->update([]);
~~~

Pretty straightforward right? Ofcourse we immediately see how we set up our Eloquent model by just defining a basic relationship inside our *Post* model.

With these basic ideas, let's go ahead and build it.

<br />

# Let's do it!

## Database and Migrations
First of all i create the migrations and models for our Laravel application.\\
Luckily we're all artisans and we only need to run one command:

~~~bash
    $ php artisan make:model Post -m
    Model created successfully.
    Created Migration: 2016_01_07_090802_create_posts_table

    $ php artisan make:model PostTranslation -m
    Model created successfully.
    Created Migration: 2016_01_07_091025_create_post_translations_table
~~~

Now let's set up our Database


*file: database/migrations/2016_01_07_090802_create_posts_table.php*

~~~php
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class CreatePostsTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('posts', function (Blueprint $table) {
                $table->increments('id');

                $table->integer('published')->default(0);

                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::drop('posts');
        }
    }
~~~


*file: database/migrations/2016_01_07_091025_create_post_translations_table.php*

~~~php
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class CreatePostTranslationsTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('post_translations', function (Blueprint $table) {
                $table->increments('id');

                $table->string('language');

                $table->string('title')->default('');
                $table->text('content')->default('');

                $table->integer('post_id');
                $table->foreign('post_id')
                        ->references('id')
                        ->on('posts')
                        ->onDelete('cascade');

                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::drop('post_translations');
        }
    }
~~~

Alright, thats it for the Database (isn't Laravel awesome?).\\
Let's go ahead and migrate it. 

*Note: Creating a Database and configure Laravel is not part of this tutorial.*

~~~bash
    $ php artisan migrate
    Migrated: 2016_01_07_090802_create_posts_table
    Migrated: 2016_01_07_091025_create_post_translations_table
~~~

## Configure our App

Now, let's get to our models. As we said, we would like to create all translation entries once we create a post.\\
For this, i've created a simple config file in which we specify, which languages are supported in our Application.

You could also put this in a Database table and let Admins of your Application create and delete certain Languages.

*file: config/languages.php*

~~~php
    return [
        'supported' => [
            'en',
            'de',
        ]
    ];
~~~

## Set up Eloquent Models

We've already created our Eloquent models, we just need to provide them with some functionality now.\\
Let's set up our *PostTranslation* model first.\\
Everything is pretty normal here, we add our *$fillable* array to define, which values can be filled when supplying a array of data.\\
Afterwards we define the inverse of our relationship with the *posts* table.
 
*file: app/PostTranslation.php*

~~~php
    namespace App;

    use Illuminate\Database\Eloquent\Model;

    class PostTranslation extends Model
    {
        protected $fillable = ['language', 'title', 'content', 'post_id'];

        public function post()
        {
            return $this->belongsTo('App\Post');
        }
    }
~~~

Our *Post* model is a little bit different.\\
Remember our desired function *$post->translation()*?\\
If we supply no argument, we would like to get the current chosen language.\\
Otherwise take the language we supplied.

Well, luckily we can define a relationship with a *where* clause in Laravel (FU**YEAH LARAVEL!).
Everything else is pretty basic Eloquent stuff again.

*file app/Post.php*

~~~php 
    namespace App;

    use Illuminate\Support\Facades\App;
    use Illuminate\Database\Eloquent\Model;

    class Post extends Model
    {
        protected $fillable = ['published'];

        public function event()
        {
            return $this->belongsTo('ECMS\Models\Event');
        }
        public function translation($language = null)
        {
            if ($language == null) {
                $language = App::getLocale();
            }
            return $this->hasMany('App\PostTranslation')->where('language', '=', $language);
        }
    }
~~~

Easy, right? Now we just need to add some sort of functionality to create all the *PostTranslation* entries once we create a Post.

I've created a simple PHP Trait which i can just include in every Model with a relevant Translations table.
The *static::saved* function is "kind of a Event", which get's triggered once we save a model (ASDFBWF LARAVEL!!). \\
We can just add our piece of Code, to execute once a Model is saved, this perfectly plays in our hands.

*file app\Support\Translateable.php*

~~~php
    namespace App\Support;
    use Illuminate\Support\Facades\Config;
    trait Translateable
    {
        protected static function boot()
        {
            parent::boot();

            static::saved(function($model){

                //Let's get our supported configurations from the config file we've created
                $languages = Config::get('languages.supported');
                foreach ($languages as $language) 
                {
                    $model->translation()->create(['language' => $language]);
                }
            });
        }
    }
~~~

Now just use this trait in our *Post* Model and we're done!

*file app/Post.php*

~~~php 
    namespace App;

    use Illuminate\Support\Facades\App;
    use Illuminate\Database\Eloquent\Model;
    use App\Support\Translateable;

    class Post extends Model
    {
        use Translateable;

        protected $fillable = ['published'];
        
        public function event()
        {
            return $this->belongsTo('ECMS\Models\Event');
        }
        public function translation($language = null)
        {
            if ($language == null) {
                $language = App::getLocale();
            }
            return $this->hasMany('App\PostTranslation')->where('language', '=', $language);
        }
    }
~~~

Unfortunately, our desired way of using translations does not work exactly like we wanted. \\
Since we have a 1-m relation between our *posts* and *post_translations* table, we always get a collection of translations, everytime we call *$post->translation()*. \\
This means, we need to change our Code a little bit and add the *first()* method.

~~~php
    //Read the title in the currently set language
    $post->translation()->first()->title;

    //Read the title in the language "de"
    $post->translation('de')->first()->title;

    //Update a post
    $post->translation()->first()->update([]);
~~~

I did not yet have the time or idea for a way to bypass the *first()* method. \\
If someone has a idea, please let me know in the comments.

Now go ahead and build your awesome, multilanguage Application!

If something isn't working or if you have further questions, leave a comment and i will happily reply.


