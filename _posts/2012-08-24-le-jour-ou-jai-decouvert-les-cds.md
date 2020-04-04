---
layout:      post
locale:      fr_FR
icon:        chart-increasing
title:       Le jour où j'ai découvert les CDS
banner_1_1:  
banner_2_1:  
banner_21_9: 
author:      loic
categories:  [finance]
tags:        [produit financier, cds, subprime]
---

Ce premier article sur la finance est aussi publié sur [Reflets.info](https://reflets.info/articles/le-jour-ou-j-ai-decouvert-les-cds){:target="_blank"}.
Il est toujours difficile de débuter dans un domaine dont on n'est pas spécialiste.
Mais je ne suis pas non plus totalement néophyte puisque j'ai choisi de travailler dans ce secteur, en tant que développeur, pour mieux le comprendre.
Ne pas se contenter des clichés véhiculés par les politiciens et les grands médias est pour moi essentiel.
En voyant comment il fonctionne, je comprends pourquoi certaines choses qui peuvent sembler absurdes existent.
C'est simplement que les acteurs jouent avec leurs propres règles, leurs propres outils et leurs propres objectifs ;
et il faut commencer par les comprendre si l'on souhaite trouver une solution.

## Qu'est-ce qu'un CDS ?

Les CD quoi ? Un CDS ([Credit Default Swap](https://www.fimarkets.com/pages/cds_credit_default_swap.php){:target="_blank"}) est un produit financier
qui sert d'assurance contre le risque de défaut (que quelqu'un ne puisse plus rembourser son prêt).
Le cas d'utilisation classique est : la banque A prête de l'argent à Paul et souhaite se prémunir contre le risque de défaut de paiement.
Pour cela, elle va acheter un CDS à un acteur financier C pour se couvrir contre ce risque.

Le CDS est un contrat établi pour une durée fixée à l'avance (5 ans par exemple) où l'acheteur (banque A) versera une prime annuelle (1000€ par exemple)
au vendeur (acteur financier C) jusqu'à la maturité (fin) du contrat. Si Paul ne fait pas défaut, rien d'autre ne se passe.
En revanche, si Paul fait défaut, l'acteur financier C dédommagera la banque A.
Le mécanisme est donc très peu complexe, le CDS joue simplement le rôle d'un contrat d'assurance pour les acteurs financiers.

Présenté de cette manière en toute objectivité, ce produit à l'air assez banal et on y trouverait rien à redire.
Si ce n'est quelques petits détails et subtilités...

## Un CDS, c'est dangereux ?

### Un contrat d'assurance, oui, mais pour quoi faire ?

S'il peut paraître normal de vouloir s'assurer contre un risque (on le fait tous pour sa voiture, sa maison...), on peut se demander si les banques,
elles aussi, doivent s'assurer contre des risques de défaut. Question naïve, mais pas sans intérêt.

Lorsqu'une banque accorde un prêt, elle doit s'assurer que l'emprunteur est bien solvable et qu'il le restera.
Sans quoi elle risque de ne jamais revoir l'argent prêté et devra combler le trou avec ses propres fonds.
C'est la raison pour laquelle les prêts demandent beaucoup de justificatifs et ne sont pas toujours facile à obtenir.
Si ce travail de vérification est bien fait quel est l'intérêt de s'assurer contre un risque de défaut?

Vous me direz qu'on ne peut jamais savoir et qu'un accident peut arriver et compromettre les remboursements.
Certes, mais cela n'est-il pas déjà inclut dans le taux du remboursement du prêt ?
Plus on est riche, plus le taux est faible car la probabilité de faire défaut est très faible.
A l'inverse, pour les plus précaires, un défaut de paiement peut vite arriver.
En conséquence, la banque augmente le taux de remboursement du prêt. Tous les clients paient un "supplément" en fonction de leur probabilité de défaut.
Pourquoi faire si ce n'est financer le défaut potentiel des autres? Le risque de défaut est donc calculé, mutualisé et intégré.
D'ailleurs, si le défaut n'existait pas, comment justifier des taux d'intérêt très élevés? Par les frais de gestion ? Par l'inflation ?
L'offre et la demande? Oui, aussi, mais il ne monterait jamais bien haut !
De plus, pourquoi y aurait-il des taux d'intérêts différents selon la situation de l'emprunteur ?
Du point de vue des banques, le défaut des clients est quelque chose qui doit être très rare mais qui est normal puisqu'il est intégré dans le calcul des taux.

Dans ces conditions (vérifications préalables + intégration du coût des défauts), il devient peu logique de vouloir s'assurer.
Et effectivement, en temps normal, les banques n'achètent pas de CDS pour les emprunts qu'elles accordent.
C'est le fonctionnement normal d'une banque qui prête.

Les CDS sont donc inutiles pour une activité bancaire normale. Nous verrons plus bas, pourquoi dans certains cas, ils deviennent utiles.

### Une assurance sans provision

Peut-être que ce n'est pas très intéressant d'acheter des CDS pour une banque, mais si elle trouve une contrepartie pour lui en vendre...
Après tout, c'est le principe de l'offre et de la demande.

Oui, mais les CDS n'auraient pas eu tant de succès s'il n'y avait pas eu ce tout petit détail : le CDS est un contrat non-financé.
Cela signifie que pour vendre un CDS, notre acteur financier C n'est pas obligé de posséder un fond de garantie (au cas où Paul fasse défaut).
Ainsi, le vendeur de CDS gagne de l'agent (le montant de la prime annuelle) sans investir aucun fond,
simplement en acceptant de supporter le risque (si celui-ci est faible, c'est vraiment tout bénéf).
Il est donc possible de vendre des CDS avec un compte en banque à 0€. Dans ce cas; il faut juste espérer que rien n'arrive !
C'est ce que moi j'appelle de l'argent gratuit. Bien sur, la limite à cela est que la banque vous fasse confiance pour la dédommager en cas de problème.
Mais comment douter de grandes institutions financières?

Il faut bien se rendre compte que c'est ce point précis qui rend le CDS extrêmement dangereux.
Tant que tout se passe bien, que la croissance est là, que le chômage est faible, que l'immobilier se porte bien...
Bref, tant que le risque ne se réalise pas, tout le monde y gagne (voire énormément),
c'est l'euphorie et surtout la course à qui vendra/achètera le plus de CDS.
En revanche, si la mécanique s'enraye et que les défauts de paiement commencent à s'accumuler, les CDS correspondants se déclenchent,
et même les grandes institutions financières ne peuvent plus faire face à leurs engagements et font faillite,
les banques n'étant plus couvertes, à cause de la faillite de leurs assureurs, font faillite à leur tour et tout s'écroule.
C'est vraiment dans cette non nécessité de prévoir un fond de garantie pour les vendeurs de CDS que se trouve tout le danger
car si ces fonds de garantie existaient, les institutions financières assumeraient leurs engagements et il n'y aurait aucun problème global.
Bien sûr, dans ce cas, le CDS serait beaucoup moins intéressant et il resterait très marginal. Mais est-ce un problème ?

A titre de comparaison, et pour mesurer l'impact des CDS, leur encours actuel (c'est à dire le montant des assurances à payer en cas de défaut)
est 11 fois supérieur au PIB mondial. Autant dire qu'aucune institutions financière, aussi importante soit-elle ne peut faire face à de tels engagements.
Leur seul salut, est d'attendre le terme des contrats en empochant la prime et en espérant que rien n'arrive... Prions, mes frères...

### Une assurance ça assure ?

Oui, mais non... Nous venons de le voir, un CDS est un contrat d'assurance pour lequel aucune provision en cas de déclenchement n'est nécessaire.
Ces contrats étant très attractifs pour les banques (voir leur utilisation plus bas), le sont-ils aussi pour les acteurs financiers ?
Eh bien oui, car ils permettent de gagner de l'argent gratuitement (aucun investissement), simplement en assurant un risque.
Mais comme je vous l'ai présenté, ce contrat s'établit entre une banque souhaitant se couvrir contre un risque
et un acteur financier acceptant de prendre le risque à la place de la banque.

Sauf que ces produits étant très peu réglementés, n'importe qui peut acheter un CDS sur ce qu'il souhaite. Quoi ? Hein ? Et oui !
Je n'ai pas fait de prêt à la Grèce (sous la forme d'achat d'obligations)
mais je peux très bien acheter un CDS pour me couvrir contre un risque de défaut de la Grèce. Mais c'est stupide !
Je n'ai aucun risque ! Oui, mais c'est possible. Et là, le CDS cesse d'être une assurance pour se couvrir contre un risque.
Il devient ainsi un produit spéculatif qui permet de parier pour ou contre la faillite de la Grèce (respectivement pour l'acheteur et le vendeur) !
Cynique vous avez dit ? Et ce d'autant plus que le taux des prêts de la Grèce en dépend !

Et voici l'effet de levier... Non seulement le CDS est extrêmement dangereux du fait de l'absence de provisions,
mais en plus il ne couvre même plus un risque, ce qui l'aurait circonscrit à ceux qui supportent ce risque.
Tout le monde se met donc à vendre et acheter ces CDS pour spéculer au gré des paris plus ou moins hasardeux sur la faillite ou non, d'une personne,
d'une société, d'un état... De là à imaginer que les délits d'initiés, les manipulations de cours et les actes de malveillances
envers ceux sur lesquels on a parié sur la faillite vont bon train... Il n'y a qu'un pas que je me garderais bien de franchir !

En regardant le montant délirant de l'encours des CDS, il y a donc fort à parier que ce ne sont pas des assurances
mais bien de la spéculation pour la majorité. Inutile, dangereux et spéculatif... Beau tableau non? Mais ce serait dommage de s'arrêter là.

### Un contrat sur mesure

Les CDS se négocient de gré à gré, c'est à dire à l'ancienne : on trouve une contrepartie et on marchande.
Ces contrats n'étant pas standards et très peu encadrés, on peut facilement imaginer toute sorte d'arnaques entre acteurs financiers plus ou moins bien informés.
Mais là n'est pas le problème (sauf si ils font faillite et entraînent du monde avec eux).
Comme je vous l'ai expliqué, les CDS se résument au paiement d'une prime de manière régulière en échange d'un dédommagement
au cas où une faillite ou un défaut se produise avant la maturité (fin de la période couverte par le contrat).
Mais ça, c'est le principe. Dans la pratique tout se négocie : la période couverte, le montant de la prime, le montant du dédommagement
et même la condition de déclenchement. Ce qui peut donner ça : je te verse 10 000€ par an pendant 5 ans en échange de quoi tu me verses 10 000 000€
si EDF change de patron. What? Quel rapport avec une assurance? C'est ce que je me suis dit aussi...
J'imagine qu'en réalité les contrats ne sont pas si extrêmes que ça (mais ça ne change rien du point de vu global de l'économie).

Donc, non seulement ces CDS ("assurances") sont probablement majoritairement spéculatifs, mais, en plus, avec ces négociations gré à gré,
c'est de la spéculation sans rapport avec l'objet sur lequel on spécule. Habituellement, avec des assurances normales,
on ne peut pas assurer sa voiture au delà de son prix, et encore moins assurer la voiture de son voisin.
Parce que le jour où c'est possible, j'assure ta voiture pour 10 000 000 000€, je lui mets le feu et je vais me dorer les pieds sur une plage
(tout étant légal sauf le fait de mettre le feu, ce pour quoi il suffit de ne pas se faire prendre ou de payer quelqu'un pour le faire). Absurde non ?

Et maintenant, vous en pensez quoi des CDS ?

## Comment ont réellement été utilisés les CDS ?

A quoi sert un CDS pour une banque ? Il a principalement 2 objectifs. Le premier, assez évident, est tout simplement de s'assurer contre le risque de défaut ;
mais comme on l'a vu cela n'a pas de sens. Sauf si la banque cherche à prêter au plus de personnes possible et ne fait donc pas les vérifications nécessaires ;
auquel cas elle aura réellement besoin de s'assurer. Le second est un peu moins évident.
Il faut savoir qu'une banque possède une limite au montant global de prêt qu'elle peut faire
(limite fixée par les fonds qu'elle possède, c'est à dire l'argent déposé chez elle par les particuliers et les entreprises).
Or en achetant un CDS, elle transfert le risque lié au prêt au vendeur du CDS ce qui lui permet de ne plus compter le prêt dans le montant global de ses prêts.
Elle peut donc en proposer de nouveaux sans devoir chercher de nouveaux déposants.

Le CDS permet donc à la banque d'accorder autant de prêts qu'elle le souhaite et de ne prendre aucun risque sur les risques de défaut de ses clients.
Autant dire que dans ce cas, les banques vont chercher à faire le plus de prêts possibles sans se demander si le prêt sera remboursé un jour.

C'est exactement ce qui s'est passé aux Etats-Unis avec les prêts subprimes. Et ce, d'autant plus que ces prêts étaient des prêts immobiliers.
En cas de défaut, la banque n'avait qu'à saisir le bien immobilier pour se rembourser
(le secteur immobilier était alors en pleine explosion et la valeur des bien augmentait rapidement).

## Oui, mais... Ça marche pas ton truc...

Au final, c'est bien beau pour la banque tout ça, mais le vendeur de CDS... Il devient quoi dans l'affaire ?
Parce que, à assurer des prêts pourris, c'est lui qui va finir par tout payer...
Dans ce cas, il ne vendra pas de CDS ou alors avec une prime payée par la banque très élevée et un remboursement très faible,
ce qui n'est plus intéressant pour la banque. En résumé, le CDS n'est donc rien d'autre qu'un transfert de responsabilité
de la banque vers les vendeurs de CDS qui auront alors la charge de vérifier quels prêts ils assurent et de n'assurer que les "bons"
(ouf, c'est pas trop n'importe quoi quand même!). Tout se remet à l'endroit et le système ne marche pas si mal finalement...

En effet! Mais c'est sans compter sur le CDO, autre produit financier qui permet de tout masquer derrière un gros nuage de fumée
(ce sera la sujet d'un [prochain article]({% post_url 2012-09-28-cdo-cupidite-dramatique-organisee %})).
Le "vendeur de CDS transformé en CDO" ne sait plus ce qu'il assure et doit donc s'en remettre
aux agences de notations (organismes chargés d'évaluer le risque de défaut) pour évaluer le risque qu'il prend en vendant son produit.
Or ces dernières avaient noté les produits issus de subprimes avec la note AAA (la plus élevée!).
Vous voyez le problème ? Les banques donnent du crédit à tout le monde, les acteurs financiers assurent tout sans avoir de fonds et au premier grain de sable...
Le château de sable s'écroule provoquant la crise financière de 2007 et toutes ses répercussions actuelles...

## Trouillomètre...

L'évolution des CDS pour certains titres comme les dettes souveraines a un intérêt. On peut le considérer comme un trouillomètre à peu près fiable
des investisseurs institutionnels. Si les CDS partent en flèche, c'est que probablement,
les "zinzins" croient à un défaut prochain et sont prêts à n'importe quoi pour se couvrir, ou presque.

C'est par exemple ce qui s'est passé pour les CDS liés à la dette grecque (ils sont passé de moins de 1000 points de base avant la "crise" à plus de 11.000).
Il faut toutefois garder à l'esprit que les CDS sont des produits particulièrement spéculatifs et que partant,
leur évolution peut être le fruit d'autre chose que du "trouillomètre", comme nous l'avons vu *supra*.

Pour autant, lorsque les vingt et quelques sommets-de-la-dernière-chance-pour-sauver-l'euro produisaient comme effet une amélioration du CAC 40
et autres indices actions, il fallait plutôt regarder ce que faisaient les CDS pour prévoir le "temps de vie" de l'effet du énième plan.
Soit, quelques jours ou quelques heures, pendant que de leur côté, les marchés actions faisaient mine de ne rien voir et progressaient plus longtemps.
