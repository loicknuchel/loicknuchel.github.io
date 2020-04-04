---
layout:      post
locale:      fr_FR
icon:        collision
title:       "CDO : Cupidité Dramatique Organisée"
banner_1_1:  
banner_2_1:  
banner_21_9: 
author:      loic
categories:  [finance]
tags:        [produit financier, cdo]
---

![Qui achète des CDOs](/assets/posts/2012/09/28/cdo_buyers.png){:.pull-right}
Comme promis, voici la suite de mon [article sur les CDS]({% post_url 2012-08-24-le-jour-ou-jai-decouvert-les-cds %}).
Je vous l’ai déjà annoncé, le CDO ([Collateralised Debt Obligation](https://fr.wikipedia.org/wiki/Collateralized_debt_obligations){:target="_blank"})
a eu un rôle très important dans la crise dans la mesure où il a permis de revendre des CDS pourris en masquant leur contenu.
Ça, c’est pour les effets qu’il a eu et que tout le monde lui reproche. Mais ce n’est pas son but premier ;
reprenons donc du début pour voir comment est créé un CDO.

## Le but premier du CDO

Comme la plupart des produits financiers, le CDO a été créé pour répondre à un besoin (des acteurs financiers, hein <i class="emoji smile"></i>).
Pour bien comprendre, il faut savoir qu’un des principaux aspects de la finance est d’assurer le risque à la place des autres
(et de se faire rémunérer pour ça). Or pour assurer un risque, il faut aussi pouvoir le maîtriser.
Et c’est précisément ici qu’entre en jeu le CDO.
Son rôle principal est de transformer le risque pour le revendre de manière plus spécifique et ciblée à des investisseurs.
Il est alors possible de revendre de manière séparée les parties les plus risquées (et très rémunératrices) à des fonds spéculatifs
([Hedge fund](https://fr.wikipedia.org/wiki/Gestion_alternative){:target="_blank"} par exemple) et les moins risquées à des investisseurs institutionnels
(fond de pension par exemple).

## La face technique du CDO

Transformer le risque d’un produit financier pour le rendre soit plus important soit moins important en fonction de la demande n’est pas une mince affaire...
Comment s’y prendre? Supposons que je possède 100 CDS identiques mais indépendants (hypothèse simplificatrice).
Ces CDS comportent un certain risque (qui dépend de la probabilité de déclenchement, du montant de la prime et du coût du dédommagement).
Pour échelonner les risques, il est possible de simplement regrouper tous les CDS au sein d’un même panier et les revendre par "ordre de défaut".
Ainsi le premier sera le [first-to-default](https://www.next-finance.net/First-To-Default-FTD){:target="_blank"}.
L’acquéreur de ce *first-to-default* sera en charge d’assurer le risque pour le premier CDS du panier qui fera défaut (peu importe lequel).
Autant dire que le risque est alors très élevé puisque si un seul des CDS (sur 100) se déclenche, il en assurera pleinement les conséquences.
Vient ensuite le second-to-default et ainsi de suite jusqu’à la fin de notre panier de CDS.
Avec ce mécanisme, nous venons de créer, à partir d’un ensemble de CDS identiques, un échelonnement de risques avec des produits extrêmement risqués
(*first-to-default*) et d’autres très peu risqués (*last-to-default*).
Habituellement, on distingue trois tranches dans un CDO en fonction de leur risque : la tranche *equity* (les 3% du début) qui est la plus risquée,
la tranche *mezzanine* (les 7% suivant) qui vient ensuite puis les tranches *senior* (les 20% d’après) et *super-senior* (le reste) qui sont les moins risquées.

Pour se donner une idée de l’échelonnement du risque, avec un CDO composé de 100 CDS ayant une probabilité p = 1% de se déclencher,
le *first-to-default* aura une probabilité de se déclencher de 1 – ((1-p)^100) = 63,4%
alors que le *last-to-default* aura lui une probabilité de p^100 = 10^-200 = 0.000...00001% (198 zéros à la suite)
(si la probabilité qu’un CDS se déclenche était de 95% le *last-to-default* aurait une probabilité de 0.6% de se déclencher).
On comprend donc facilement que les tranches hautes soient peu risquées même si le produit initial est très risqué.
C’est ce qui leur a permis, entre autre (voir plus bas), d’obtenir la meilleure
[notation financière](https://fr.wikipedia.org/wiki/Notation_financi%C3%A8re){:target="_blank"} : le AAA.

![Comment sont construits les CDOs](/assets/posts/2012/09/28/cdo_structure.jpg)

## Un CDO, c’est pas si compliqué alors !

Effectivement, le principe de répartition de risque est facilement compréhensible.
Ce qui est extrêmement complexe c’est d’une part de pricer (déterminer le prix) chaque tranche de CDO
et d’autre part d’évaluer le risque d’exposition lorsque l’on achète une partie d’un CDO en fonction de la rémunération qu’il rapporte.
Dans notre exemple, tous les produits étaient identiques et indépendants, le calcul est donc très simple.
Mais si chaque produit est différent, le calcul devient très complexe.
Ainsi, le risque de n’importe quelle tranche du CDO dépend directement de tous les produits contenus dans le CDO.
De plus, il faut tenir compte des effets de corrélation entre les produits.
La corrélation entre deux produits est la probabilité que si le premier se déclenche, le deuxième se déclenche aussi.
S’ils sont identiques les deux se déclencheront d’un coup. Il peut, en outre, y avoir des liens plus ou moins évidents
(si ce sont deux assurances sur des entreprises françaises, une crise française peut les affecter tous les deux).
Il est extrêmement difficile de déterminer les corrélations entre produits financiers.
Dans la pratique chaque banque établit de manière empirique un tableau de corrélation entre les grandes institutions,
les multinationales et des évènements pour en tirer des indices de corrélation
(étude historique et économique des acteurs et de leurs réactions vis à vis évènements).

## Le problème des CDO

Contrairement aux CDS, je pense qu’il est assez aisé de voir le problème que posent les CDO :
il est impossible de savoir précisément ce que l’on achète ou ce que l’on vend.
Il n’est pas toujours aisé de savoir ce que contient un produit financier, comment il se comporte et quels sont les risques qui lui sont liés,
alors imaginez si ce produit financier se retrouve parmi toute une gamme d’autres produits aussi complexes et différents...
C’est tout simplement impossible -que ce soit pour le vendeur ou pour l’acheteur !
Le seul repère que possède les acteurs financiers pour avoir une idée du risque qu’ils prennent est la note attribuée par les agences de notation.
Leur rôle est donc majeur dans cette affaire. Mais comme l’explique très bien Jean de Maillard dans son livre,
l’[Arnaque](http://archives.polemia.com/article.php?id=4018){:target="_blank"}, elles ne sont pas d’une objectivité à toute épreuve.
Extrait page 214 et suivantes :

> Or, la structuration des produits dérivés dépend entièrement de la façon dont ces produits sont notés.
> A tel point que les banques sollicitent les agences de notation comme « conseils » lors de la structuration de leurs titres,
> juste avant que les mêmes agences, qui ont participé à leur élaboration, ne leur attribuent une note.
> Autrement dit, le conflit d’intérêts est patent alors que, par ailleurs, il est souvent reproché aux agences de ne pas disposer
> de la capacité technique d’évaluer correctement les produits financiers forts complexes qui leur sont soumis.
> Mais le conflit d’intérêt est rarement puni. La seule forme sous laquelle on en retrouve une interdiction dans l’ensemble des pays
> est celle du "délit d’initié", mais il n’existe que dans les marchés boursiers.
> Dans les autres domaines, et notamment celui de la notation, il n’est qu’une indélicatesse ô combien répandue dans les milieux financiers.
>
> Comme le dit le très prudent, très consensuel et très financièrement correct "Rapport sur la crise financière" remis par René Ricol
> au président de la République en septembre 2008 :
> "Les principales erreurs reconnues par les agences elles-mêmes font ressortir un défaut de prise en compte de l’environnement dans les modèles de notation,
> une insuffisante adaptation de la notation des produits en fonction de leur évolution et une évolution des canaux de distribution des prêts
> où les particuliers n’étaient plus protégés par les banques centrales."
> Qu’en termes élégants ces choses-là sont dites ! En termes plus crus on se contentera de traduire que les particuliers sont abandonnés
> à tous les requins de la finance, derrière la mascarade des notations. De simples erreurs d’appréciation ?
> En tous cas, le rédacteur du rapport n’y a pas vu la malice bien qu’il relève lui-même juste après ce constat que 
> "les commissions payées pour la notation initiale sont calculées comme un pourcentage du montant émis et liées à la complexité de la transaction.
> Les commissions pour les produits financiers structurés sont donc conçues pour augmenter avec le montant des opérations ainsi qu’avec la fréquence
> des émissions. Ces commissions s’apparentent à des « success fees » car elles ne sont payées que si l’opération est réalisée."
> Faut-il le dire plus clairement ? Les agences de notation, dont dépendent entièrement l’émission et le volume des produits financiers dérivés,
> sont payées à la commission pour valider par charretées entières ces produits toxiques qui ont envahi toute la planète et auxquels
> elles ne comprennent elles-mêmes pas grand-chose. Plus ils sont compliqués, moins elles comprennent, mais mieux elles sont payées.

Que dire de plus ? Tout est fait pour que les plus toxiques des produits soient notés avec la meilleure note et que cette note soit le seul et unique repère.
D’autant plus que pour les spéculateurs, qui achètent et revendent à tours de bras, peu importe ce qu’ils achètent,
du moment que le cours des prix suit leurs prévisions (ils achèteront le sac de merde à 1 millions d’euros s’ils pensent pouvoir le revendre avec une marge !).

## Dans la pratique

On peut faire des CDO un peu tout et n’importe quoi et pour des [objectifs très variés](https://www.next-finance.net/Comment-marchent-les){:target="_blank"}.
Mais l’imagination des financiers ne s’arrête pas là ! Puisqu’il s’agit avant tout de spéculer,
il faut simplement trouver quelque chose, lui attribuer un prix, puis parier si celui-ci va monter ou descendre.
Peu importe si cet objet a un sens ou pas. C’est un peu comme ça que je comprends ce que sont
les [CDO synthétiques](https://www.pauljorion.com/blog/2010/07/26/goldman-sachs-aujourdhui-iv-se-refaire-le-cdo-synthetique){:target="_blank"} : des CDO de CDO.
L’incompréhension de ce qu’on achète est alors totale, mais qu’importe, seule compte la spéculation.

Cet article a aussi été publié sur [Reflets.info](https://reflets.info/articles/cdo-cupidite-dramatique-organisee){:target="_blank"}.
