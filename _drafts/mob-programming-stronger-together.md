---
layout:      post
locale:      en_US
icon:        group
title:       Mob programming, stronger together
banner_1_1:  /assets/posts/drafts/mob-programming/mob-programming-stronger-together_1_1.jpg
banner_2_1:  /assets/posts/drafts/mob-programming/mob-programming-stronger-together_2_1.jpg
banner_21_9: /assets/posts/drafts/mob-programming/mob-programming-stronger-together_21_9.jpg
banner_3_1:  /assets/posts/drafts/mob-programming/mob-programming-stronger-together_3_1.jpg
author:      loic
categories:  [tech]
tags:        [mob programming, team process]
---

Have you heard about [mob programming](https://en.wikipedia.org/wiki/Mob_programming){:target="_blank"}?
It's a software engineering practice that gained some popularity over the last years but is still unknown or weird for many people.

But let's start at the beginning, what is **mob programming**?

{% include tweet-quote.html quote="In mob programming, the whole team works on the same thing, at the same time at the same computer" %}

Seems strange? Yes it is. Now you may have some interrogations or objections. Let's answer some questions.

## Why would I do mob programming ?

I already talked about mob programming in my [Process for high performing teams]({% post_url 2020/2020-04-20-process-for-high-performing-teams %}#mob-programming) article.
Having everyone together is an extraordinary opportunity for knowledge sharing, team building and, above all, critical thinking.
This technique may answer multiple goals and could be adapted to them :

- **Learning together** : learning can be hard and not fun, so doing it in group can ease it a lot and accelerate it. You can use it in your coding dojos for example.
- **Solving hard problems** : when you are stuck on a problem (fixing a bug, writing an algorithm, designing an architecture...) it can help to have an other point of view. But what about many others ?
- **Sharing practices** : code consistency is key to reduce complexity, so coding as a team will encourage people to adopt common practices.
- **Increase quality** : thinking with more people increase the group output, so less freeze, less dead end, less refactorings and fewer bugs

## Is it really efficient ?

This is the most frequent objection people make about mob programming. And my opinion is: there is **no obvious answer**.

It depends on the limiting speed factor for the team.

If everybody knows exactly what to do and how to do it, the limiting factor can be the typing speed but I think it's very rare.
Most of the time, developers have to find the parts of the codebase they have to change, understand them, write the code and test it.
But many obstacle may appear: not knowing well the codebase, the libraries or the language, writing code can be very difficult and even testing can be challenging.
Coding is essentially understanding the software complexity you are working in and managing it. It's a very conceptual work, far away from monkey typing.
In this context, diverse experiences and minds may help a lot, not only producing a working result but also a more correct one which can last longer.

![Mob programming productivity chart](/assets/posts/drafts/mob-programming/mob-programming-productivity.png)

To answer the question :

{% include tweet-quote.html quote="the more complex the system is, the more efficient the mob programming can be" %}

## Is it hard ?

Yes.

At least at the beginning. Developers are not used to it. Coding in front of other can be very intimidating for many of them.
The team has to get used to it and find its own working way. Having a well working mob can take some time.

## What are the rules ?

There is no required rules, every team have to find its way. But some guidelines may help :

- **empathy** **kindness**
- **driver**, **navigator**, **observers**


## What does it bring ?
## How to convince my team ?
## How to start at mob programming ?
## Is it limited to code ?

I didn't experience it myself but many teams where doing everything in mob: answering support questions, fixing bugs or even writing emails ^^
As said earlier, there is not a single way of doing it, each team should experiment and find what works best for it.
Some teams also include non-coders people in their mob such as product owners, designers, support people... This increase cross-team understanding and collaboration.

## Could we do it remotely ?

Yes ! There is no real limitations as long as you can communicate easily and only one person write the code. So video conf plus *driver* screen sharing is enough.
You can find more details on [remotemobprogramming.org](https://www.remotemobprogramming.org){:target="_blank"}.


If you like this article and think **mob programming should be tried more**, spread the world and encourage people around you :

{% include tweet-quote.html quote="Mob programming seems awesome, let's have a try!" %}

Continue with more resources :

- [Talk] [Technical Leadership for Empowered Teams](http://videos.ncrafts.io/video/339930423){:target="_blank"} at [NewCrafts Paris 2019](http://ncrafts.io){:target="_blank"} by [Emily Bache](https://twitter.com/emilybache){:target="_blank"}
- [Mob Testing: An Introduction & Experience Report](https://www.ministryoftesting.com/dojo/lessons/mob-testing-an-introduction-experience-report){:target="_blank"}
