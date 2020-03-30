---
layout:      post
title:       Why functional programming ?
banner_1_1:  /assets/img/posts/2017-06-25/why-functional-programming_1_1.jpg
banner_2_1:  /assets/img/posts/2017-06-25/why-functional-programming_2_1.jpg
banner_21_9: /assets/img/posts/2017-06-25/why-functional-programming_21_9.jpg
author:      loic
categories:  [coding]
tags:        [functional programming, software craft]
related:
    - {id: "/coding/2017/06/01/imperatif-vs-fonctionnel-fight", title: "Impératif vs Fonctionnel : Fight !", excerpt: "Salut ! Ca fait un moment que je n'ai plus écrit d'articles ici mais je compte bien m'y remettre avec pas mal de choses sur la programmation fonctionnelle et Scala"}
    - {id: "/coding/2015/09/01/eviter-toujours-plus-de-bugs-grace-au-typage", title: "Éviter toujours plus de bugs grâce au typage", excerpt: "Ceux qui me connaissent savent que je suis un grand fan des langages typés, de programmation fonctionnelle et de Scala. Pourquoi ?"}
---

Lately I discussed a lot about software engineering and advocated (as usual) for typed functional programming among other things. 
I noticed that I talked a lot about what and how but not so much about why, especially from a high level view. 
So this article is here to step back from our daily coding tasks and draw the big picture of software engineering as I see it; and for once, in english <i class="emoji winking-face"></i>

As a starting point, I would say that our industry is still pretty young and it evolved a lot over the years. 
From a very experimental field to a dominant one (which impacts everybody daily life and has created world biggest companies). 
So now we all agree that "software is eating the world" quoting the famous Marc Andreessen. And it's really not about to slow down...

![Software is eating the world](/assets/img/posts/2017-06-25/software-is-eating-the-world.jpg)

At some point, everything will rely on software (if it's not already the case), so we (developers) need to produce rock solid applications 
using state of the art knowledge to avoid dramatic failures. But not only, quality code is also essential to keep moving and innovating at high speed :

{% include embed-tweet.html id="763442655632224256" user="brianm" name="Brian McCallister" content="Current development speed is a function of past development quality." %}

Every developer and software company should be aware of this and take very seriously all theses aspects. And that's exactly what everybody is doing... right ?
Obviously no application looks like this today :

![Bad idea, I have no idea what I'm doing !](/assets/img/posts/2017-06-25/bad-idea.jpg)

Well, the reality is that we do our best to have useful working applications with a lot of constraints and we often end up with the "best" compromise we can,
often having some shitty code supporting an approximately working application. 
The result is that at some point of the application life, we always propose a full-rewrite as we cannot manage to implement any new change without tremendous effort. 
So we start over and create a very similar monster from scratch !

{% include embed-tweet.html id="654710109214371841" user="malk_zameth" name="Romeu Moura" content="If you remake awful software from scratch without changing the culture that created it : you'll remake awful software" %}

BTW, even if sometimes rewriting is the only way to move forward, we have to agree that it's a big failure as it screams that application went out of control
just like the Frankenstein's creature (but the fault is not only to the developers's, it's to the whole company).

![Human in a wheel](/assets/img/posts/2017-06-25/human-wheel.gif){:.pull-right}
Theses problems are so common in our everyday work that some people suggests to do a full rewrite every two years...
Or other people come to the joke "today bugs are tomorrow work".
To me, this is the symptom that we are not able to make and maintain working software on the (not so) long term, which is pretty sad.

As the current situation is well defined now, let's inspect the cause and draft some solutions.<br>
So, why these results ? Are we all bad developers ? I don't think so !<br>
I think things have evolved and what worked not so bad years ago starts to crack and urge us to find new way of building software. 
The actual number one task of a developer is managing the complexity of the application to not let it evolve in an horrible monster that nobody can/want control. 
Today, the number one answer I see is stacking developers and hoping it will work... 
Which will not, obviously, because complexity and maintenance costs grow exponentially while work done by adding more people evolves logarithmically <i class="emoji slightly-frowning-face"></i><br>
And contrary to what you may think, this problem is quite old as it was nicely highlighted by Dijkstra in... 1972 !<br>

<figure>
  <img src="/assets/img/posts/2017-06-25/dijkstra-quotes.jpg" alt="Dijkstra quotes">
  <figcaption>From <a href="http://ncrafts.io">NCrafts</a> <a href="https://www.slideshare.net/rhwy/newcrafts-2017-conference-opening">Opening words</a> by <a href="https://twitter.com/rhwy">@rhwy</a>. Thanks !</figcaption>
</figure>

Ok, since 1972 we had new tools, but is the software production process has improved ? 
Probably not so much as we are mainly iterating to fix bugs, dependency problems, build setup... 
As we don't need a 10% incremental improvement about today's standards but an order of magnitude one, 
we definitely need to learn new ways of coding which can handle and reduce the amount of complexity, or at least, do not increase it.

![How to write good code flow chart](/assets/img/posts/2017-06-25/good-code.png){:.pull-left}
There is no silver bullet and I don't have a definitive answer to every developer's problems 
but at least I see a number of things that are very promising that I started to study and implement. 
So, no surprise here if I start with **typed functional programming**, it was mind blowing to me as it allows to write very concise and expressive code. 
But it also enables real modularity (which was the false promise of Object Oriented). 
A good type system allows to speed up the feedback loop on what we do and with a good design it can encourage developers through his choices. 
But functional programming and types are not alone, they play very well with other concepts such as **Event Storming** and **Domain Driven Design**. 
Their purpose is to help understanding the business we are implementing in the application and translate it into working code. 
This is essential as it will drive design choices to keep it simple stupid ! 
For application architecture, we all know MVC but it doesn't help very much in fighting complexity. 
I discovered other really interesting architectures, such as 
**CQRS** to split and optimise read and write parts of an application, 
**Event Sourcing** to keep all the application history (essential to run business analyses afterwards), 
**hexagonal architecture** to keep business domain clean or 
**lambda architecture** to have real time for Big Data. 
When I looked at them I was hit but the overall coherence. They all play very well with each other. 
I can also add **living documentation** as good practice which encourage doing clear and simple things, 
**mob programming** to share knowledge in the team and, of course, the **software craftsmanship** movement which wants to raise the bar of our coding skills !

As a conclusion I would say that we have to learn, a lot, 
not only about new shinny frameworks but also and more importantly about how to design application to easily handle complexity and changes. 
So now the time has come to level up, learning how to do our job well and ride the digital revolution <i class="emoji winking-face"></i>

![Happy Homer Simpson](/assets/img/posts/2017-06-25/happy.jpg)

I hope you enjoyed this article. Tell me what you think about our industry, what problems you see and how you think we can overcome them. 
I would really be happy to debate about that.
