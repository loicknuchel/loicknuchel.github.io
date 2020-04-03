---
layout:      post
locale:      fr_FR
icon:        rocket
title:       Faire un client Twitter avec Ionic - partie 2
banner_1_1:  /assets/posts/2015/03/05/faire-un-client-twitter-avec-ionic-partie-2_1_1.jpg
banner_2_1:  /assets/posts/2015/03/05/faire-un-client-twitter-avec-ionic-partie-2_2_1.jpg
banner_21_9: /assets/posts/2015/03/05/faire-un-client-twitter-avec-ionic-partie-2_21_9.jpg
author:      loic
categories:  [tech, code]
tags:        [ionic framework, cordova, mobile, angular, tutorial]
---

Visiblement la [première partie]({% post_url 2015-02-26-faire-un-client-twitter-avec-ionic %}) vous a plu, alors on continue !

## Etape 4 : Publier un twitt

On va maintenant vouloir créer ses propre twitts. Pour cela je vous propose d'utiliser un modal ([doc](https://ionicframework.com/docs/api/modal){:target="_blank"}).
Mais commençons par le début. Pour twitter, il nous faut un compte. Nous allons donc créer un service qui nous renverra l'utilisateur actuel dans *services.js* :

```js
.factory('UserSrv', function($q){
  'use strict';
  var service = {
    getUser: function(){
      return $q.when({id: 'loicknuchel', name: 'Loïc Knuchel', avatar: 'https://pbs.twimg.com/profile_images/3133057797/81ea4e63c7078eec0a7c7d6ae57a3ce1_bigger.jpeg'});
    }
  };
 
  return service;
})
```

Une fois de plus on mock les données pour avoir juste ce qu'il nous faut et avancer.

Ensuite, notre *TwittSrv* doit implémenter une nouvelle fonction : *sendTwitt(twitt)*.
Rien de plus simple, il suffit d'ajouter dans *services.js* :

```js
function sendTwitt(twitt){
  var defer = $q.defer();
  $timeout(function(){
    var newTwitt = angular.copy(twitt);
    UserSrv.getUser().then(function(user){
      newTwitt.user = user;
      defer.resolve(newTwitt);
    });
  }, 1000);
  return defer.promise;
}
```

Ici on prend le twitt créé par l'utilisation (il y a uniquement le contenu), on lui rajoute l'utilisateur actuel et on le renvoie.
Dans une application réelle, on enverrait tout simplement ces données à twitter et lui nous renverrait le twitt créé.
Bien sûr il ne faut pas oublier de 1/ déclarer cette fonction dans le service et 2/ ajouter le *UserSrv* en dépendance de notre service *TwittSrv*
(tout comme *$q* et *$timeout*). Voilà pour la partie "backend" <i class="emoji smile"></i>

Pour créer un Modal avec Ionic, il nous fait faire appel à un service particulier : *$ionicModal*.
Il y aura 3 actions en lien avec le modal : l'ouvrir (pour écrire un nouveau twitt), le fermer (si on ne veut plus twitter) et le fermer en envoyant le twitt rédigé.
On ajoute donc à *controllers.js* :

```js
var newTwittModal = null;
$ionicModal.fromTemplateUrl('views/partials/new-twitt-modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal){
  newTwittModal = modal;
});
$scope.writeTwitt = function(){
  newTwittModal.show();
};
$scope.cancelWriteTwitt = function(){
  newTwittModal.hide();
};
$scope.sendTwitt = function(twitt){
  newTwittModal.hide();
  TwittSrv.sendTwitt(twitt).then(function(newTwitt){
    $scope.twitts.unshift(newTwitt);
    twitt.content = '';
  });
};
 
//Cleanup the modal when we're done with it!
$scope.$on('$destroy', function(){
  newTwittModal.remove();
});
```

Le modal sera créé à partir d'un template de vue (qu'on créera juste après) et on lui passe le scope afin qu'il puisse communiquer avec le contrôleur.
On stocke l'objet retourné afin de pouvoir agir dessus (*show()* et *hide()* notamment). Le reste du code est relativement simple.
A noter simplement qu'il faut bien supprimer le modal lorsqu'on ne souhaite plus l'utiliser (lorsque le contrôleur est détruit par exemple).
Ici encore, n'oubliez pas d'ajouter *$ionicModal* comme dépendance du contrôleur.

Le template du modal est une simple vue mais avec la directive `<ion-modal-view>`. On crée donc *views/partials/new-twitt-modal.html* :

```html
<ion-modal-view>
  <ion-header-bar class="bar-calm">
    <h1 class="title">Send twitt</h1>
    <button class="button button-clear button-primary" ng-click="cancelWriteTwitt()">Cancel</button>
  </ion-header-bar>
  <ion-content>
    <div class="list">
      <label class="item item-input item-floating-label">
        <small class="counter" ng-class="{assertive: twitt.content.length > 140, muted: !(twitt.content.length > 140)}">{%raw%}{{140-twitt.content.length}}{%endraw%}</small>
        <span class="input-label">What's new ?</span>
        <textarea rows="5" placeholder="What's new ?" ng-model="twitt.content"></textarea>
      </label>
    </div>
    <div class="padding">
      <button class="button button-full button-calm" ng-click="sendTwitt(twitt)" ng-disabled="twitt.content.length > 140">Twitt</button>
    </div>
  </ion-content>
</ion-modal-view>
```

Ici, pas grand chose de nouveau. Les boutons avant le titre du header se retrouvent à gauche et ceux après se retrouvent à droite.
Pour les formulaires, Ionic propose pas mal de [styles de champs](https://ionicframework.com/docs/components){:target="_blank"}.
On va maintenant simplement ajouter quelques styles à notre compter de caractère :

```css
.counter {
  float: right;
  margin-right: 16px;
}
.muted {
  color: #ccc;
}
```

Bien sûr, toujours aucun moyen de créer un nouveau twitt depuis l'application, corrigeons ça avec un bouton dans le header de *views/app.html* :

```html
<div class="buttons">
  <button class="button button-icon ion-plus" ng-click="writeTwitt()"></button>
</div>
```

Il suffit de le mettre juste après le titre de la vue principale (pour avoir le bouton affiché à droite).

Voir le code de cette étape sur [github](https://github.com/loicknuchel/blog-twitter-app/tree/eb051d54f2fbf797a5d476b61e180eaf4fae8791){:target="_blank"}.

## Etape 5 : Navigation avec des onglets (tabs)

L'application commence à être fonctionnelle mais si on veut rajouter de nouvelles choses il va falloir mettre en place une navigation un peu mieux.
Il y a, en général, il y a deux options pour la navigation principale : des onglets ou un menu de côté. Commençons par les onglets, comme sur l'application twitter officielle.

Avec Ionic, les tabs ([doc](https://ionicframework.com/docs/api/tabs){:target="_blank"}) fonctionnent avec une vue parente qui définit les tabs, et des vues enfants.
Grâce à *ui-router*, il sera très simple de définir ce type de routes dans *app.js* :

```js
.config(function($stateProvider, $urlRouterProvider){
  'use strict';
  $stateProvider
  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'views/tabs.html',
    controller: 'TabsCtrl'
  })
  .state('tabs.twitts', {
    url: '/twitts',
    views: {
      'twitts-tab': {
        templateUrl: 'views/twitts.html',
        controller: 'TwittsCtrl'
      }
    }
  })
  .state('tabs.notifications', {
    url: '/notifications',
    views: {
      'notifications-tab': {
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsCtrl'
      }
    }
  })
  .state('tabs.profil', {
    url: '/profil',
    views: {
      'profil-tab': {
        templateUrl: 'views/profil.html',
        controller: 'ProfilCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/tabs/twitts');
})
```

Comme vous pouvez le constater, on possède maintenant un état parent (*tabs*) et des états fils (*tabs.twitts*, *tabs.notifications*, *tabs.profil*).
Notre état parent est défini comme abstrait pour qu'on ne puisse pas y accéder (ça n'aurais pas vraiment de sens...).
Chaque état fils a son propre contrôleur avec sa propre vue.
Notez aussi que chaque état fils doit spécifier dans quelle sous-vue il doit être injecté (*twitts-tab*, *notifications-tab* ou *profil-tab*).
Ces noms doivent correspondre à ceux qu'on a fixés dans notre vue *tabs.html*. D'ailleurs, puisqu'on en parle, la voici :

```html
<ion-tabs class="tabs-striped tabs-top tabs-color-calm">
  <ion-tab title="Timeline" icon-on="ion-social-twitter" icon-off="ion-social-twitter-outline" ui-sref="tabs.twitts">
    <ion-nav-view name="twitts-tab"></ion-nav-view>
  </ion-tab>
 
  <ion-tab title="Notifications" icon-on="ion-ios7-bell" icon-off="ion-ios7-bell-outline" ui-sref="tabs.notifications">
    <ion-nav-view name="notifications-tab"></ion-nav-view>
  </ion-tab>
 
  <ion-tab title="Profil" icon-on="ion-ios7-person" icon-off="ion-ios7-person-outline" ui-sref="tabs.profil">
    <ion-nav-view name="profil-tab"></ion-nav-view>
  </ion-tab>
</ion-tabs>
```

Encore une fois, les directives Ionic nous rendent vraiment la vie plus facile !
Le `<ion-tabs>` permet d'indiquer qu'on souhaite utiliser des tabs et de les configurer. Ensuite, chaque `<ion-tab>` correspond à une tab.
On leur définit un nom (title), les icônes à utiliser (en fonction de si elle sont actives ou pas) ainsi que l'état sur lequel se rendre lorsqu'on clique dessus.
A l'intérieur de celui-ci, on y met les vues souhaitées.
Comme il y en a plusieurs, il faut les nommer pour que ui-router sache ce qu'il doit inclure et à quel endroit (cf les routes).

Enfin, il faut créer les contrôleurs et vues associées.
On va renommer le contrôleur *AppCtrl* en *TwittsCtrl* ainsi que la vue *app.html* en *twitts.html* (pour correspondre à l'état *tabs.twitts*).
On va ensuite créer trois contrôleurs vide dans *controllers.js* :

```js
.controller('TabsCtrl', function($scope){
  'use strict';
})
.controller('NotificationsCtrl', function($scope){
  'use strict';
})
.controller('ProfilCtrl', function($scope){
  'use strict';
})
```

Et les vues *notifications.html* et *profile.html* avec un minimum d'éléments :

```html
<ion-view>
  <ion-header-bar class="bar-calm">
    <h1 class="title">Notifications</h1>
  </ion-header-bar>
  <ion-content class="padding">
    <h1>Notifications...</h1>
  </ion-content>
</ion-view>
```

```html
<ion-view>
  <ion-header-bar class="bar-calm">
    <h1 class="title">Profil</h1>
  </ion-header-bar>
  <ion-content class="padding">
    <h1>Profil...</h1>
  </ion-content>
</ion-view>
```

Tadam... Et voilà nos tabs <i class="emoji smile"></i>

Voir le code de cette étape sur [gihub](https://github.com/loicknuchel/blog-twitter-app/tree/69dc7d08f61e59af756c9632076e7f0a97f531ac){:target="_blank"}.

## Etape 6 : La navigation secondaire

Parfois, une navigation secondaire peut s'avérer intéressante. Notamment lorsqu'on choisi des tabs comme navigation principale, on ne souhaite pas en inclure trop.
Une manière habituelle de régler ce problème est d'ajouter un bouton avec une liste déroulante d'options.
Et ça tombe bien, Ionic a un composant parfait pour ça : le Popover ([doc](https://ionicframework.com/docs/api/popover){:target="_blank"}).

Commençons par ajouter un bouton "more" à droite dans le header. En général, on met une icône avec "...".
Pour cela il suffit d'ajouter notre nouveau bouton juste après celui qui nous permet de créer un nouveau twitt dans *twitts.html* :

```html
<button class="button button-icon ion-more" ng-click="popover.show($event)"></button>
```

On peut noter qu'au click, on affiche la popover, c'est donc maintenant que nous allons la créer.
Pour cela, Ionic nous fournit un service particulier : *$ionicPopover*, que l'on peut utiliser dans le *TwittsCtrl* dans *controllers.js*.

```js
$ionicPopover.fromTemplateUrl('views/partials/menu-popover.html', {
  scope: $scope,
}).then(function(popover) {
  $scope.popover = popover;
});
```

Son utilisation est très similaire au modal, on fourni un template avec les *$scope* souhaité et on récupère l'objet popover
que l'on met dans le *$scope* pour y accéder depuis la vue (notamment pour l'activer: *popover.show($event)*).
Comme le modal, la popover est une vue à part entière que l'on peut mettre dans *menu-popover.html* par exemple :

```html
<ion-popover-view>
  <ion-content>
    <div class="list" ng-click="popover.hide()">
      <a class="item item-avatar" ui-sref="tabs.profil">
        <img ng-src="{{user.avatar}}">
        <h2>{{user.name}}</h2>
        <p>@{{user.id}}</p>
      </a>
      <a class="item" href="#">Listes</a>
      <a class="item" href="#">Brouillons</a>
      <a class="item" href="#">Paramètres</a>
    </div>
  </ion-content>
</ion-popover-view>
```

Comme pour le modal, il faut utiliser une directive de vue spéciale `<ion-popover-view>`. Le reste de la vue est maintenant relativement classique.
A noter que pour que la popover se referme au click, j'ai rajouter un *popover.hide()* sur l'ensemble de la liste.
Par ailleurs, comme sur l'application twitter officielle, le premier élément de la liste affiche le compte utilisateur.
Il faut donc mettre notre utilisateur courant dans le *$scope* pour *TabsCtrl* dans *controllers.js* :

```js
UserSrv.getUser().then(function(user){
  $scope.user = user;
});
```

L'idéal  est de le mettre dans le *$scope* du contrôleur *TabsCtrl* afin qu'il soit accessible dans toutes les vues de l'application
(le *$scope* est hérité dans les contrôleurs fils).
Pour terminer, n'oubliez pas d'ajouter les nouvelles dépendances aux contrôleurs *TwittsCtrl* et *TabsCtrl* : *$ionicPopover* et *UserSrv* <i class="emoji smile"></i>

Voir le code de cette étape sur [gihub](https://github.com/loicknuchel/blog-twitter-app/tree/a6f8e59abcba81ca58da579de8f1b5fe4bd21424).

Voici l'[application android générée](/assets/posts/2015/03/05/ionic-twitter-app-step2.apk) et son aperçu actuel :

<div style="position: relative; margin-bottom: 20px;">
    <img src="http://ionicframework.com/img/phone-case.png" 
         alt="Phone background" 
         style="max-height: none;">
    <iframe
        src="http://codepen.io/loicknuchel/full/RNJBoo"
        style="width: 328px; height: 576px; border: none; position: absolute; top: 100px; left: 50%; margin-left: -164px;"></iframe>
</div>

Toujours motivé ? A bientôt pour la prochaine partie... <i class="emoji wink"></i>
