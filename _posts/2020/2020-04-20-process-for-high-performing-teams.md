---
layout:      post
locale:      en_US
icon:        chart-increasing
title:       Process for high performing teams
banner_1_1:  /assets/posts/2020/process-for-high-performing-teams/banner_1_1.jpg
banner_2_1:  /assets/posts/2020/process-for-high-performing-teams/banner_2_1.jpg
banner_21_9: /assets/posts/2020/process-for-high-performing-teams/banner_21_9.jpg
banner_3_1:  /assets/posts/2020/process-for-high-performing-teams/banner_3_1.jpg
author:      loic
categories:  [tech, management]
tags:        [team process, continuous improvement, mob programming, coding dojo]
excerpt:     Every company want a high performing team. But, hiring good developers is not enough. Do you have the right process in place for this? Here are some ideas of what you can do to keep improving.
---

High performing tech team is probably the dream of any tech manager, PO or even startup.
Many people are talking about it but very few have seen it, including me.
And, at the risk of disappointing you, I don't have any magical recipe to get there.
From what I have seen, heard or read, no company was able to get there by easily following a planned path.
They all improved day after day into their own specific path.
But what I know is that continuous improvement is the only way into it.

If we look closer, you can see that continuous improvement and short feedback loop are at the heart of many movements and practices:
Agile, Software craftsmanship or even Lean startup.
Train, try, fail & improve are the basic principles of performance improvement, whatever the level is. But not much appreciated in corporate world from what I saw.

In this article I will list some practices a tech team can do and should take the time to do to improve week after week.
It takes time and energy but the key idea is learning and sharing knowledge all together so people can align themselves and share a common culture and understanding.

![Travel illustration](/assets/posts/2020/process-for-high-performing-teams/travel.jpg){:.pull-right}
- [Watching talks](#watching-talks)
- [Internal talks](#internal-talks)
- [Coding katas](#coding-katas)
- [Mob programming](#mob-programming)
- [Bug fix demo](#bug-fix-demo)
- [Technical backlog](#technical-backlog)
- [Public speaking open bar](#public-speaking-open-bar)
- [Final thoughts](#final-thoughts)

## Watching talks<a href="#watching-talks" class="fas fa-link"></a>

Talks are a great way to discover new things or get a general knowledge about some subjects.
They are small pieces of content (20-50min often) packed to give the audience a good grasp of the subject in a friendly way.
I use them to widen my general culture and discover new tech topics but also design, management, product, recruitment or anything else.
Doing it as a team builds a common culture and allows people to share the same experience and discuss about it afterwards.

I have tried it at many companies (Zeenea, Criteo, Sidexa, Amundi or Nexeo) during lunch time, once a week.
It is really easy to get started and people liked it but it was not easy to keep it over time.
You can use it to start and then move to other initiatives afterwards.

If you don't know where to find talks, here is a list of [conference videos](https://gospeak.io/events?video=true){:target="_blank"},
you can take a look at my [personal playlist](https://www.youtube.com/playlist?list=PLYzV_9wrNOVqE7CWHKe8Fyv5rn10LN3QI){:target="_blank"}
or even better invite a speaker at your company thanks to [Brown Bag Lunch](http://www.brownbaglunch.fr){:target="_blank"}.

## Internal talks<a href="#internal-talks" class="fas fa-link"></a>

It can be seen at the next level of [watching talks](#watching-talks) but it's quite different in the spirit and requires a lot more preparation.
I strongly believe that giving talks, training or mentoring helps people improving a lot. They gather their knowledge, think about ways of presenting it
and often end up deepen their knowledge on a known subject. Theses talks can be much more specific to the company topics (business or tech) but not necessarily.
On big organisations, it's a good way to share knowledge and news across departments.

It was really well done at Criteo, multiple times per month and with a nice organisation and setup.
At Zeenea we did it once a week within a 7 people team. It was quite intense but really interesting as it forces everyone to participate
and do not take too much time to prepare (less pressure on the result).
At Nexeo I have tried to launch it but did not succeed to convince people to follow it (so I was the only one doing it ^^).

So if you can do it, it's really worth it to keep an innovative spirit.

## Coding katas<a href="#coding-katas" class="fas fa-link"></a>

Talks and presentations are great, they allow to quickly get general knowledge on some topics. They give ideas but to really use them you need practice.
And you probably don't want developers to practice on their business projects (which is a taboo but is often the case).

A great way to do it is to gather some interested people and solve some katas (also called dojos sometimes).
Many subjects are publicly available [here](http://codekata.com){:target="_blank"}, [here](http://www.codingdojo.org/KataCatalogue){:target="_blank"} or
[there](https://github.com/gamontal/awesome-katas){:target="_blank"}, you can use challenge websites such as [CodinGame](https://www.codingame.com){:target="_blank"},
[LeetCode](https://leetcode.com){:target="_blank"} or [HackerRank](https://www.hackerrank.com){:target="_blank"}, join an existing meetup organizing dojos such as
[Craft your Skills](https://www.meetup.com/fr-FR/Craft-your-Skills) organized by Arolla or [NightClazz](https://www.meetup.com/fr-FR/NightClazz) from Zenika.
Or even bring your own subjects you want to experiment such as

- testing approaches: BDD, Property Based Testing
- concepts such as functional programming, IO
- architectures such as event sourcing, CQRS, hexagonal architecture
- languages or frameworks
- anything else you want to try

I participated to the coding dojo guild at Criteo and launched some CodinGame lunch with my teammates.
It requires a lot of motivation to do it but it's very rewarding and I'm hoping to do more in the future.

## Mob programming<a href="#mob-programming" class="fas fa-link"></a>

If you know **pair programming**, mob programming is the same but with the whole team. It may seems strange to you but it makes sense in a couple of contexts.
For example, for sharing knowledge and practices accross the team, it's much more effective to see co-workers habits to learn from them or help them improve by giving some tips.
It's also very useful when the limited factor of productivity is not the typing speed but the design quality. Making good design choices and catching errors early can hugely
increase the value delivery (even if line of code produced will lower, which can be a good news ^^).

It can be a very scary exercise for developers as they are not used to and it can be much more comfortable to stay alone behind their screen.
It's important to set strong behaviour policies to keep a safe environment for collaboration.

I tried it at Criteo but really implemented it at Zeenea with the whole team, one morning a week.
It's not an easy exercise and there is always things to improve but it really is worth it.
I can suggest you to read a lot about it before suggesting or testing it. Maybe hiring an experimented coach for the firsts sessions.

## Bug fix demo<a href="#bug-fix-demo" class="fas fa-link"></a>

I have seen that many bugs come from a misunderstanding from the developer and shipped fixes are often superficial.
I don't think we can blame individual developers for this, they are locked inside a system that push them in this direction.
But we could add a process that changes the balance and helps lower the bug count.

Doing a quick demo to the whole for every fixed bug explaining what was the bug, how it was introduced, what is the root cause and what is the fix
could drastically improve the code robustness.

This will highlight to the whole team parts of code that are not well known or dangerous/fragile. So they can avoid doing the same error twice.
But also identify bad practices that make the code obscure or fragile. Therefore, they can think of better ways of doing things that may avoid all kind of bugs.
Presenting this will reduce the quick & dirty fix lazyness and, if not, other team member can suggest more systemic solutions.

I know it may take a lot of time, at first, but with the time it should reduce as the team and the code improves.
If too heavy at the beginning, you could do it only on some bugs but I suggest choosing them at random rather than severity or interest.
It's too easy to classify bugs as not important/interesting to escape this <i class="emoji wink"></i>

We tried it at Zeenea just a couple of times before we started a rush period so I don't have much feedback on it but I think it's quite promising.

## Technical backlog<a href="#technical-backlog" class="fas fa-link"></a>

This is one of the most useful process we tried at Zeenea.
Allowing the team to build its own backlog with no external constraint and investing 20% of its time into it.
This backlog is for improving the product (not doing whatever they want ^^) but with the most important tasks for them.
This free some time for important refactoring, technology switch or design exploration that would otherwise never be prioritized.

I have read a study (but can't find it again now <i class="emoji sad"></i>) saying that optimal performance is achieved at 80% occupation time, not 100%.
They took the road analogy, when it's 100% full, it's a traffic jam and the throughput is 0.
In a team, having time to work on what seems important to developers but not prioritized by product, allows to remove small roadblocks and keep productivity and motivation high.

{% include embed-tweet.html id="1250863316819415046" user="vincentdnl" name="Vincent Déniel"
    content="A drawing I made today: technical debt (or more likely a rotten codebase), explained to non-technical people!"
    image="/assets/posts/2020/process-for-high-performing-teams/tech-dept.jpeg" %}

As an example, at Zeenea it allowed us to re-write our data migration system so release needed much less preparation work and were much smoother.
We also cleaned some dead code, finished un-finished refactorings and improved the code coherence.

## Public speaking open bar<a href="#public-speaking-open-bar" class="fas fa-link"></a>

Many companies allow developers to go to tech conferences a few times a year.
Some of them try to send speakers as it increase brand image for developers and helps recruiting (among other things).
But I have not seen many with a very large policy on speaking at conferences.

Personally, I think supporting people wanting to speak at conferences is a very little investment with a potential high return.
In term of internal motivation and investment but also external visibility. Abuse is very limited by the speaker selection committee (it's not easy to get selected)
and the huge preparation work needed to prepare the talk.

## Final thoughts<a href="#final-thoughts" class="fas fa-link"></a>

[![Accelerate book](/assets/posts/2020/process-for-high-performing-teams/accelerate-book.jpg){:.pull-right}](https://itrevolution.com/book/accelerate){:target="_blank"}
As said in introduction, finding ideas for continuous improvement is not a checklist to go through but a daily attention on what works and what doesn't, think and try new things.
I hope theses ideas may help you but try your most crazy ideas and tell us in comment what you did find <i class="emoji wink"></i><br>
<br>
About team performance in tech, I can only recommend the [Accelerate book](https://itrevolution.com/book/accelerate){:target="_blank"}.
A study on many companies and what are the performance indicators and process.

The [Cyrille Martraire](https://twitter.com/cyriux){:target="_blank"}'s Craft keynote at Sunny Tech is also quite inspiring on how to experiment new ideas :

- "More of good things" : take things that works and push them to the extrem (does it improve ?)
- "No something" : take something you do and remove it (how will you adapt ?)

{% include embed-youtube.html code="xbRD7XajUuw" time="1439" %}

What do you think ? Did you try something with your team ? What were the result ?
