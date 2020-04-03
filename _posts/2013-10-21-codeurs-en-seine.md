---
layout:      post
locale:      fr_FR
kind:        event
title:       Codeurs en Seine 2013
banner_1_1:  /assets/posts/2013/10/21/codeurs-en-seine_1_1.jpg
banner_2_1:  /assets/posts/2013/10/21/codeurs-en-seine_2_1.jpg
banner_21_9: /assets/posts/2013/10/21/codeurs-en-seine_21_9.jpg
author:      loic
categories:  [tech, event]
tags:        [codeurs en seine, continuous delivery, design, lean startup, software craftsmanship]
---

Jeudi 17 octobre, 5h15, mon réveil sonne. C'est le début d'une longue et passionnante journée à [Codeurs en Seine 2013](https://gospeak.io/events/ext/cfc9785a-50ca-4644-8f2f-43a9ce92b9cb){:target="_blank"} !

Pour ceux qui n'ont pas entendu parler de l'événement, Codeurs en Seine est la première édition de l'événement organisé par
[Normandie Web Xperts](https://www.nwx.fr){:target="_blank"}, [NormandyJUG](https://twitter.com/normandyjug){:target="_blank"}
et le [Normandy Agile User Group](https://twitter.com/normandyagile){:target="_blank"}. L'événement est **gratuit (!!!)** et se déroule sur une journée à Rouen.
Chacune des communautés organisatrice est responsable d'une track pour la journée : Web - Agile - Java. Bref, pile dans mes centres d'intérêts !
Impossible donc de la louper, et c'est bien sans regret que je mets mon réveil aussi tôt.

D'une manière générale, la journée a été une grosse réussite et je tiens vraiment à féliciter les organisateurs pour la qualité de l'événement.
Aussi bien du côté logistique (aucun accro, timing parfait, repas impressionnant) que du côté des conférences.
Tout le monde avait l'air vraiment ravi et l'ambiance était des plus agréables.

Du côté des confs, après une présentation des organisateurs et de l'organisation de l'événement il y a eu
la keynote d'ouverture de Pierre Pezziardi ([@ppezziardi](https://twitter.com/ppezziardi){:target="_blank"}) qui a été, pour moi, le moment fort de la journée.
Mais je ne vous en dit pas plus car je compte y consacrer un article à part. Ensuite, les 3 tracks se déroulaient en parallèle et avec des thèmes finalement assez différents.

## Points forts de la journée


![Persuasive design par Laurent Demontiers](/assets/posts/2013/10/21/persuavive-design.jpg){:.pull-right}
J'ai commencé par la conférence de **Laurent Demontiers** ([@L_Demontiers](https://twitter.com/L_Demontiers){:target="_blank"}) sur le **persuasive design** (slides).
L'idée derrière tout ça est : "comment influencer le comportement des utilisateurs ?". Il en est ressorti qu'il faut engager l'utilisateur en lui faisant effectuer
de petites actions pour le faire passer par les différents niveaux d'engagement : découverte, engagement superficiel puis engagement réel. Ça m'a tout de suite fait penser au
[Petit traité de manipulation à l'usage des honnêtes gens](https://des-livres-pour-changer-de-vie.com/petit-traite-de-manipulation-a-lusage-des-honnetes-gens){:target="_blank"}
et ça n'a pas manqué. Nous avons parlé de l'effet de gel et du pied dans la porte. Donner le choix à l'utilisateur lui permet de s'engager d'autant plus
qu'il effectue *librement* une action consciente, comme part exemple choisir quels échantillons gratuits recevoir.
Après un panorama très intéressant des techniques et leviers possibles à utiliser, Laurent termine sa conférence sur l'importance de l'éthique
et la différence entre persuasion et manipulation. Quand on touche à ces sujets, c'est toujours nécessaire !
Bref, très bonne session, à la fois divertissante et riche en enseignements.

Après un passage à la session **Lean Startup** de **Matthieu Garde-Lebreton** ([@MatthieuGarde](https://twitter.com/MatthieuGarde){:target="_blank"}),
qui était très bien mais relativement proche du livre d'Eric Ries, je suis allé voir **Frédéric Menou** ([@ptit_fred](https://twitter.com/ptit_fred){:target="_blank"})
sur le **Continuous delivery chez capitaine-train.com** ([slides](https://fr.slideshare.net/ptit-fred/livraison-continue-chez-capitaine-train-codeurs-en-seine){:target="_blank"}).
J'en ai principalement retenu qu'il n'y a pas vraiment de méthode standard et que c'est beaucoup d'automatisation à coup de scripts maison.
L'objectif est d'avoir *0-downtime* pour une livraison puisque, comme chez capitaine-train, il peut y en avoir plusieurs par jour.
L'objectif est de transformer les étapes de livraison en routine, de sorte que toutes les étapes soient faciles.
Pour en arriver là, il est nécessaire de diviser les lots et livrer les fonctionnalités en plusieurs fois si elles sont conséquentes.
Les problèmes surviennent lors des évolutions de base de donnée où là, il faut d'abord livrer un code capable de prendre en compte les deux versions de la base,
puis modifier la base et ensuite livrer un nettoyage du code pour ne plus prendre en compte l'ancienne version.
C'est d'ailleurs très bien développé dans un [article d'OCTO](https://blog.octo.com/zero-downtime-deployment){:target="_blank"} où sont expliqués les concepts de
*canary release* et de *dark launch*. En résumé, il faut lentement faire évoluer ses process pour réduire la taille des lots et automatiser la livraison.

Je suis ensuite allé voir **David Gageot** ([@dgageot](https://twitter.com/dgageot){:target="_blank"}) pour sa session de **live coding**.
Suite à un changement de programme il nous a fait sa présentation "**Du Legacy au Cloud en moins d'une heure**" qui est réellement très impressionnante.
Pour ceux qui n'ont pas encore eu l'occasion d'y assister (à Codeurs en Seine ou à un [BBL](http://www.brownbaglunch.fr/baggers.html#david-gageot){:target="_blank"}),
je vous la recommande très fortement ! Personnellement j'y avais déjà assisté mais j'ai encore appris beaucoup de choses.
David passe en revue différentes techniques de refactoring et surtout les pièges à éviter. Contrairement à ce qu'on pourrait penser,
il commence par augmenter la duplication de code, par rechercher les symétries, par rendre identique le code similaire et par simplifier les conditions,
avant d'extraire et de chercher à simplifier le tout en créant de nouvelles méthodes/classes.
Tout cela se fait bien entendu sous le contrôle des tests unitaires construits pour tester l'ancienne classe avec la nouvelle.
Ce live coding a été pour moi beaucoup plus parlant que de nombreux articles sur le sujet car on voit bien le cheminement, les pièges et les bonnes pratiques.
Une fois de plus, si vous n'avez pu y assister, je vous le recommande fortement !

J'ai enchaîné sur la présentation **Real options** ([slides](https://www.agilecoach.net/coach-tools/real-options){:target="_blank"})
de **Pascal Van Cauwenberghe** qui nous explique comment (ne pas) prendre de décisions. Au travers de 3 histoires (retours d'expérience de projets),
il nous montre comment retarder les moments de prise de décision et les anticiper au mieux. A l'aide d'un comparatif Valeur / coût du retard / prix / date de décision,
il est alors bien plus facile de savoir quelle option choisir et surtout quand choisir.
Et contrairement à ce qu'on imagine habituellement, les tâches difficiles et incertaines doivent être exécutées le plus tard possible,
lorsque l'on est en possession du maximum d'informations et d'expérience sur le projet.
Cette technique peut nous sembler du bon sens mais est très utile pour rationaliser nos choix lorsque nous sommes sous pression.

![Software craftsmanship par Jean Laurent de Morlhon](/assets/posts/2013/10/21/software-craftsmanship.jpg){:.pull-left}
Enfin, pour la dernière session de la journée j'ai assisté à la présentation de **Jean Laurent de Morlhon** ([@morlhon](https://twitter.com/morlhon){:target="_blank"})
sur le **Software craftsmanship** qui a été une de mes préférées (après l'introduction de Pierre Pezziardi).
Malgré son nom tout à fait imprononçable, ce mouvement est aussi intéressant que difficile à définir.
Il regroupe des personnes qui mettent en avant la qualité du code et cherche à remettre la qualité technique au même niveau que les process.
Le logiciel ne doit pas seulement fonctionner, il doit aussi être bien écrit et être maintenable.
Un cratfsman cherche à s'améliorer mais aussi à échanger et transmettre ses bonnes pratiques. Il est donc au sein d'une communauté de personnes ayant les mêmes buts.
Ces principes sont décrits dans le [manifesto for software craftsmanship](http://manifesto.softwarecraftsmanship.org){:target="_blank"}.
Jean Laurent a aussi évoqué dans son intervention le rôle du développeur et comment celui-ci est en train de se transformer avec les mouvements agile et devops.
Pour un peu plus de détails, je vous conseil son [article de 2011](https://blog.engineering.publicissapient.fr/2011/01/31/software-craftsmanship-en-pratique){:target="_blank"} sur le sujet.

## Conclusion

Si vous en voulez un peu plus, je vous conseille les [retours de Nicolas Martignole](http://www.touilleur-express.fr/2013/10/18/codeurs-en-seine-2013){:target="_blank"}.
Certaines sessions ont été [filmées par InfoQFR](https://www.infoq.com/fr/codeur-en-seine-2013), .






