---
layout: post
title: "Javascript Promises explained"
date: 2015-12-28 10:24:05
description: "Ever wondered how promises in JavaScript work? Well, here's a easy explanation."
keywords: "javascript, promise, es6, js"
category: Frontend-shizzle
comments: true
tags:
- JavaScript

---

A JavaScript promise basically is a eventual result of an **asynchronous** action, such as a simple function.
It works similar like the synchronous try/catch approach.
A promise can either be:

- *- Pending (outcome has not been defined yet)*
- *- Fulfilled (Action has successfully completed, Promise has a value)*
- *- Rejected (Action failed, the promise will never be fulfilled!, Promise has a reason why it failed)*
  
\\
Promises are always asynchronous and a promise can never change it's state from fulfilled to rejected or vise-versa.
A pending promise can however transition into a fulfilled or a rejected promise.
The basic functionality of a promise are as simple as a promise we do in our everyday life:

- A: Can you ... ?
- B: Yes, i promise i will try to ... !
- A: Goes on (async)   *Promise state: pending*

- ... later on ...

- B: I've done ... here's ...   *Promise state: fulfilled*
- **OR**
- B: I couldn't do ... because ...   *Promise state: rejected*

- A: Continues on...


\\
For a longer explanation and more details, the Mozilla Developer Network delivers a [great article](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) about promises. I'd rather would like to show you a simple example now.

## Example

Alright, let's dig into it. As you've may already discovered, AJAX requests are a perfect case to use promises.
They're asynchronous, which means we can continue on while the request is pending and later on we can specifically take action if our request failed or succeeded.
Let's consume a simple API with JavaScript. I've used [JSONPlaceholder](http://jsonplaceholder.typicode.com/) to simply test out a promise.

\\
*View a [working example here](/examples/javascript-promise/) or check out the [source here](https://gist.github.com/remoblaser/15ba8ec41c10df996e0d)*

\\
First, let's grab the API-Root from the JSONPlaceholder API. I've directly added */posts/* since we're only going to get 1 Post in this example:
    
~~~javascript
    var apiRoot = 'http://jsonplaceholder.typicode.com/posts/';
~~~

Alright, now lets make our promise and put it in a simple function called *getPost*:

~~~javascript
    function getPost(id) {

        //Create a new Promise
        return new Promise(function(resolve, reject) {

            //Create a simple JS XMLHttpRequest
            var req = new XMLHttpRequest();
            req.open('GET', apiRoot + id);

            //Once we send out the Request...
            req.onload = function() {

                if (req.status == 200) {
                    //resolve the promise (promise will be fulfilled)
                    resolve(req.response);
                }
                else {
                    //Argh, we got some error. Let's reject the promise
                    reject(Error(req.statusText));
                }

            };

            //If we didn't get any response / we couldn't send out the request, we have a network error.
            //In this case, we will reject the promise aswell.
            req.onerror = function() {
                reject(Error("Network Error"));
            }; 

            //Send out the request
            req.send();
        });
    }
~~~

That's it! It's that simple! Now we can finally use our Promise:

~~~javascript
    getPost(1).then(function(response) {
        console.log("Success!", response)
    }, function(error) {
        console.error("Failed!", error);
    });
~~~

As you can see, we have the possibility to react if the AJAX Request was successful or not.
Additionally, everything is done asynchonous, which means, we could continue executing JS while our Promise is working.
In the [example](/examples/javascript-promise/) i've added a bit more to it, make sure to check it out!
