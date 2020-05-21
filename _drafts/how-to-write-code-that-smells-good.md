---
layout:      post
locale:      en_US
icon:        pie
title:       How to write code that smells good
banner_1_1:  /assets/posts/drafts/how-to-write-code-that-smells-good/how-to-write-code-that-smells-good_1_1.jpg
banner_2_1:  /assets/posts/drafts/how-to-write-code-that-smells-good/how-to-write-code-that-smells-good_2_1.jpg
banner_21_9: /assets/posts/drafts/how-to-write-code-that-smells-good/how-to-write-code-that-smells-good_21_9.jpg
banner_3_1:  /assets/posts/drafts/how-to-write-code-that-smells-good/how-to-write-code-that-smells-good_3_1.jpg
author:      loic
categories:  [tech, craft]
tags:        []
---

This time, I would like to talk about what really drives me in software engineering: **creating reliable software based on maintainable code**.

To achieve this, especially when the project grows and the team change, we can't rely on smart developers, as, soon or later,
they will be overwhelmed by the project complexity. We should set up a systemic process and guidelines that will allow any developer to understand what is going on
so they can build robust modules that work together and perform scalable tasks.

There is so much to say here that one article is too short, let's start with a global overview of what I consider practices
that strengthens the software and then explain them individually in future articles to come.

First of all, I'm very keen on [software craft](https://manifesto.softwarecraftsmanship.org){:target="_blank"} which encourage developers to try new things to
improve software engineering practices, share knowledge with others and, of course, always keep in mind that we are here to create business value,
not just building tech oriented solutions. It's a continuation of the [Agile principles](https://agilemanifesto.org){:target="_blank"} at its beginnings,
before it moved into the corporate scrum of today.

This leads to a lot of practices that are independent and fit very well together: **Domain Driven Design**, **Functional programming**, **Hexagonal architecture**,
**Property-based testing**, **CQRS**, **Event sourcing**, **Living documentation**, **Mob programming**, **Event storming** and much more...
If you are in the spirit of doing great software, I can only encourage you to look into them.
They provide fundamental knowledge that can be applied to make more robust software. And of course, I will cover them in future articles ;)

So, the landscape has been drawn, let's discuss about more operational principles to apply in day-to-day code.

## Refactoring, refactoring, refactoring<a href="#refactoring-refactoring-refactoring" class="fas fa-link"></a>

Let's say it once again: refactoring! Above all the others, this is probably the most important habit to get used to.
As everything move and we are not gods, it's absolutely normal that we have better ideas of how/what to do over time.
Of course we technically improve, discover new patterns and learn every day new principles and techniques, but, most importantly,
we also gain a better understanding of the business we implement as the project progress.
Things that may look over-engineered one day can seem a necessary tooling once we gain in experience and the code grows.

Code coherence and naming are very important to keep the code understandable and can be frequent sources of refactoring, especially when introducting new conventions.
[A codebase is a living organism](https://meltingasphalt.com/a-codebase-is-an-organism){:target="_blank"} that we should take care of to stay in a good fit,
do not neglect the old parts. But this doesn't mean we should spend all of our time redo what has been done.
As an example, I consider a good habit to refactor things every day but it should take less than 5 or 10% of my time in healthy environment.
Project practices should make refactoring a no brainer and regression risk very low, whatever the refactoring is (extensive use of static types may be useful here ^^).
And if a regression is found, it's a good opportunity to think again about a design or practice which would have avoided it,
and doing a [bug fix demo]({% post_url 2020-04-20-process-for-high-performing-teams %}#bug-fix-demo) could help a bit more.
As an example, constants defined at multiple places should be quickly eliminated when found.

{% include tweet-quote.html quote="Changing any part of the software without causing bugs can be a good definition of a robust design" %}

## API and module boundaries<a href="#api-and-module-boundaries" class="fas fa-link"></a>

The most challenging part of software engineering to me is being able to manage the emerging complexity of a growing and evolving system.
Keeping the codebase under control require to understand it globally, at many level of abstraction.
I have seen too many projects where developers (including myself) are flooded by complexity and perform changes by tries and errors,
fear of changing some parts as they escape their understanding or use of tricks to overcome previous tricks done to minimize changed code
in order to avoid new bugs as much as possible. Such projects "kind of" work by throwing huge amount of time producing low business value.
In general, people always find justifications for this and sometimes, it's the only way they know to produce software.

Personally, I always consider as design or software management issues when developers do not understand what they are doing (unexpected bugs for example).

What can we do about this ?

The first thing I realized is that API is much more important than implementation. It should be clear and not leak any implementation detail.
In Domain Driven Design we talk about bounded context. It took me quite some time to relativize the DRY (Don't Repeat Yourself) that is far too well-known.
Having a generic code, means coupling between parts using them. Changing it will change every part using it, it's precisely the goal but not always suitable.

So, when to repeat code and when not to ?

First of all, I **split code between technical code and business code**. The first one should be very generic and could be shared between projects as libraries.
It rarely evolves, and obviously, not with business requirements.
Its goal is to hide any technical complexity from business code, so its API must be easy to understand and use.
On the other side, business code will be very specific and should evolve quickly to match business needs.
It should be easy to understand, even by non-developers when done really well.
It should be more declarative and reuse should be done very carefully as there are always exceptions in business.

The DRY principle should be applied only when it matches business semantics.
If this is functionally the same thing, it will evolve in the same way so reuse can be useful. But in doubt, avoid it.

## Type everything<a href="#type-everything" class="fas fa-link"></a>

In the way of making software understandable and robust, types are grail to me. Why ? Because [they are a proof](https://www.youtube.com/watch?v=iJILejo_mRM){:target="_blank"} (FR).
A proof of type construction, so it enclosed data satisfy the constructor requirements.
Requirements can be as simple as having the correct number of arguments but can be arbitrarily complex (finite number of values, regex, number bounds, data size...).
For example, instead of using UUID or String to hold entity ids, I use a specific type for each entity (UserId, CompanyId, TalkId...).
So they become incompatible, and I can't make a mistake when a function take two ids of different types. Plus I have the guarantee they have the correct format.
Having this kind of check will allow catching errors very early and in a systemic way, so it avoids a lot of bugs.
Most of the time, the remaining errors are with the untyped external world (database, http requests, parsing content...) which is very limited so easier to test well.

With this approach, you want very precise types that represent your data/state, and you may create many more types than before, but it's for a clear understanding of what happens.
For example, you may have a User entity with an id attribute. But, what do you use when creating a User ? The same object but with null in id ?
So User type does not guarantee id is present, and you should check everywhere... Or if you don't, nasty bugs can appear.
What I suggest is having a UserCreation entity which is used only when creating a User and does not have the id. So when you have a User, you have the guarantee the id is present.

It's the same thing when doing a validation, if you have the same type before and after, you can never know if the validation has been done or not.
Change the type when validating it (UnsafeEmail => Email for example), so you will know that the validation was done,
and you can require it before calling a method by simply taking the validated type as parameter.

I think this subject is crucial to avoid many bugs but I will develop it in a dedicated article.
In the meantime, you can watch [Making Impossible States Impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8){:target="_blank"} by Richard Feldman ;)
This technique is very powerful when using Property based testing because generators will generate only valid data,
and you don't have to care anymore of invalid data (except at system boundaries), thanks to the types.

So don't fear creating a lot of types, it may seem overkill at first, but it will avoid you hard times later...
I you want to try this, replace any String, Int, Long, Boolean or any technical type with a business semantic type (UserCount, AdminFlag, UserName, TalkDescription...).
For example, in previous project I created AbsolutePath & RelativePath, PathPart, FizeSize, Duration, Bandwidth...
They allow you to add semantic methods which do not mess with units. Parsing and formatting methods to use friendly format (ex: "100 Gb/s" in config files),
safe combinations (check for the ending '/' when adding paths together) or define rules (Bandwidth x Duration = FileSize).

{% include tweet-quote.html quote="Types are a proof, a proof data passed constructor or factory validations. Use them to prove your code and avoid bugs" %}

## Explicit verbosity<a href="#explicit-verbosity" class="fas fa-link"></a>

One thing that gives me headaches is having to remember implicit states, call order or code subtilities when I code.
Everything that is not explicitly written, but I should consider when programming.

One example is variables in ThreadLocal in the JVM. This is a way to store values in the thread and read it later.
On read side, I can only hope the calling path is correct, so the value is here. No way to make sure of it globally.
On write side, I should foresee every called function to know what I should do. Which is quite impossible.
This mechanism is often used for very generic values such as request ids or transactions. But what happens when the caller is not from a http request ?
Or what happens if I need to use async code, so I have a thread switch ? Or if I want to create a new transaction for a specific use case ? No way to handle that.

Most of the time, I prefer to rely on basic function arguments. It adds some verbosity, but it's much obvious. You can't call the function without passing the argument.
Inside the function you know you can use it as it's part of the arguments.


Theses are four principles I follow as much as possible when I code. I did that in [Gospeak](https://github.com/gospeak-io/gospeak){:target="_blank"} (Scala) if you want to take a look.
Comments to improve are always welcome!
I also organize [regular mob programming sessions](https://gospeak.io/groups/gospeak){:target="_blank"} to work collaboratively on this. Feel free to join us if you are in Paris.
