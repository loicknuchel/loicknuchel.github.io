---
layout:      post
locale:      fr_FR
icon:        gem-stone
title:       Découvrir Ionic Framework
banner_1_1:  /assets/posts/2015/01/26/decouvrir-ionic-framework_1_1.jpg
banner_2_1:  /assets/posts/2015/01/26/decouvrir-ionic-framework_2_1.jpg
banner_21_9: /assets/posts/2015/01/26/decouvrir-ionic-framework_21_9.jpg
banner_3_1:  /assets/posts/2015/01/26/decouvrir-ionic-framework_3_1.jpg
author:      loic
categories:  [tech]
tags:        [ionic framework, cordova, mobile, angular]
---

![Ionic list](/assets/posts/2015/01/26/ionic_list.png){:.pull-right}
Un an sans aucun article <i class="emoji sad"></i> C'est plutôt long mais c'est ce qui arrive lorsque l'on monte sa startup...
Je profite donc d'un moment de calme pour vous présenter le framework que j'ai le plus utilisé en 2014 : [Ionic Framework](https://ionicframework.com){:target="_blank"}.<br>
<br>
J'ai commencé à l'utiliser dès les débuts de l'alpha, uniquement pour faire un prototype rapide de mon application au début, mais j'ai été impressionné par la rapidité,
la facilité et la qualité des applications produites et ai finalement décidé de le garder comme framework mobile pour les différentes applications sur lesquelles je travaille.<br>
<br>
Pour ceux qui ne connaîtraient pas Ionic, c'est un framework d'UI basé sur AngularJS pour faciliter le développement d'applications mobiles hybrides (basées sur Cordova).
Ils proposent un ensemble de [styles et de directives](https://ionicframework.com/docs/components){:target="_blank"} pour avoir une application proche des styles natifs.
J'ai l'habitude de dire que c'est un peu le bootstrap pour les applications mobiles <i class="emoji smile"></i> Mais Ionic, c'est bien plus que ça, c'est aussi un écosystème complet
(et qui ne cesse de grandir) pour faciliter le développement des applications cordova :

- [CLI](https://blog.ionicframework.com/live-reload-all-things-ionic-cli/){:target="_blank"} : Ionic a sa propre interface en ligne de commande qui s'appuie sur Cordova.
Autant, je trouvais ça un peu "too much" au début, mais depuis les différents ajouts, je trouve qu'elle amène vraiment une simplification du développement
- [Génération automatique d'icones et splash screens](https://blog.ionicframework.com/automating-icons-and-splash-screens/){:target="_blank"} intégrée à la CLI
- L'[intégration de Crosswalk](https://blog.ionicframework.com/crosswalk-comes-to-ionic/){:target="_blank"} à la CLI
- [ngCordova](https://blog.ionicframework.com/moving-forward-with-ngcordova/){:target="_blank"} qui permet d'intégrer plus facilement les plugins Cordova avec AngularJS
- [Ionic Creator](https://blog.ionicframework.com/ionic-creator/){:target="_blank"} : pour dessiner rapidement ses interfaces en drag'n drop et télécharger le projet tout prêt
- [Ionic Lab](https://blog.ionicframework.com/ionic-lab/){:target="_blank"} : pour visualiser sur une seule page, les styles Android et iOS de votre application
- [Ionic View App](https://blog.ionicframework.com/view-app-is-alive/){:target="_blank"} : qui permet d'uploader et partager son application avec d'autres personnes
- Et bien plus à venir : BaaS, Build

Pour avoir quelques exemples de ce qui est faisable avec Ionic, vous pouvez consulter leur [CodePen public](https://codepen.io/ionic/pens/public/?grid_type=list){:target="_blank"}
ainsi que les [applications construites avec Ionic](https://showcase.ionicframework.com/apps/top){:target="_blank"} qu'ils mettent en avant.

## Le renouveau des applications hybrides

![Ionic card](/assets/posts/2015/01/26/ionic_card.png){:.pull-left}
Cordova n'est pas une nouvelle technologie. Elle a vu le jour en 2009 et en 2011 je connaissais des personnes qui développaient déjà avec.
Autant dire qu'à l'échelle du mobile, cette plateforme a toujours été présente (la sortie d'Android 2.3 date de 2010 !).<br>
<br>
Cependant, la technologie est toujours restée relativement confidentielle, à la fois parce que les téléphones n'était pas assez puissants
(sans parler de leur navigateur très peu performant), mais aussi parce que l'écosystème d'outils autour de Cordova n'était pas très développé
et que le marché n'en était encore qu'à ses débuts.<br>
<br>
Aujourd'hui, les téléphones et leurs navigateurs deviennent relativement puissants, surtout depuis le passage à Chrome par défaut depuis Android 4.4.
Toutes les sociétés veulent leur application mobile, une proportion importantes de startups sont mobile first et
on commence seulement à voir émerger les nouveaux usages mobiles... En conjonction de tout ça, l'équipe de Drifty a publié Ionic Framework
avec un certain nombre d'outils pour faciliter le développement Cordova; ce qui a attiré de nombreux développeurs et a fait énormément mûrir l'écosystème hybride.

Mon point de vue est que même s'il faudra encore probablement 6 mois à 1 an pour que le développement hybride devienne réellement mâture,
l'arrivée de Ionic a provoqué un nouvel afflux de développeurs et un regain d'intérêt sur ces technologies qui, selon moi, ne sont plus des choix de second rang.
Bien sûr, tout spécialiste pourra voir les différences avec une application native et les grands du web ne pourront pas se permettre ces désagréments minimes
mais pour la plupart des utilisateurs, peu avertis, la qualité est largement suffisante !

Bref, je ne peux que vous recommander d'y jeter au moins un œil si vous envisagez du développement mobile <i class="emoji happy"></i>
