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

    var code = `

        /* Oha! You catched me by surprise, gimme a second... */
        body {
            background-color: #22313f;
            color: rgba(0,0,0,0.8);
        }
        #code {
            background-color: #f7f8f9;
            position: absolute;
            height: auto;
            max-height: 600px;
            overflow: scroll;
            width: 800px;
            font-size: 13px; line-height: 1.4;
            -webkit-font-smoothing: subpixel-antialiased;
            padding-bottom: 100px;
            transition: all 1s ease;
        }


        /* Thats better.
        Alright, Hi! I'm Remo, a Web developer from Switzerland. 
        Currently i'm injecting Code into the DOM and a Pre tag at the same time.
        Cool right? Let me move to the center so i can see you... */
        #code {
            left: 50%;
            margin-left: -400px;
            border-radius: 3px;
        }


        /* Alright, i should probably watch my language and talk nicely to you... */
        #code {
            font-family: Roboto;
        }
        

        /* Roboto!Just like a roboter! Haha! Get it? Nevermind... COLORS! */
        #code em:not(.comment) { font-style: normal; }
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


        /* Ok... i just got a crazy idea, what if we could inject JavaScript as well? 
        Let me try to give you... */
        ~\`
            var $img = document.createElement('img');
            $img.src = 'http://pngimg.com/upload/cat_PNG1631.png';
            var $body = document.getElementsByTagName('body')[0];
            $body.appendChild($img);
        ~\`


        /* HAHA! A cat! Who doesn't love cats? 

           What do you mean you're more of a "dog" type?
           Are you serious?
           You should leave now...





           There's nothing more to come, i promise...













           You're still here?
           Alright then, let me be serious for a moment
           */
           ~\`
                $img.src = 'http://blog.remoblaser.ch/images/author.jpg';
                $img.width = 200;
           ~\`

           /* This, is me, well, more or less.
           Let me give you some information about me */

           ~\`
                $title = document.createElement('h1');
                $title.innerHTML = "Remo Blaser"
                
                $twitter = document.createElement('a');
                $twitter.innerHTML = 'You can follow me here';
                $twitter.href = 'http://twitter.com/remoblaser';

                $blog = document.createElement('a');
                $blog.innerHTML = 'And read my stuff over here';
                $blog.href = 'http://blog.remoblaser.ch';
                $body.appendChild($title);
                $body.appendChild($twitter);
                $body.appendChild($blog);
            ~\`

        `;

    var $body = document.getElementsByTagName('body')[0];
    $body.appendChild(createElement('style', 'styles'));
    $body.appendChild(createElement('div', 'scripts'));
    $body.appendChild(createElement('pre', 'code'));

    var $styles = $('#styles');
    var $scripts = $('#scripts');
    var $code = $('#code');

    var openComment = false;
    var openInteger = false;
    var openString = false;

    var prevAsterisk = false;
    var prevSlash = false;

    var isJs = false;
    var codeBlock = '';

    function $(el)
    {
        return document.querySelector(el);
    }

    function createElement(tag, id) {
        var el = document.createElement(tag);
        if (id) {
            el.id = id;
        }
        return el;
    };
    

    function scriptSyntax(string, c) 
    {
        if (openInteger && !c.match(/[0-9\.]/) && !openString && !openComment) {
            return string.replace(/([0-9\.]*)$/, '<em class="int">$1</em>' + c);
        } else if (c === '*' && !openComment && prevSlash) {
            openComment = true;
            return string + c;
        } else if (c === '/' && openComment && prevAsterisk) {
            openComment = false;
            return string.replace(/(\/[^(\/)]*\*)$/, '<em class="comment">$1/</em>');
        } else if (c === 'r' && !openComment && string.match(/[\n ]va$/)) {
            return string.replace(/va$/, '<em class="var">var</em>');
        } else if (c.match(/[\!\=\-\?]$/) && !openString && !openComment) {
            return string + '<em class="operator">' + c + '</em>';
        } else if (c === '(' && !openString && !openComment) {
            return string.replace(/(\.)?(?:([^\.\n]*))$/, '$1<em class="method">$2</em>(');
        } else if (c === '"' && !openComment) {
            return openString ? string.replace(/(\"[^"\\]*(?:\\.[^"\\]*)*)$/, '<em class="string">$1"</em>') : string + c;
        } else if (c === '~' && !openComment) {
            return string ;
        } 
        return string + c;
    }

    function preformat(string, c)
    {
        if (openInteger && !c.match(/[0-9\.\%pxems]/) && !openString && !openComment) {
           return string.replace(/([0-9\.\%pxems]*)$/, '<em class="int">$1</em>');
        } 
        return string;
        
    }

    function styleSyntax(string, c) 
    {
        var preformattedString = preformat(string, c);
        if (c === '*' && !openComment && prevSlash) {
            openComment = true;
            return preformattedString + c;
        } else if (c === '/' && openComment && prevAsterisk) {
            openComment = false;
            return preformattedString.replace(/(\/[^(\/)]*\*)$/, '<em class="comment">$1/</em>');
        } else if (c === ':') {
            return preformattedString.replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
        } else if (c === ';') {
            var intRegex = /((#[0-9a-zA-Z]{6})|#(([0-9a-zA-Z]|\<em class\=\"int\"\>|\<\/em\>){12,14}|([0-9a-zA-Z]|\<em class\=\"int\"\>|\<\/em\>){8,10}))$/;
            if (preformattedString.match(intRegex)) {
                return preformattedString.replace(intRegex, '<em class="hex">$1</em>;');
            } else {
                return preformattedString.replace(/([^:]*)$/, '<em class="value">$1</em>;');
            }
        } else if (c === '{') {
            return preformattedString.replace(/(.*)$/, '<em class="selector">$1</em>{');
        }

        return preformattedString + c;
    }

    function writeChar(c) {
        if (c === '`') {
            c = '';
            isJs = !isJs;
        }
        if (isJs) {
            if (c === '~' && !openComment) {
                var $actualScripts = createElement('script');
                if (codeBlock.match(/(?:\*\/([^\~]*))$/)) {
                    $actualScripts.innerHTML = codeBlock.match(/(?:\*\/([^\~]*))$/)[0].replace('*/', '') + '\n\n';
                } else {
                    $actualScripts.innerHTML = codeBlock.match(/([^~]*)$/)[0] + '\n\n';
                }
                $scripts.innerHTML = '';
                $scripts.appendChild($actualScripts);
            } 
            var codeToAdd = scriptSyntax($code.innerHTML, c);
        } else {
            tmp = c === '~' ? '' : c;
            $styles.innerHTML += tmp;
            var codeToAdd = styleSyntax($code.innerHTML, tmp);
        }
        prevAsterisk = c === '*';
        prevSlash = c === '/' && !openComment;
        openInteger = c.match(/[0-9]/) || openInteger && c.match(/[\.\%pxems]/) ? true : false;
        if (c === '"') {
            openString = !openString;
        }
        codeBlock += c;
        return $code.innerHTML = codeToAdd;
    };

    function writeCode(message, index, interval) {
        if (index < message.length) {
            $code.scrollTop = $code.scrollHeight;
            writeChar(message[index++]);
            return setTimeout(function () {
                return writeCode(message, index, interval);
            }, interval);
        }
    };


    writeCode(code, 0, 0);
}.call(this));


    
</script>
</body>
</html>



