---
layout: post
title: "Making friends with null: The Null Object Pattern"
date: 2015-12-29 11:32:25
description: "We always fight versus 'null', but instead, we could make it our friend with the Null Object Pattern."
keywords: "null, object, pattern, php, refactoring, clean code"
category: PrettyCoding
comments: true

tags:
- PHP
- Patterns

---

If i would count the amount of times I've checked against null, I would probably still be counting in a year.\\
If i would count the amount of times I forgot to check against null and my application returned an error, I could count forever.

There are some cases in our system, where we would like to apply a sort of functionality if it's available or not, if nothing is given.

The Null Value Object is a good way to remove unnecessary checks against null if we have such a behaviour in our App.\\
I'm going to show you a good example, taken from [Adam Wathan](http://twitter.com/adamwathan)'s [Laracon Talk: "Chasing Perfect"](https://www.youtube.com/watch?v=5DVDewOReoY).\\
If you've not already watched the talk, it's definitely worth it, so save the link to your bookmarks!

Let's imagine we have a simple Shop and some coupon codes, for example a ValueCoupon and a PercentCoupon. \\
The ValueCoupon simply gives us a fixed discount, while the PercentCoupon substracts a percentage of the total Price. \\
At some point, we substract the discount from the Order, maybe in our Order class:

~~~php
    namespace Foo\Bar;

    class Order 
    {
        //some stuff

        public function applyCoupon($coupon)
        {
            $this->coupon = $coupon;
        }

        public function totalWithoutDiscount()
        {
            //Some functionality to get the total of all Products in this Order
            return $this->products->sum('price');
        }

        public function total()
        {
            return $this->totalWithoutDiscount() - $this->discount();
        }

        private function discount()
        {
            if(! isset($this->coupon))
                return 0;
            return $coupon->discount($this);
        }

        //more stuff
    }
~~~

And our Coupon classes could look something like this:

~~~php
    namespace Foo\Bar;

    class PercentCoupon implements Coupon
    {
        //some stuff

        public function discount($order)
        {
            return $order->totalWithoutDiscount() * ($this->value / 100)
        }

        //more stuff
    }
~~~

~~~php
    namespace Foo\Bar;

    class ValueCoupon implements Coupon
    {
        //some stuff

        public function discount($order)
        {
            return $this->value;
        }

        //more stuff
    }
~~~

~~~php
    namespace Foo\Bar;

    interface Coupon
    {
        public function discount($order);
    }
~~~

Let's take a closer look at the **Order->discount()** method. \\
First we're checking if someone has applied a Coupon, if not we just return 0, since there is no Coupon applied.\\
But we could remove this little condition, making the Code look even prettier, by saying *"Hey, we basically always have a Coupon!"*.\\
This is where the Null Object Pattern comes into play.

We create a NullCoupon which has the same discount Method but simply returns 0, since it's not "really" a Coupon:

~~~php
    namespace Foo\Bar;

    class NullCoupon implements Coupon
    {
        public function discount($order)
        {
            return 0;
        }
    }
~~~

If we have even more Methods using a Coupon, we won't have to check our Order's coupon agains null ever again. \\
Additionally we do not have to fear for any Errors, because we tried accessing a non-present Coupon, again. \\
Instead we just have a NullCoupon, basically doing *nothing* to our Order's total price.

We can now remove the if clause and instantiate a NullCoupon in the constructor:

~~~php
    namespace Foo\Bar;

    class Order 
    {
        //some stuff

        public function __construct()
        {
            $this->coupon = new NullCoupon();
        }

        private function discount()
        {
            return $coupon->discount($this);
        }

        //more stuff
    }
~~~

And if we would like to implement a method, displaying the Coupon Value nicely to our user, we won't need to check against null again:

~~~php
    namespace Foo\Bar;

    class Order 
    {
        //some stuff

        public function displayCouponValue()
        {
            return $this->coupon->displayValue(); //no need for a if!
        }

        //more stuff
    }
~~~

Instead our NullDiscount just returns something like *No Coupon applied*.

There you go! Nice and clean!