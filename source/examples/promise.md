---
layout: page
title: "Javascript Promise example"
description: "Asimple HTTP Request example for Javascript promises"
permalink: "examples/javascript-promise/"
github: https://gist.github.com/remoblaser/15ba8ec41c10df996e0d
---

Simple example of a promise in JavaScript. See ["Javascript Promises explained"](/frontend-shizzle/2015/javascript-promises/)

<label for="amount">Post id:</label>
<input type="text" id="postId" value="1">
<button id="fetchPosts">Fetch post</button>

<div id="ajax-posts">

</div>

<script type="text/javascript">

var apiRoot = 'http://jsonplaceholder.typicode.com/posts/';
var posts = $('#ajax-posts');


$('#fetchPosts').addEventListener("click", function() {
    var postId = $('#postId')[0].value;

    getPost(postId).then(function(response) {
        data = JSON.parse(response);
        addPost(data.id, data.title, data.body);
    }, function(error) {
        console.error("Failed!", error);
    });
});

function $(selector)
{
    return document.querySelector(selector);
}

function addPost(id, title, body)
{
    var post = document.createElement('div');
    post.className = 'ajax-post';

    var titleEl = document.createElement('h2');
    var bodyEl = document.createElement('p');

    titleEl.innerHTML = '#' + id + ': ' + title;
    bodyEl.innerHTML = body;

    post.appendChild(titleEl);
    post.appendChild(bodyEl);
    posts.appendChild(post);
}

function getPost(id) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', apiRoot + id);

        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(Error("Network Error"));
        };

        req.send();
    });
}



</script>


