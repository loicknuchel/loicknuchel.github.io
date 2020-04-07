---
layout:      post
locale:      en_US
icon:        draft
title:       How to write code that smells good
banner_1_1:  
banner_2_1:  
banner_21_9: 
banner_3_1:  
author:      loic
categories:  [tech, craft]
tags:        []
---

It has been a long time since I didn't blog, so let's start again!

For this first one, I would like to talk about what really drives me in software engineering: creating reliable software based on maintainable code.

To achieve this, especially when the project grows and the team changes, we can't rely on smart developers, as, soon or later, they will be overwhelmed by the complexity. We should set up a systemic process and guidelines that will allow any developer to understand what is going on so they can build robust modules that work together and perform scalable tasks.

There is so much to say here that one article is too short, let's start with a global overview of what I consider practices that strengthens the software and then explain them individually in future articles to come.

First of all, I'm very keen on [software craft](https://manifesto.softwarecraftsmanship.org/) which encourage developers to try new things to improve software engineering practices, share knowledge with others and, of course, always keep in mind too that we are here to create business value, not just building tech oriented solutions. It's a continuation of the [Agile principles](https://agilemanifesto.org/) at its beginnings, before it moved into the corporate scrum of today.

This leads to a lot of practices that are independent and fit very well together: Domain Driven Design, Functional programming, Hexagonal architecture, Property-based testing, CQRS, Event sourcing, Living documentation, Mob programming, Event storming and much more...
If you are in the spirit of doing great software, I can only encourage you to look into them. They provide fundamental knowledge that can be applied to make software more robust. Of course, I will cover them in future articles ;)

So, the landscape has been drawn, let's discuss about more operational principles to apply in day-to-day code.

- Refactoring, refactoring, refactoring

And one more: refactoring! Above all the others, this is probably the most important habit to get used to. As everything move and we are not gods, it's absolutely normal that we have better ideas of how/what to do over time. Of course we technically improve, discover new patterns and learn every day new principles and techniques, but, most importantly, we also gain a better understanding of the business we implement a the project progress. Things that may look over-engineered one day can seems necessary tooling once we gain in experience or the code grows. Code coherence and naming are very important to keep the code understandable and can be frequent sources of refactoring, especially when introducting new conventions. [A codebase is a living organism](https://meltingasphalt.com/a-codebase-is-an-organism/) that we should take care to stay in good fit, and do not neglect old parts.
But this doesn't mean we should spend all of our time redo what has been done. As an example, I consider a good habit to refactor things every day but I should take less than 5 or 10% of our time in healthy environments. Project practices should make refactoring a no brainer and regression risk should be very low, whatever the refactoring is. And if a regression is found, it's a good opportunity to think again about a design or a practice which would have avoided it. As an example, constants defined at multiple places are quickly eliminated this way.
Changing any part of the software without causing bugs can be a good definition of a robust design.

- API and module boundaries

The most challenging part of software engineering to me is being able to manage the emerging complexity of a growing and evolving system. Keeping the codebase under control require understanding it globally, at many level of abstraction. I have seen too many projects where developers (including myself) are flooded by complexity and perform changes by try and error, fear of changing some parts as they escape their understanding or use of tricks to overcome previous tricks done to minimize changed code to avoid new bugs as much as possible. Such projects "kind of" work by throwing huge amount of time producing low business value. In general, people always find justifications for this and sometimes, it's the only way they know to produce software. But, personally, I always consider as design or software management issues when developers do not understand what they are doing (unexpected bugs for example).
What can we do about this?
The first thing I realized is that API is much more important than implementation. It should be clear and not leak implementation details. In Domain Driven Design we talk about bounded context. It took me quite some time to relativize the DRY (Don't Repeat Yourself) that is far too well known. Having a generic code, means coupling between parts using them. Changing it will change every part using it, it's precisely the goal but not always suitable.
So, when to repeat code and when not to?
First of all, I split code between technical code and business code. The first one should be very generic and could be shared between projects as libraries. It evolves rarely, and obviously not with business requirements. Its goal is to hide any technical complexity from business code, so its API must be easy to understand and use. On the other side, business code will be very specific and should evolve quickly to match business needs. It should be easy to understand, even by non-developers when done really well. It should be more declarative and reuse should be done very carefully as there are always exceptions in business. The DRY principle should be applied only when it matches the business semantic. If this is functionally the same thing, it will evolove in the same way so reuse can be useful. But in doubt, avoid it.

- Type everything

In the way of making software understandable and robust, types are Graal to me. Why? Because [they are a proof](https://www.youtube.com/watch?v=iJILejo_mRM) (FR). A proof that the type has been constructed so it encloses data satisfying the constructor requirements. Requirements can be as simple as having the correct number of arguments but can be arbitrarily complex (finite number of values, regex, number bounds, data size...). For example, instead of using UUID or String to hold entity ids, I use a specific type for each entity (UserId, CompanyId, TalkId...). So they become incompatible and I can't make a mistake when a function take two ids of different types. Plus I have the guarantee they have the correct format. Having this kind of check will allow catching errors very early and in a systemic way, so it avoids a lot of bugs. Most of the time, the remaining errors are with the untyped external world (database, http requests, parsing content...) which is very limited and easy to test well.
With this approach, you want very precise types that represent your data/state and you may create many more types than before, but it's for a clear understanding of what happens. For example, you may have a User entity with an id attribute. But what do you use when creating a User? The same object but with null in id? So User type does not guarantee id is present and you should check everywhere... Or if you don't, nasty bugs can appear. What I suggest is having a UserCreation entity which is used only when creating a User and does not have the id. So when you have a User, you have the guarantee the id is present.
It's the same thing when doing a validation, if you have the same type before and after, you can never know if the validation has been done or not. Change the type when validating it (Email => ValidatedEmail for example) so you will know if the validation is done and you can require it before calling a method by simply taking the validated type as parameter.
I think this subject is crucial to avoid bugs but I will develop it in a dedicated article. In the meantime, you can watch [Making Impossible States Impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8) by Richard Feldman ;)
This technique is very powerful when using Property based testing because generators will generate only valid data and you don't have to care anymore of invalid data (except at system boundaries), thanks to the types.
So don't fear creating a lot of types, it may seem overkill at first, but it will avoid you hard times later...
I you want to try this, replace any String, Int, Long, Boolean or any technical type with a business semantic type (UserCount, AdminFlag, UserName, TalkDescription...).
For example, previous project I created AbsolutePath & RelativePath, PathPart, FizeSize, Duration, Bandwidth... They allow you to add dedicated methods which do not mess with units. Parsing and formatting methods to use friendly format (ex: "100 Gb/s" in config files), safe combinations (check for the ending '/' when adding paths together) or define rules (Bandwidth x Duration = FileSize).

- Explicit verbosity

One thing that gives me headaches is having to remember implicit states, call order or code subtilities when I code. Everything that is not written but I should consider when programming.
One example is variables in ThreadLocal in the JVM. This is a way to store values in the thread and read it later. On the read side, I can only hope the calling path is correct so the value is here, no way to make sure of it globally. On the write side, I should know every called function to know what I should do. Which is quite impossible. This mechanism is often used for very generic values such as request ids or transactions. But what happens when the caller is not from an http request? Or what happens if I need to use async code so I have a thread switch? Or if I want to create a new transaction for a specific use case? No way to handle that.
Most of the time, I prefer to rely on basic function arguments. It adds some verbosity but it's much clearer. You can't call the function without passing the argument. Inside the function you know you can use it as it's part of the arguments.


Theses are four principles I follow as much as possible when I code. I did that in [Gospeak](https://github.com/gospeak-io/gospeak) (Scala) if you want to take a look. Comments to improve are always welcome!
I also organize [regular mob programming sessions](https://gospeak.io/groups/gospeak) to work collaboratively on this. Feel free to join us if you are in Paris.
