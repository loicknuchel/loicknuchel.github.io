---
layout:      post
locale:      en_US                                 # optional, default: en_US, values: en_US, fr_FR
icon:        draft                                 # optional, default: article, emoji in front of the article title
title:       A showcase post for demo              # optional, default: post file name
banner_1_1:  https://via.placeholder.com/350       # optional, default: /assets/img/default/blog_banner_1_1.jpg, for lists & twitter summary card
banner_2_1:  https://via.placeholder.com/600x300   # optional, for twitter summary_large_image card
banner_21_9: https://via.placeholder.com/1024x439  # optional, for article banner (no banner shown if not present)
banner_3_1:  https://via.placeholder.com/1110x369  # optional, for article banner (no banner shown if not present)
author:      loic                                  # optional, default to loic (names in `_data/people.json`)
categories:  [sample]                              # optional, recommended one but can be multiple
tags:        [getting started, reminder]
related:                                           # optional, if not set jekyll will add some automatically
    - imperatif-vs-fonctionnel-fight
    - eviter-toujours-plus-de-bugs-grace-au-typage
---

This sample post is here to showcase `post` possibilities and make sure design is not broken.

Here are some formatting examples of *italic*, **bold**, `code`, [an internal link](#) or [external one](#){:target="_blank}.

## Titles should start at h2

h1 is reserved for the page title

### Here is a h3 title

#### And there a h4

##### The h5 looks like this

###### And finally here is h6

Emojis works use `<i class="emoji $name"></i>` (see [full list](https://unicode.org/emoji/charts/full-emoji-list.html){:target="_blank"}) :

Alias: <span style="font-size: 2em; line-height: 1.2;">
    <i class="emoji happy" title="happy" data-toggle="tooltip"></i>
    <i class="emoji laugh" title="laugh" data-toggle="tooltip"></i>
    <i class="emoji smile" title="smile" data-toggle="tooltip"></i>
    <i class="emoji wink" title="wink" data-toggle="tooltip"></i>
    <i class="emoji geek" title="geek" data-toggle="tooltip"></i>
    <i class="emoji sad" title="sad" data-toggle="tooltip"></i>
    <i class="emoji hundred" title="hundred" data-toggle="tooltip"></i>
    <i class="emoji speak" title="speak" data-toggle="tooltip"></i>
    <i class="emoji tech" title="tech" data-toggle="tooltip"></i>
    <i class="emoji speaking" title="speaking" data-toggle="tooltip"></i>
    <i class="emoji group" title="group" data-toggle="tooltip"></i>
    <i class="emoji bug-alt" title="bug-alt" data-toggle="tooltip"></i>
    <i class="emoji coffee" title="coffee" data-toggle="tooltip"></i>
    <i class="emoji startup" title="startup" data-toggle="tooltip"></i>
    <i class="emoji management" title="management" data-toggle="tooltip"></i>
    <i class="emoji random" title="random" data-toggle="tooltip"></i>
    <i class="emoji happy-sad" title="happy-sad" data-toggle="tooltip"></i>
    <i class="emoji announcement" title="announcement" data-toggle="tooltip"></i>
    <i class="emoji talk" title="talk" data-toggle="tooltip"></i>
    <i class="emoji mobile" title="mobile" data-toggle="tooltip"></i>
    <i class="emoji code" title="code" data-toggle="tooltip"></i>
    <i class="emoji idea" title="idea" data-toggle="tooltip"></i>
    <i class="emoji article" title="article" data-toggle="tooltip"></i>
    <i class="emoji draft" title="draft" data-toggle="tooltip"></i>
    <i class="emoji event" title="event" data-toggle="tooltip"></i>
    <i class="emoji fight" title="fight" data-toggle="tooltip"></i>
    <i class="emoji experiment" title="experiment" data-toggle="tooltip"></i>
</span>

<p style="font-size: 2em; line-height: 1.2;">
    <i class="emoji grinning-face" title="grinning-face" data-toggle="tooltip"></i>
    <i class="emoji grinning-face-with-big-eyes" title="grinning-face-with-big-eyes" data-toggle="tooltip"></i>
    <i class="emoji grinning-face-with-smiling-eyes" title="grinning-face-with-smiling-eyes" data-toggle="tooltip"></i>
    <i class="emoji beaming-face-with-smiling-eyes" title="beaming-face-with-smiling-eyes" data-toggle="tooltip"></i>
    <i class="emoji grinning-squinting-face" title="grinning-squinting-face" data-toggle="tooltip"></i>
    <i class="emoji grinning-face-with-sweat" title="grinning-face-with-sweat" data-toggle="tooltip"></i>
    <i class="emoji rolling-on-the-floor-laughing" title="rolling-on-the-floor-laughing" data-toggle="tooltip"></i>
    <i class="emoji face-with-tears-of-joy" title="face-with-tears-of-joy" data-toggle="tooltip"></i>
    <i class="emoji slightly-smiling-face" title="slightly-smiling-face" data-toggle="tooltip"></i>
    <i class="emoji upside-down-face" title="upside-down-face" data-toggle="tooltip"></i>
    <i class="emoji winking-face" title="winking-face" data-toggle="tooltip"></i>
    <i class="emoji smiling-face-with-smiling-eyes" title="smiling-face-with-smiling-eyes" data-toggle="tooltip"></i>
    <i class="emoji smiling-face-with-halo" title="smiling-face-with-halo" data-toggle="tooltip"></i>
    <i class="emoji smiling-face-with-hearts" title="smiling-face-with-hearts" data-toggle="tooltip"></i>
    <i class="emoji smiling-face-with-heart-eyes" title="smiling-face-with-heart-eyes" data-toggle="tooltip"></i>
    <i class="emoji star-struck" title="star-struck" data-toggle="tooltip"></i>
    <i class="emoji face-blowing-a-kiss" title="face-blowing-a-kiss" data-toggle="tooltip"></i>
    <i class="emoji kissing-face" title="kissing-face" data-toggle="tooltip"></i>
    <i class="emoji smiling-face" title="smiling-face" data-toggle="tooltip"></i>
    <i class="emoji kissing-face-with-closed-eyes" title="kissing-face-with-closed-eyes" data-toggle="tooltip"></i>
    <i class="emoji kissing-face-with-smiling-eyes" title="kissing-face-with-smiling-eyes" data-toggle="tooltip"></i>
    <i class="emoji face-savoring-food" title="face-savoring-food" data-toggle="tooltip"></i>
    <i class="emoji face-with-tongue" title="face-with-tongue" data-toggle="tooltip"></i>
    <i class="emoji winking-face-with-tongue" title="winking-face-with-tongue" data-toggle="tooltip"></i>
    <i class="emoji zany-face" title="zany-face" data-toggle="tooltip"></i>
    <i class="emoji squinting-face-with-tongue" title="squinting-face-with-tongue" data-toggle="tooltip"></i>
    <i class="emoji money-mouth-face" title="money-mouth-face" data-toggle="tooltip"></i>
    <i class="emoji hugging-face" title="hugging-face" data-toggle="tooltip"></i>
    <i class="emoji face-with-hand-over-mouth" title="face-with-hand-over-mouth" data-toggle="tooltip"></i>
    <i class="emoji shushing-face" title="shushing-face" data-toggle="tooltip"></i>
    <i class="emoji thinking-face" title="thinking-face" data-toggle="tooltip"></i>
    <i class="emoji zipper-mouth-face" title="zipper-mouth-face" data-toggle="tooltip"></i>
    <i class="emoji face-with-raised-eyebrow" title="face-with-raised-eyebrow" data-toggle="tooltip"></i>
    <i class="emoji neutral-face" title="neutral-face" data-toggle="tooltip"></i>
    <i class="emoji expressionless-face" title="expressionless-face" data-toggle="tooltip"></i>
    <i class="emoji face-without-mouth" title="face-without-mouth" data-toggle="tooltip"></i>
    <i class="emoji smirking-face" title="smirking-face" data-toggle="tooltip"></i>
    <i class="emoji unamused-face" title="unamused-face" data-toggle="tooltip"></i>
    <i class="emoji face-with-rolling-eyes" title="face-with-rolling-eyes" data-toggle="tooltip"></i>
    <i class="emoji grimacing-face" title="grimacing-face" data-toggle="tooltip"></i>
    <i class="emoji lying-face" title="lying-face" data-toggle="tooltip"></i>
    <i class="emoji sleeping-face" title="sleeping-face" data-toggle="tooltip"></i>
    <i class="emoji face-with-medical-mask" title="face-with-medical-mask" data-toggle="tooltip"></i>
    <i class="emoji nauseated-face" title="nauseated-face" data-toggle="tooltip"></i>
    <i class="emoji face-vomiting" title="face-vomiting" data-toggle="tooltip"></i>
    <i class="emoji partying-face" title="partying-face" data-toggle="tooltip"></i>
    <i class="emoji smiling-face-with-sunglasses" title="smiling-face-with-sunglasses" data-toggle="tooltip"></i>
    <i class="emoji nerd-face" title="nerd-face" data-toggle="tooltip"></i>
    <i class="emoji slightly-frowning-face" title="slightly-frowning-face" data-toggle="tooltip"></i>
    <i class="emoji face-with-open-mouth" title="face-with-open-mouth" data-toggle="tooltip"></i>
    <i class="emoji sad-but-relieved-face" title="sad-but-relieved-face" data-toggle="tooltip"></i>
    <i class="emoji crying-face" title="crying-face" data-toggle="tooltip"></i>
    <i class="emoji loudly-crying-face" title="loudly-crying-face" data-toggle="tooltip"></i>
    <i class="emoji face-screaming-in-fear" title="face-screaming-in-fear" data-toggle="tooltip"></i>
    <i class="emoji face-with-steam-from-nose" title="face-with-steam-from-nose" data-toggle="tooltip"></i>
    <i class="emoji pouting-face" title="pouting-face" data-toggle="tooltip"></i>
    <i class="emoji angry-face" title="angry-face" data-toggle="tooltip"></i>
    <i class="emoji face-with-symbols-on-mouth" title="face-with-symbols-on-mouth" data-toggle="tooltip"></i>
    <i class="emoji smiling-face-with-horns" title="smiling-face-with-horns" data-toggle="tooltip"></i>
    <i class="emoji skull" title="skull" data-toggle="tooltip"></i>
    <i class="emoji pile-of-poo" title="pile-of-poo" data-toggle="tooltip"></i>
    <i class="emoji ghost" title="ghost" data-toggle="tooltip"></i>
    <i class="emoji see-no-evil-monkey" title="see-no-evil-monkey" data-toggle="tooltip"></i>
    <i class="emoji hear-no-evil-monkey" title="hear-no-evil-monkey" data-toggle="tooltip"></i>
    <i class="emoji speak-no-evil-monkey" title="speak-no-evil-monkey" data-toggle="tooltip"></i>
    <i class="emoji two-hearts" title="two-hearts" data-toggle="tooltip"></i>
    <i class="emoji red-heart" title="red-heart" data-toggle="tooltip"></i>
    <i class="emoji yellow-heart" title="yellow-heart" data-toggle="tooltip"></i>
    <i class="emoji purple-heart" title="purple-heart" data-toggle="tooltip"></i>
    <i class="emoji black-heart" title="black-heart" data-toggle="tooltip"></i>
    <i class="emoji white-heart" title="white-heart" data-toggle="tooltip"></i>
    <i class="emoji hundred-points" title="hundred-points" data-toggle="tooltip"></i>
    <i class="emoji collision" title="collision" data-toggle="tooltip"></i>
    <i class="emoji bomb" title="bomb" data-toggle="tooltip"></i>
    <i class="emoji speech-balloon" title="speech-balloon" data-toggle="tooltip"></i>
    <i class="emoji left-speech-bubble" title="left-speech-bubble" data-toggle="tooltip"></i>
    <i class="emoji right-anger-bubble" title="right-anger-bubble" data-toggle="tooltip"></i>
    <i class="emoji thought-balloon" title="thought-balloon" data-toggle="tooltip"></i>
    <i class="emoji zzz" title="zzz" data-toggle="tooltip"></i>
    <i class="emoji ok-hand" title="ok-hand" data-toggle="tooltip"></i>
    <i class="emoji victory-hand" title="victory-hand" data-toggle="tooltip"></i>
    <i class="emoji crossed-fingers" title="crossed-fingers" data-toggle="tooltip"></i>
    <i class="emoji sign-of-the-horns" title="sign-of-the-horns" data-toggle="tooltip"></i>
    <i class="emoji thumbs-up" title="thumbs-up" data-toggle="tooltip"></i>
    <i class="emoji thumbs-down" title="thumbs-down" data-toggle="tooltip"></i>
    <i class="emoji raised-fist" title="raised-fist" data-toggle="tooltip"></i>
    <i class="emoji handshake" title="handshake" data-toggle="tooltip"></i>
    <i class="emoji folded-hands" title="folded-hands" data-toggle="tooltip"></i>
    <i class="emoji flexed-biceps" title="flexed-biceps" data-toggle="tooltip"></i>
    <i class="emoji man-raising-hand" title="man-raising-hand" data-toggle="tooltip"></i>
    <i class="emoji woman-raising-hand" title="woman-raising-hand" data-toggle="tooltip"></i>
    <i class="emoji man-facepalming" title="man-facepalming" data-toggle="tooltip"></i>
    <i class="emoji woman-facepalming" title="woman-facepalming" data-toggle="tooltip"></i>
    <i class="emoji man-student" title="man-student" data-toggle="tooltip"></i>
    <i class="emoji woman-student" title="woman-student" data-toggle="tooltip"></i>
    <i class="emoji man-teacher" title="man-teacher" data-toggle="tooltip"></i>
    <i class="emoji woman-teacher" title="woman-teacher" data-toggle="tooltip"></i>
    <i class="emoji man-office-worker" title="man-office-worker" data-toggle="tooltip"></i>
    <i class="emoji woman-office-worker" title="woman-office-worker" data-toggle="tooltip"></i>
    <i class="emoji man-scientist" title="man-scientist" data-toggle="tooltip"></i>
    <i class="emoji woman-scientist" title="woman-scientist" data-toggle="tooltip"></i>
    <i class="emoji man-technologist" title="man-technologist" data-toggle="tooltip"></i>
    <i class="emoji woman-technologist" title="woman-technologist" data-toggle="tooltip"></i>
    <i class="emoji man-singer" title="man-singer" data-toggle="tooltip"></i>
    <i class="emoji woman-singer" title="woman-singer" data-toggle="tooltip"></i>
    <i class="emoji police-officer" title="police-officer" data-toggle="tooltip"></i>
    <i class="emoji man-police-officer" title="man-police-officer" data-toggle="tooltip"></i>
    <i class="emoji woman-police-officer" title="woman-police-officer" data-toggle="tooltip"></i>
    <i class="emoji man-superhero" title="man-superhero" data-toggle="tooltip"></i>
    <i class="emoji woman-superhero" title="woman-superhero" data-toggle="tooltip"></i>
    <i class="emoji man-supervillain" title="man-supervillain" data-toggle="tooltip"></i>
    <i class="emoji woman-supervillain" title="woman-supervillain" data-toggle="tooltip"></i>
    <i class="emoji family-man-woman-girl-boy" title="family-man-woman-girl-boy" data-toggle="tooltip"></i>
    <i class="emoji speaking-head" title="speaking-head" data-toggle="tooltip"></i>
    <i class="emoji bug" title="bug" data-toggle="tooltip"></i>
    <i class="emoji lady-beetle" title="lady-beetle" data-toggle="tooltip"></i>
    <i class="emoji spider-web" title="spider-web" data-toggle="tooltip"></i>
    <i class="emoji microbe" title="microbe" data-toggle="tooltip"></i>
    <i class="emoji seedling" title="seedling" data-toggle="tooltip"></i>
    <i class="emoji palm-tree" title="palm-tree" data-toggle="tooltip"></i>
    <i class="emoji cactus" title="cactus" data-toggle="tooltip"></i>
    <i class="emoji four-leaf-clover" title="four-leaf-clover" data-toggle="tooltip"></i>
    <i class="emoji pizza" title="pizza" data-toggle="tooltip"></i>
    <i class="emoji popcorn" title="popcorn" data-toggle="tooltip"></i>
    <i class="emoji cookie" title="cookie" data-toggle="tooltip"></i>
    <i class="emoji pie" title="pie" data-toggle="tooltip"></i>
    <i class="emoji hot-beverage" title="hot-beverage" data-toggle="tooltip"></i>
    <i class="emoji bottle-with-popping-cork" title="bottle-with-popping-cork" data-toggle="tooltip"></i>
    <i class="emoji wine-glass" title="wine-glass" data-toggle="tooltip"></i>
    <i class="emoji cocktail-glass" title="cocktail-glass" data-toggle="tooltip"></i>
    <i class="emoji tropical-drink" title="tropical-drink" data-toggle="tooltip"></i>
    <i class="emoji beer-mug" title="beer-mug" data-toggle="tooltip"></i>
    <i class="emoji clinking-beer-mugs" title="clinking-beer-mugs" data-toggle="tooltip"></i>
    <i class="emoji railway-track" title="railway-track" data-toggle="tooltip"></i>
    <i class="emoji police-car-light" title="police-car-light" data-toggle="tooltip"></i>
    <i class="emoji rocket" title="rocket" data-toggle="tooltip"></i>
    <i class="emoji luggage" title="luggage" data-toggle="tooltip"></i>
    <i class="emoji hourglass-done" title="hourglass-done" data-toggle="tooltip"></i>
    <i class="emoji hourglass-not-done" title="hourglass-not-done" data-toggle="tooltip"></i>
    <i class="emoji new-moon" title="new-moon" data-toggle="tooltip"></i>
    <i class="emoji waxing-crescent-moon" title="waxing-crescent-moon" data-toggle="tooltip"></i>
    <i class="emoji first-quarter-moon" title="first-quarter-moon" data-toggle="tooltip"></i>
    <i class="emoji last-quarter-moon" title="last-quarter-moon" data-toggle="tooltip"></i>
    <i class="emoji star" title="star" data-toggle="tooltip"></i>
    <i class="emoji glowing-star" title="glowing-star" data-toggle="tooltip"></i>
    <i class="emoji high-voltage" title="high-voltage" data-toggle="tooltip"></i>
    <i class="emoji fire" title="fire" data-toggle="tooltip"></i>
    <i class="emoji sparkles" title="sparkles" data-toggle="tooltip"></i>
    <i class="emoji party-popper" title="party-popper" data-toggle="tooltip"></i>
    <i class="emoji wrapped-gift" title="wrapped-gift" data-toggle="tooltip"></i>
    <i class="emoji admission-tickets" title="admission-tickets" data-toggle="tooltip"></i>
    <i class="emoji ticket" title="ticket" data-toggle="tooltip"></i>
    <i class="emoji military-medal" title="military-medal" data-toggle="tooltip"></i>
    <i class="emoji trophy" title="trophy" data-toggle="tooltip"></i>
    <i class="emoji sports-medal" title="sports-medal" data-toggle="tooltip"></i>
    <i class="emoji first-place-medal" title="first-place-medal" data-toggle="tooltip"></i>
    <i class="emoji second-place-medal" title="second-place-medal" data-toggle="tooltip"></i>
    <i class="emoji third-place-medal" title="third-place-medal" data-toggle="tooltip"></i>
    <i class="emoji direct-hit" title="direct-hit" data-toggle="tooltip"></i>
    <i class="emoji crystal-ball" title="crystal-ball" data-toggle="tooltip"></i>
    <i class="emoji magic-wand" title="magic-wand" data-toggle="tooltip"></i>
    <i class="emoji video-game" title="video-game" data-toggle="tooltip"></i>
    <i class="emoji joystick" title="joystick" data-toggle="tooltip"></i>
    <i class="emoji slot-machine" title="slot-machine" data-toggle="tooltip"></i>
    <i class="emoji game-die" title="game-die" data-toggle="tooltip"></i>
    <i class="emoji puzzle-piece" title="puzzle-piece" data-toggle="tooltip"></i>
    <i class="emoji heart-suit" title="heart-suit" data-toggle="tooltip"></i>
    <i class="emoji performing-arts" title="performing-arts" data-toggle="tooltip"></i>
    <i class="emoji artist-palette" title="artist-palette" data-toggle="tooltip"></i>
    <i class="emoji glasses" title="glasses" data-toggle="tooltip"></i>
    <i class="emoji sunglasses" title="sunglasses" data-toggle="tooltip"></i>
    <i class="emoji crown" title="crown" data-toggle="tooltip"></i>
    <i class="emoji top-hat" title="top-hat" data-toggle="tooltip"></i>
    <i class="emoji graduation-cap" title="graduation-cap" data-toggle="tooltip"></i>
    <i class="emoji billed-cap" title="billed-cap" data-toggle="tooltip"></i>
    <i class="emoji gem-stone" title="gem-stone" data-toggle="tooltip"></i>
    <i class="emoji loudspeaker" title="loudspeaker" data-toggle="tooltip"></i>
    <i class="emoji megaphone" title="megaphone" data-toggle="tooltip"></i>
    <i class="emoji bell" title="bell" data-toggle="tooltip"></i>
    <i class="emoji studio-microphone" title="studio-microphone" data-toggle="tooltip"></i>
    <i class="emoji microphone" title="microphone" data-toggle="tooltip"></i>
    <i class="emoji headphone" title="headphone" data-toggle="tooltip"></i>
    <i class="emoji mobile-phone" title="mobile-phone" data-toggle="tooltip"></i>
    <i class="emoji laptop" title="laptop" data-toggle="tooltip"></i>
    <i class="emoji desktop-computer" title="desktop-computer" data-toggle="tooltip"></i>
    <i class="emoji keyboard" title="keyboard" data-toggle="tooltip"></i>
    <i class="emoji floppy-disk" title="floppy-disk" data-toggle="tooltip"></i>
    <i class="emoji magnifying-glass-tilted-left" title="magnifying-glass-tilted-left" data-toggle="tooltip"></i>
    <i class="emoji light-bulb" title="light-bulb" data-toggle="tooltip"></i>
    <i class="emoji closed-book" title="closed-book" data-toggle="tooltip"></i>
    <i class="emoji open-book" title="open-book" data-toggle="tooltip"></i>
    <i class="emoji green-book" title="green-book" data-toggle="tooltip"></i>
    <i class="emoji blue-book" title="blue-book" data-toggle="tooltip"></i>
    <i class="emoji orange-book" title="orange-book" data-toggle="tooltip"></i>
    <i class="emoji books" title="books" data-toggle="tooltip"></i>
    <i class="emoji page-with-curl" title="page-with-curl" data-toggle="tooltip"></i>
    <i class="emoji bookmark" title="bookmark" data-toggle="tooltip"></i>
    <i class="emoji label" title="label" data-toggle="tooltip"></i>
    <i class="emoji money-bag" title="money-bag" data-toggle="tooltip"></i>
    <i class="emoji dollar-banknote" title="dollar-banknote" data-toggle="tooltip"></i>
    <i class="emoji euro-banknote" title="euro-banknote" data-toggle="tooltip"></i>
    <i class="emoji envelope" title="envelope" data-toggle="tooltip"></i>
    <i class="emoji memo" title="memo" data-toggle="tooltip"></i>
    <i class="emoji calendar" title="calendar" data-toggle="tooltip"></i>
    <i class="emoji tear-off-calendar" title="tear-off-calendar" data-toggle="tooltip"></i>
    <i class="emoji spiral-calendar" title="spiral-calendar" data-toggle="tooltip"></i>
    <i class="emoji chart-increasing" title="chart-increasing" data-toggle="tooltip"></i>
    <i class="emoji chart-decreasing" title="chart-decreasing" data-toggle="tooltip"></i>
    <i class="emoji bar-chart" title="bar-chart" data-toggle="tooltip"></i>
    <i class="emoji pushpin" title="pushpin" data-toggle="tooltip"></i>
    <i class="emoji round-pushpin" title="round-pushpin" data-toggle="tooltip"></i>
    <i class="emoji paperclip" title="paperclip" data-toggle="tooltip"></i>
    <i class="emoji locked" title="locked" data-toggle="tooltip"></i>
    <i class="emoji unlocked" title="unlocked" data-toggle="tooltip"></i>
    <i class="emoji key" title="key" data-toggle="tooltip"></i>
    <i class="emoji hammer" title="hammer" data-toggle="tooltip"></i>
    <i class="emoji axe" title="axe" data-toggle="tooltip"></i>
    <i class="emoji pick" title="pick" data-toggle="tooltip"></i>
    <i class="emoji hammer-and-pick" title="hammer-and-pick" data-toggle="tooltip"></i>
    <i class="emoji hammer-and-wrench" title="hammer-and-wrench" data-toggle="tooltip"></i>
    <i class="emoji dagger" title="dagger" data-toggle="tooltip"></i>
    <i class="emoji crossed-swords" title="crossed-swords" data-toggle="tooltip"></i>
    <i class="emoji shield" title="shield" data-toggle="tooltip"></i>
    <i class="emoji balance-scale" title="balance-scale" data-toggle="tooltip"></i>
    <i class="emoji link" title="link" data-toggle="tooltip"></i>
    <i class="emoji test-tube" title="test-tube" data-toggle="tooltip"></i>
    <i class="emoji dna" title="dna" data-toggle="tooltip"></i>
    <i class="emoji microscope" title="microscope" data-toggle="tooltip"></i>
    <i class="emoji telescope" title="telescope" data-toggle="tooltip"></i>
    <i class="emoji roll-of-paper" title="roll-of-paper" data-toggle="tooltip"></i>
    <i class="emoji warning" title="warning" data-toggle="tooltip"></i>
    <i class="emoji double-exclamation-mark" title="double-exclamation-mark" data-toggle="tooltip"></i>
    <i class="emoji check-mark" title="check-mark" data-toggle="tooltip"></i>
    <i class="emoji cross-mark" title="cross-mark" data-toggle="tooltip"></i>
    <i class="emoji part-alternation-mark" title="part-alternation-mark" data-toggle="tooltip"></i>
    <i class="emoji purple-circle" title="purple-circle" data-toggle="tooltip"></i>
    <i class="emoji purple-square" title="purple-square" data-toggle="tooltip"></i>
    <i class="emoji pirate-flag" title="pirate-flag" data-toggle="tooltip"></i>
</p>

And also [github emoji](https://www.webfx.com/tools/emoji-cheat-sheet){:target="_blank"} :

<p style="font-size: 2em; line-height: 1.2;">
    :trollface:
    :octocat:
</p>

And you can also use [font-awesome](https://fontawesome.com/icons?m=free){:target="_blank"} :

<p style="font-size: 2em; line-height: 1.2;">
    <i class="fas fa-address-book" title="fas fa-address-book" data-toggle="tooltip"></i>
    <i class="fas fa-address-card" title="fas fa-address-card" data-toggle="tooltip"></i>
    <i class="fas fa-at" title="fas fa-at" data-toggle="tooltip"></i>
    <i class="fas fa-bell" title="fas fa-bell" data-toggle="tooltip"></i>
    <i class="fas fa-bolt" title="fas fa-bolt" data-toggle="tooltip"></i>
    <i class="fas fa-book" title="fas fa-book" data-toggle="tooltip"></i>
    <i class="fas fa-book-reader" title="fas fa-book-reader" data-toggle="tooltip"></i>
    <i class="fas fa-bookmark" title="fas fa-bookmark" data-toggle="tooltip"></i>
    <i class="fas fa-bug" title="fas fa-bug" data-toggle="tooltip"></i>
    <i class="fas fa-bullhorn" title="fas fa-bullhorn" data-toggle="tooltip"></i>
    <i class="fas fa-bullseye" title="fas fa-bullseye" data-toggle="tooltip"></i>
    <i class="fas fa-calendar-day" title="fas fa-calendar-day" data-toggle="tooltip"></i>
    <i class="fas fa-chalkboard-teacher" title="fas fa-chalkboard-teacher" data-toggle="tooltip"></i>
    <i class="fas fa-check" title="fas fa-check" data-toggle="tooltip"></i>
    <i class="fas fa-chart-pie" title="fas fa-chart-pie" data-toggle="tooltip"></i>
    <i class="fas fa-code" title="fas fa-code" data-toggle="tooltip"></i>
    <i class="fas fa-code-branch" title="fas fa-code-branch" data-toggle="tooltip"></i>
    <i class="fas fa-comment" title="fas fa-comment" data-toggle="tooltip"></i>
    <i class="fab fa-dev" title="fab fa-dev" data-toggle="tooltip"></i>
    <i class="fas fa-exclamation-triangle" title="fas fa-exclamation-triangle" data-toggle="tooltip"></i>
    <i class="fas fa-eye" title="fas fa-eye" data-toggle="tooltip"></i>
    <i class="fas fa-flag" title="fas fa-flag" data-toggle="tooltip"></i>
    <i class="fas fa-gem" title="fas fa-gem" data-toggle="tooltip"></i>
    <i class="fas fa-gift" title="fas fa-gift" data-toggle="tooltip"></i>
    <i class="fas fa-hashtag" title="fas fa-hashtag" data-toggle="tooltip"></i>
    <i class="fas fa-heart" title="fas fa-heart" data-toggle="tooltip"></i>
    <i class="fas fa-id-badge" title="fas fa-id-badge" data-toggle="tooltip"></i>
    <i class="fas fa-info-circle" title="fas fa-info-circle" data-toggle="tooltip"></i>
    <i class="fas fa-laptop-code" title="fas fa-laptop-code" data-toggle="tooltip"></i>
    <i class="fas fa-layer-group" title="fas fa-layer-group" data-toggle="tooltip"></i>
    <i class="fas fa-lightbulb" title="fas fa-lightbulb" data-toggle="tooltip"></i>
    <i class="fas fa-link" title="fas fa-link" data-toggle="tooltip"></i>
    <i class="fas fa-magic" title="fas fa-magic" data-toggle="tooltip"></i>
    <i class="fas fa-map-marked-alt" title="fas fa-map-marked-alt" data-toggle="tooltip"></i>
    <i class="fas fa-medal" title="fas fa-medal" data-toggle="tooltip"></i>
    <i class="fas fa-microphone" title="fas fa-microphone" data-toggle="tooltip"></i>
    <i class="fas fa-play" title="fas fa-play" data-toggle="tooltip"></i>
    <i class="fas fa-portrait" title="fas fa-portrait" data-toggle="tooltip"></i>
    <i class="fas fa-poo" title="fas fa-poo" data-toggle="tooltip"></i>
    <i class="fas fa-poll" title="fas fa-poll" data-toggle="tooltip"></i>
    <i class="fas fa-question-circle" title="fas fa-question-circle" data-toggle="tooltip"></i>
    <i class="fas fa-quote-right" title="fas fa-quote-right" data-toggle="tooltip"></i>
    <i class="fas fa-signature" title="fas fa-signature" data-toggle="tooltip"></i>
    <i class="fas fa-star" title="fas fa-star" data-toggle="tooltip"></i>
    <i class="fas fa-tag" title="fas fa-tag" data-toggle="tooltip"></i>
    <i class="fas fa-terminal" title="fas fa-terminal" data-toggle="tooltip"></i>
    <i class="fas fa-thumbs-up" title="fas fa-thumbs-up" data-toggle="tooltip"></i>
    <i class="fas fa-tint" title="fas fa-tint" data-toggle="tooltip"></i>
    <i class="fas fa-trophy" title="fas fa-trophy" data-toggle="tooltip"></i>
    <i class="fas fa-user-circle" title="fas fa-user-circle" data-toggle="tooltip"></i>
    <i class="fas fa-video" title="fas fa-video" data-toggle="tooltip"></i>
    <i class="fab fa-youtube" title="fab fa-youtube" data-toggle="tooltip"></i>
</p>

You can use lists, with nested lists :

- item 1
- item 2
    - item 2.1
    - item 2.2
- item 3

In addition to lists, you can also do tables :

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

And code sample too :

```scala
def hello(name: String): Unit = println(s"Hello $name")
```

A special style for **console** and **error** is available :

```console
cd my-dir
```

```error
No folder 'my-dir'
On multi lines
A here also!
```

> You can use quotes

> And cite authors of the quote
>> Awesome guy!

And even embed a twitt:

{% include embed-tweet.html id="1242847901845524480" user="loicknuchel" name="Loïc Knuchel"
    content="Je découvre https://search.google.com/search-console<br>C'est sympa de voir les mots clés sur lesquels on remonte... Mais bon, pas encore assez de trafic sur https://gospeak.io ^^" %}

Images can be on their own block :

![](https://via.placeholder.com/1024x200)

![](https://via.placeholder.com/300x150)

They can have a caption (so will be 100% width) :

<figure>
  <img src="https://via.placeholder.com/300x50" alt="Placeholder">
  <figcaption>An image caption with <a href="#">link</a></figcaption>
</figure>

![](https://via.placeholder.com/150x50){:.pull-right}
And be put on the side, on the right

![](https://via.placeholder.com/150x50){:.pull-left}
Or on the left

And, finally, they are limited in height :

![](https://via.placeholder.com/300x1500)
