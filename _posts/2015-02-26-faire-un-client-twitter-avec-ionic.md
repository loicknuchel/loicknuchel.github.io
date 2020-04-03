---
layout:      post
locale:      fr_FR
kind:        mobile
title:       Faire un client Twitter avec Ionic
banner_1_1:  /assets/posts/2015/02/26/faire-un-client-twitter-avec-ionic_1_1.jpg
banner_2_1:  /assets/posts/2015/02/26/faire-un-client-twitter-avec-ionic_2_1.jpg
banner_21_9: /assets/posts/2015/02/26/faire-un-client-twitter-avec-ionic_21_9.jpg
author:      loic
categories:  [tech, code]
tags:        [ionic framework, cordova, mobile, angular, tutorial]
---

Si vous avez lu mes précédents articles, vous savez maintenant que je suis plutôt fan de [Ionic](https://ionicframework.com){:target="_blank"}
et que ce framework permet de faire de bonnes applications très facilement et rapidement <i class="emoji smile"></i>

Je vous propose donc de faire le tour des composants Ionic en créant un client twitter.

C'est parti !

## Installation

Si vous ne l'avez pas déjà fait, installez [node.js](https://nodejs.org){:target="_blank"}. Puis Cordova et Ionic :

```console
$ sudo npm install -g cordova ionic
```

Vous pouvez maintenant créer un nouveau projet vide :

```console
$ ionic start twitter-app blank
```

et le lancer dans votre navigateur :

```console
$ cd twitter-app/ && ionic serve
```

Pensez à redimensionner votre navigateur aux dimensions d'un téléphone, par exemple 384x525 (Nexus 4).
Vous pouvez aussi visualiser les styles Android et iOS en simultané en utilisant l'option --lab : `ionic serve --lab`
(ou en ajoutant */ionic-lab* à la fin de votre url <i class="emoji wink"></i>).

Pour l'installer sur votre téléphone, il faudra installer le sdk
[Android](https://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/index.html#Android%20Platform%20Guide){:target="_blank"}
ou [iOS](https://cordova.apache.org/docs/en/3.3.0/guide/platforms/ios/index.html#iOS%20Platform%20Guide){:target="_blank"},
ajouter la plateforme souhaitée et compiler l'application :

```console
$ ionic platform add [android/ios]
$ ionic run [android/ios]
```

Si vous rencontrez des difficultés, n'hésitez pas à consulter le [Getting Started](https://ionicframework.com/getting-started){:target="_blank"} de Ionic,
laisser un commentaire ici ou aller faire un tour sur le [forum Ionic](https://forum.ionicframework.com){:target="_blank"}.

## Structure de l'application

Si vous regardez les fichiers générés par votre ligne de commande, vous trouverez :

- Un dossier **hooks/** : permet d'exécuter des tâches pendant le build cordova (usage avancé)
- Un dossier **platforms/** (si vous avez ajouté une plateforme) : il contient les fichiers générés par la compilation et notamment
le .apk pour Android (*platforms/android/ant-build/CordovaApp-debug.apk*)
- Un dossier **plugins/** : contenant les plugins cordova relatifs au projet
- Un dossier **scss/** : utilisé seulement si on active sass sur le projet
- Un dossier **www/** : qui contient tout le code de notre application
- Un fichier **config.xml** : qui permet de configurer cordova lors du build. Notamment, le nom de l'application et son package.

Dans le dossier **www/** vous trouverez la structure standard d'une application front-end et notamment le index.html qui est notre fichier principal.

## Etape 1 : Structurer un peu le projet

Pour partir du bon pied, mieux vaut avoir un projet un minimum structuré. Nous allons donc :

- Créer les fichiers qui nous manquent : *www/js/controllers.js*, *www/js/services.js* et *www/views/app.html*
- Inclure dans le fichier index.html les scripts créés (*controllers.js* et *services.js*)
- Remplacer tout le contenu de la balise `<body>` par une balise `<ion-nav-view></ion-nav-view>` (fichier *index.html*)
- Créer une première route dans le *app.js* (Ionic utilise [ui-router](https://github.com/angular-ui/ui-router){:target="_blank"}) avec son controlleur *AppCtrl*.

Dans *app.js* :

```js
.config(function($stateProvider, $urlRouterProvider){
  'use strict';
  $stateProvider
  .state('app', {
    url: '/app',
    templateUrl: 'views/app.html',
    controller: 'AppCtrl'
  });
  $urlRouterProvider.otherwise('/app');
})
```

Dans *controller.js* :

```js
angular.module('app')
.controller('AppCtrl', function(){
  'use strict';
  
});
```

J'en ai aussi profité pour supprimer quelques commentaires et changer le nom de l'application angular "starter" en "app".

L'application doit maintenant afficher une belle page blanche ! Si vous êtes un peu perdu, jetez un œil à
[mon code sur github](https://github.com/loicknuchel/blog-twitter-app/tree/d4379a92efe9bc1ab4f4228e175cbff04e420948){:target="_blank"} <i class="emoji smile"></i>

## Etape 2 : Créer une liste de twitts

Comme tout bon client twitter, il nous faut un feed de twitts. Pour cela nous allons créer un service qui nous renverra les twitts à afficher
(fake pour l'instant) puis le markup html nécessaire pour les afficher.

Dans *services.js* :

```js
angular.module('app')
.factory('TwittSrv', function($q, $timeout){
  'use strict';
  var twitts = [
    {user: {id: 'IonicFramework', name: 'ionic', avatar: 'https://pbs.twimg.com/profile_images/459365829348302849/lJ1X8rU9_bigger.png'}, content: 'We interviewed @gnomeontherun, author of the upcoming book @IonicinAction. Check it out: http://blog.ionic.io/ionic-in-action-book/', url: 'https://twitter.com/Ionicframework/status/569962126556708864'},
    {user: {id: 'IonicBE', name: 'Ionic Belgium', avatar: 'https://pbs.twimg.com/profile_images/554941644579954688/xxp8o3Cq_bigger.png'}, content: 'Venez prendre un verre et discuter de votre project @Ionicframework au Monk bar @ Bxl ce vendredi à 20h!', url: 'https://twitter.com/IonicBE/status/569787372650385408'},
    {user: {id: 'forum_hc', name: 'Human Coders Forum', avatar: 'https://pbs.twimg.com/profile_images/539837685481762816/cOO1F28S_bigger.png'}, content: 'Avez-vous testé Ionic Framework? https://forum.humancoders.com/t/avez-vous-teste-ionic-framework/1341/2', url: 'https://twitter.com/forum_hc/status/568806047051165696'},
    {user: {id: 'loicknuchel', name: 'loic knuchel', avatar: 'https://pbs.twimg.com/profile_images/3133057797/81ea4e63c7078eec0a7c7d6ae57a3ce1_bigger.jpeg'}, content: 'Slides de mon #BBL sur @Ionicframework : http://loic.knuchel.org/blog/2015/02/19/talk-introduction-a-ionic-bbl-19-02-2015/ #hybrid #mobile #app', url: 'https://twitter.com/loicknuchel/status/568449174926176256'},
    {user: {id: 'raymondcamden', name: 'Raymond Camden', avatar: 'https://pbs.twimg.com/profile_images/378800000568876933/2da22327d055cbf8e0502c3f22888fef_bigger.jpeg'}, content: 'Good list of @Ionicframework resources: https://github.com/Alexintosh/Awesome-Ionic', url: 'https://twitter.com/raymondcamden/status/568424487693082625'},
    {user: {id: 'nraboy', name: 'Nic Raboy', avatar: 'https://pbs.twimg.com/profile_images/2653730816/5da4d8fb72352c715bbaffe07e56270e_bigger.jpeg'}, content: 'Use the native device calendar in your Android and iOS @IonicFramework mobile app using #ngCordova. https://blog.nraboy.com/2015/02/using-native-device-calendar-ionic-framework/ #appdev RT', url: 'https://twitter.com/nraboy/status/568438200198258689'},
    {user: {id: 'devgirlFL', name: 'Holly Schinsky', avatar: 'https://pbs.twimg.com/profile_images/378800000664886768/5aa49c1cded0317a887cae28f5d80cd7_bigger.jpeg'}, content: 'What to expect in @Ionicframework 1.0: https://medium.com/@saniyusuf/looking-forward-to-ionic-v1-0-ionic-io-tools-6cb8e76e29c3 via @saniyusuf', url: 'https://twitter.com/devgirlFL/status/563673910424928256'},
    {user: {id: 'maxlynch', name: 'Max Lynch', avatar: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq_bigger.jpeg'}, content: 'Awesome new Ionic course from @GoThinkster "Mastering Ionic - Learn to Build & Deploy Native Speed HTML5 Based Apps" https://thinkster.io/ionic-framework-tutorial/', url: 'https://twitter.com/maxlynch/status/568097163131006976'},
    {user: {id: 'asdvaughan', name: 'Andrew Vaughan', avatar: 'https://pbs.twimg.com/profile_images/519532575031713792/Fm4zj2Zm_bigger.jpeg'}, content: 'Ionic Framework Demo - Matt Stauffer: https://www.youtube.com/watch?v=nh9EARpk-dc via @YouTube Great framework setup demo and api consumption!', url: 'https://twitter.com/asdvaughan/status/566103487281635328'}
  ];
 
  var service = {
    getTwitts: getTwitts
  };
 
  function getTwitts(){
    return $q.when(angular.copy(twitts));
  }
 
  return service;
});
```

Dans *controllers.js* :

```js
.controller('AppCtrl', function($scope, TwittSrv){
  'use strict';
  TwittSrv.getTwitts().then(function(twitts){
    $scope.twitts = twitts;
  });
});
```

Dans *app.html* :

```html
<ion-view>
  <ion-header-bar class="bar-calm">
    <h1 class="title">Timeline</h1>
  </ion-header-bar>
  <ion-content>
    <div class="list">
      <a class="item item-avatar" href="#" ng-repeat="twitt in twitts">
        <img ng-src="{{twitt.user.avatar}}">
        <h2>{{twitt.user.name}}</h2>
        <p>{{twitt.content}}</p>
      </a>
    </div>
  </ion-content>
</ion-view>
```

![Résultat de l'étape 2](/assets/posts/2015/02/26/step2.png){:.pull-right}
Dans la partie JavaScript, rien de bien étonnant pour qui connaît un peu Angular.
On crée un service avec une fonction (*getTwitts()*) qui renvoie un tableau de twitts dans une promise (ce sera asynchrone par la suite...).<br>
<br>
Le contrôleur utilise le service pour récupérer les twitts et les mettre dans le *$scope*
(celui-ci est disponible dans la vue liée au contrôleur, ci qui nous permettra d'accéder aux twitts dans le HTML).<br>
<br>
Dans la vue, nous utilisons plusieurs directives angular issues de Ionic.
Tout d'abord le `<ion-view>` ([doc](http://ionicframework.com/docs/api/directive/ionView){:target="_blank"}) qui définit une "vue".
C'est dans cette vue que nous pourrons placer nos éléments.
Ensuite, le `<ion-header-bar>` ([doc](https://ionicframework.com/docs/api/header){:target="_blank"}) définit un header,
celui-ci en fixé en haut de l'application et peut comporter des boutons d'action.
Enfin, le `<ion-content>` ([doc](https://ionicframework.com/docs/api/content){:target="_blank"}) est le contenu principal de la vue.
Celui-ci est scrollable et prend toute la hauteur restante de la vue.<br>
<br>
Pour notre liste de twitts, Ionic propose différentes [classes permettant de créer des listes](https://ionicframework.com/docs/api/list){:target="_blank"}
avec un style proche du natif, il suffit donc simplement de mettre les bonnes classes CSS (list, item, item-avatar).

Pas mal non ?

Si vous êtes perdu, passez voir [github](https://github.com/loicknuchel/blog-twitter-app/tree/f7c31e0dfdd63959fcc10a82b57409df97e9decd){:target="_blank"} <i class="emoji wink"></i>

## Etape 3 : Récupérer plus de twitts

![Résultat de l'étape 3](/assets/posts/2015/02/26/step3.png){:.pull-left}
Bon, afficher une liste de twitts c'est bien, mais on voudrait aussi pouvoir lire les nouveaux twitts et les twitts passés...
Heureusement, Ionic nous fournit deux directives pour ça : `<ion-refresher>` ([doc](https://ionicframework.com/docs/api/refresher){:target="_blank"})
et `<ion-infinite-scroll>` ([doc](https://ionicframework.com/docs/api/infinite-scroll){:target="_blank"}). Voyons comment les utiliser...<br>
<br>
Commençons par le pull-to-refresh :<br>
<br>
On ajoute la fonction *getNewTwitts()* dans le service *TwittSrv* pour récupérer les nouveaux twitts. Cette fonction renverra, pour le moment,
seulement un tableau de 1 twitt aléatoire au bout de 500 milli-secondes. Ne pas oublier d'ajouter $timeout comme dépendance au service
et de rajouter la nouvelle fonction dans l'objet retourné par le service (pour qu'elle soit accessible par le contrôleur).

Dans *services.js* :

```js
function getNewTwitts(){
  var defer = $q.defer();
  $timeout(function(){
    var newTwitt = angular.copy(twitts[Math.floor(Math.random()*twitts.length)]);
    defer.resolve([newTwitt]);
  }, 500);
  return defer.promise;
}
```

On ajoute ensuite une fonction *doRefresh()* au contrôleur qui permettra d'ajouter les nouveaux twitts dans le DOM. Dans *controller.js* :

```js
$scope.doRefresh = function(){
  TwittSrv.getNewTwitts().then(function(newTwitts){
    $scope.twitts = newTwitts.concat($scope.twitts);
  }).finally(function() {
    // Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  });
};
```

Cette fonction récupère simplement les nouveaux twitts et les ajoute au début du tableau de twitts.
A noter qu'il faut envoyer l'événement '*scroll.refreshComplete*' lorsque l'on a terminé pour que le loader disparaisse.

Et enfin, on ajoute tout simplement la directive `<ion-refresher>` au dessus de sa liste dans *app.html* :

```html
<ion-refresher pulling-text="Pull to refresh..." on-refresh="doRefresh()"></ion-refresher>
```

C'est elle qui fait tout le job ! C'est pas beau ça ???

Pour la fonction infinite-scroll, les choses sont très similaires dans *services.js* :

```js
function getMoreTwitts(){
  var defer = $q.defer();
  $timeout(function(){
    var newTwitts = [];
    for(var i=0; i<5; i++){
      newTwitts.push(angular.copy(twitts[Math.floor(Math.random()*twitts.length)]));
    }
    defer.resolve(newTwitts);
  }, 500);
  return defer.promise;
}
```

Et dans *controllers.js* :

```js
$scope.loadMore = function(){
  TwittSrv.getMoreTwitts().then(function(olderTwitts){
    $scope.twitts = $scope.twitts.concat(olderTwitts);
  }).finally(function() {
    // Stop the ion-infinite-scroll from spinning
    $scope.$broadcast('scroll.infiniteScrollComplete');
  });
};
```

Le `<ion-infinite-scroll>` est à ajouter en fin de liste dans *app.html*.
Lorsqu'on arrive en bas, la fonction *loadMore()* sera appelée pour charger des twitts plus anciens.

```html
<ion-infinite-scroll on-infinite="loadMore()" distance="1%"></ion-infinite-scroll>
```

On vient donc de créer en quelques lignes, une liste infinie avec un pull-to-refresh. Heureusement qu'il y a Ionic pour ça <i class="emoji wink"></i>

Le code de cette étape est une fois de plus accessible sur
[github](https://github.com/loicknuchel/blog-twitter-app/tree/2478140d7e38116c7ec66432b57f9c5bab2d6e29){:target="_blank"} si nécessaire.

Voici l'[application android générée](/assets/posts/2015/02/26/ionic-twitter-app-step1.apk) et son aperçu actuel :

<div style="position: relative; margin-bottom: 20px;">
    <img src="http://ionicframework.com/img/phone-case.png" 
         alt="Phone background" 
         style="max-height: none;">
    <iframe
        src="http://codepen.io/loicknuchel/full/emKjZx"
        style="width: 328px; height: 576px; border: none; position: absolute; top: 100px; left: 50%; margin-left: -164px;"></iframe>
</div>

Je vais m'arrêter là pour ce premier article.
Vous pourrez bientôt [lire la suite]({% post_url 2015-03-05-faire-un-client-twitter-avec-ionic-partie-2 %}) et découvrir un peu plus Ionic...
Stay tuned !
