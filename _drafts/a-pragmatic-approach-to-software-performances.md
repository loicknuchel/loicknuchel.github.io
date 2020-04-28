---
layout:      post
locale:      en_US
icon:        draft
title:       A pragmatic approach to software performances
banner_1_1:  
banner_2_1:  
banner_21_9: 
banner_3_1:  
author:      loic
categories:  []
tags:        []
---

As software engineers we like to understand how things work under the hood and optimize them. And we often apply that to code, as we write it most of the time.
I had countless discussions about software performances which went in many directions but most of the time quite theorical based on micro optimisations.

But writting software is a social activity and not only the computer read our code, also co-workers and future us.
So optimizing is always a trade off in many directions and if you are not aware of them, you may hurt them.

As a crafter, I value a lot code readability (which may be quite contextual but still, I think it's an important goal) and optimizing for performances when there is not
a clear problem may cause harder to read code.

The approach I suggest is to not take care of software performances unless a problem is identified and measured.

- not all code is on the critical path, so optimizing non-critical code is a useless loss of time and readability
- having a more understandable code structure allows developers to not call unnecessary code because they do not fully understand how things works
- bad performances often comes from a single bottleneck on the critical path. Finding and solving it may fix the whole problem without changing a lot of code. And if not sufficient, finding the next one and so on will do the job.
- high performances, when needed, comes from adapted architectures and tools, not micro-optimizations
- performance means nothing in absolute, it's always regardless a business goal: under 100ms response time, 20% less CPU consumption, less than 24h daily batch...



Performance is more about architecture, data structures and removing bottleneck than micro optimized code.
Some micro optimisations may be usefull but only once no other way is possible. And it still can be done with a quite comprehensive api.
Or, if you are there, maybe a langague or plateform switch can be considered.
