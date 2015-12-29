---
permalink: "examples/fun/"
---

<html>
<head>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
</head>
<body>
<script type="text/javascript">
    (function () {
    var body = document.getElementsByTagName('body')[0];

    function $(el)
    {
        return document.getElementById(el);
    }
    function createElement(tag, id)
    {
        var el = document.createElement(tag);

        if(id)
        {
            el.id = id;
        }
        return el
    }
    var preTag = createElement('pre', 'text');
    var styleTag = createElement('style', 'styles');
    var scriptTag = createElement('script', 'scripts');
    var openComment = false;
    var openJs = false;
    body.appendChild(preTag);
    body.appendChild(styleTag);
    body.appendChild(scriptTag);

     function writeStyleChar(c) {
        if(c === '$' && openJs === false) {
            openJs = true;
            scriptTag.innerHTML = 'console.log()'; 
        } else if(c === '$' && openJs) {
            openJs = false;
        } else if (c === '/' && openComment === false) {
            openComment = true;
            styles = preTag.innerHTML + c;
        } else if (c === '/' && openComment === true) {
            openComment = false;
            styles = preTag.innerHTML.replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
        } else if (c === ':') {
            styles = preTag.innerHTML.replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
        } else if (c === ';') {
            styles = preTag.innerHTML.replace(/([^:]*)$/, '<em class="value">$1</em>;');
        } else if (c === '{') {
            styles = preTag.innerHTML.replace(/(.*)$/, '<em class="selector">$1</em>{');
        } else {
            styles = preTag.innerHTML + c;
        }
        preTag.innerHTML = styles;
        return styleTag.innerHTML = styleTag.innerHTML + c;
    }


     function writeStyles(message, index) {
        if (index < message.length) {
            body.scrollTop = body.scrollHeight;
            writeStyleChar(message[index++]);
            return setTimeout(function () {
                return writeStyles(message, index, 40);
            }, 40);
        }
    }






    writeStyles(
        `
        /* Oha! You catched me by surprise, gimme a second... */                    \n\n
        body {
            background-color: #22313f;     \t
            color: rgba(0,0,0,0.8);     \t
        }          \t

        pre {
            background-color: #f7f8f9;     \t
            position: absolute;     \t
            width: 800px;     \t
            font-size: 13px; line-height: 1.4;     \t
            -webkit-font-smoothing: subpixel-antialiased;     \t
            transition: all 1s ease;     \t
        }

        /* Thats better.
        Alright, Hi! I'm Remo, a Web developer from Switzerland.     \t
        Currently i'm injecting CSS into the DOM and a Pre tag at the same time.     \t
        Cool right? Let me move to the center so i can see you... */               \n\n
        pre {
            left: 50%;     \t
            margin-left: -400px;     \t
            border-radius: 3px;      \t
        }

        /* Alright, i should probably watch my language and talk nicely to you... */          \n\n
        pre {     \t
            font-family: Roboto;     \t
        }     \t
        

        /* Roboto! Just like a roboter! Haha! Get it? Nevermind...          \n
           Let's format this Code a bit shall we?*/          \n\n

        pre em:not(.comment) { font-style: normal; }

        .comment       { color: #75715e; }
        .selector      { color: navy; }
        .selector .key { color: teal; }
        .selector .int { color: #a6da27; }
        .key           { color: teal; }
        .int           { color: #fd971c; }
        .hex           { color: #f92772; }
        .hex .int      { color: #f92772; }
        .value         { color: #d01040; }
        .var           { color: #66d9e0; }
        .operator      { color: #f92772; }
        .string        { color: #d2cc70; }
        .method        { color: #f9245c; }
        .run-command   { color: #ae81ff; }

        `
        , 0);




}.call(this));


    
</script>
</body>
</html>

