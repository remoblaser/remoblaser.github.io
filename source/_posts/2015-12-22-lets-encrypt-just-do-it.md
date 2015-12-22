---
layout: post
title: "Let's Encrypt: Just do it!"
date: 2015-12-22 15:10:49
description: "Let's Encrpyt gives you a easy way to use SSL on your Website for free, use it!"
keywords: "lets, encrypt, https, ssl, certificate, nginx"
category: Devs-managing-a-Server

tags:
- SSL
- Let's Encrypt
- Server
---

So, imagine there is a way to setup a FREE SSL Certificate in just 5 MINUTES. Awesome right? Well, this is not a dream anymore, anyone can do this now, so...

![](https://45.media.tumblr.com/409e7b0e659f46f3d4a190631f641e81/tumblr_npwq9fRJmt1tuall8o1_500.gif)

  \\
Your website will benefit from SSL / HTTPS in many ways, it's more secure, you get a better search ranking and it just looks a bit more professional.
So there is literally no reason not to use it.
Lets do it together, shall we?

##Let's Encrypt!
[Let's Encrypt](https://letsencrypt.org/) provides a easy shell script to do everything for you. It's actually hosted on [Github](https://github.com/letsencrypt/letsencrypt) so we can just clone the repository

    $ git clone https://github.com/letsencrypt/letsencrypt

  \\
Now, give Nginx / Apache a break until we're done
    
    $ service nginx stop
    $ service apache2 stop

  \\
Generate your certificate

    $ cd letsencrypt
    $ ./letsencrypt-auto certonly --standalone --email my@email.com -d foodomain.com

  \\
Tip: you can add multiple Domains with the -d parameter (for example: also add the www.foodomain.com Domain). Wildcard Domains are not possible with Let's Encrypt.

##3-2-1 SSL!
Now just configure your site to use the Certificate we've just created.
  
  \\
**Apache Users**
    
    LoadModule ssl_module modules/mod_ssl.so

    Listen 443
    <VirtualHost *:443>
        ServerName foodomain.com
        SSLEngine on
        SSLCertificateFile "/etc/letsencrypt/live/foodomain.com/fullchain.pem"
        SSLCertificateKeyFile "/etc/letsencrypt/live/foodomain.com/privkey.pem"
    </VirtualHost>

  \\
**NGINX Users**

    listen 443 ssl;  
    server_name foodomain.com; # Replace with your domain  
    ssl_certificate /etc/letsencrypt/live/foodomain.com/fullchain.pem;  
    ssl_certificate_key /etc/letsencrypt/live/foodomain.com/privkey.pem;  

  
  \\
Restart NGINX / Apache:

    $ service nginx start
    $ service apache2 start

  \\
Done! You're now successfully using SSL / HTTPS! For further Documentation, check out the [Let's Encrypt Github repository](https://github.com/letsencrypt/letsencrypt).

  \\
  \\
  \\
*PS: I'm not using it on my Blog because i'm lazy (or clever?) and using Github pages. Cheers!*