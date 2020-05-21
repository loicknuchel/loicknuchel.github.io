---
layout:      post
locale:      fr_FR
icon:        sparkles
title:       Créer un plugin cordova
banner_1_1:  /assets/posts/2015/creer-un-plugin-cordova/banner_1_1.jpg
banner_2_1:  /assets/posts/2015/creer-un-plugin-cordova/banner_2_1.jpg
banner_21_9: /assets/posts/2015/creer-un-plugin-cordova/banner_21_9.jpg
banner_3_1:  /assets/posts/2015/creer-un-plugin-cordova/banner_3_1.jpg
author:      loic
categories:  [tech, code]
tags:        [cordova, phonegap, hybride, mobile, tutorial]
---

Bonjour à tous, aujourd'hui je vous propose de créer votre premier plugin cordova ! A quoi ça sert ?
Tout simplement à accéder à toutes les API natives depuis votre application.
Je vous propose donc de créer un plugin (Android) qui remplace les alert() JavaScript moches en alert() natives <i class="emoji smile"></i>

## Créer son application

```console
$ ionic start sampleApp blank
$ cd sampleApp
$ ionic platform add android
$ ionic run
```

Et voilà !

On va maintenant simplement ajouter un bouton à l'application qui affiche une *alert()* lorsqu'on clique dessus.
Pour cela il suffit de modifier le `<ion-content>` dans le **www/index.html** et d'ajouter un contrôleur dans le **www/js/app.js**, comme ceci :

```html
<ion-content ng-controller="MainCtrl">
  <button class="button" ng-click="showAlert()">alert</button>
</ion-content>
```

```js
.controller('MainCtrl', function($scope, $window){
  $scope.showAlert = function(){
    $window.alert('Hello Ionic !');
  };
});
```

![JavaScript alert](/assets/posts/2015/creer-un-plugin-cordova/javascript-alert.png){:.pull-right}
Un petit coup de `ionic run` et BOOM, voilà notre application !!!<br>
<br>
Vous remarquerez que le *alert()* affiché est plutôt moche et n'est pas dans le style Android. C'est ce que nous allons changer !

## Anatomie d'un plugin cordova

Un plugin cordova se compose de 3 parties majeures :

- le fichier **plugin.xml** : il permet de définir et de configurer le plugin
- le dossier **src/** : il contient le code natif spécifiques aux différentes plateformes
- le dossier **www/** : il contient l'API JavaScript que le plugin exposera à la webview

Tous les plugins de l'application se trouvent dans le dossier **plugins/** (par défaut Ionic ajoute les plugins device, console et keyboard).
Vous pouvez très bien créer le nouveau plugin directement ici cependant je conseille très fortement de le créer 
dans un dossier en dehors de l'application de manière à garder les deux projets bien séparés (le projet plugin et le projet application).
Il suffira ensuite d'ajouter le plugin créé à l'application.

## Créer son plugin

A côté du dossier de votre application (*sampleApp* dans mon cas), créez l'arborescence de fichiers suivante :

```
cordova-alert-plugin
|-- src/
|-- www/
|    +-- plugin.js
+-- plugin.xml
```

Dans le fichier *plugin.js*, créez un simple objet JavaScript et assignez le à *module.exports*.
Cordova se chargera de publier cet objet dans la webview selon sa configuration.

```js
function Plugin(){}
Plugin.alert = function(content){
  window.alert(content);
};
module.exports = Plugin;
```

Pour le fichier *plugin.xml*, les choses sont un peu moins habituelles :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
        xmlns:android="http://schemas.android.com/apk/res/android"
        id="com.example.cordova.alert"
        version="0.0.1">
    <name>Alert Plugin</name>
    <description>A plugin to show native alert</description>
    <license>Apache 2.0</license>
    <keywords>cordova,plugin,alert</keywords>
    <repo>https://github.com/yourgithubname/cordova-alert-plugin.git</repo>
    <issue>https://github.com/yourgithubname/cordova-alert-plugin/issues</issue>
 
    <js-module src="www/plugin.js" name="Alert">
        <clobbers target="cordova.plugins.Alert" />
    </js-module>
</plugin>
```

La balise `<plugin>` est l'élément de plus haut niveau. Il défini la configuration et le comportement du plugin.
L'**id** est très important est doit être unique parmi tous les plugins.
Le `<js-module>` permet de définir le fichier JavaScript contenant l'API du plugin ainsi que l'endroit où le plugin sera publié grâce à la balise `<clobbers>`.
L'API de notre plugin sera donc accessible dans la webview grâce à l'objet `cordova.plugins.Alert`.
Attention à ne pas entrer en collision avec d'autres plugins !!! Le reste des balises ainsi que leur rôle est plutôt évident je pense...

Pour l'instant il n'y a toujours aucun code natif mais nous pouvons déjà intégrer ce petit plugin à notre application et voir comment l'utiliser.
Pour cela, c'est la méthode habituelle mais en remplaçant l'id ou l'url par le chemin vers le plugin :

```console
$ ionic plugin add ../cordova-alert-plugin
$ ionic plugin list
```

Normalement vous devriez voir une ligne similaire à :

```console
com.example.cordova.alert 0.0.1 "Alert Plugin"
```

Modifions maintenant notre application pour utiliser la méthode du plugin :

```js
.controller('MainCtrl', function($scope, $window, $ionicPlatform){
  $scope.showAlert = function(){
    $ionicPlatform.ready(function(){
      $window.cordova.plugins.Alert.alert('Hello Ionic !');
    });
  };
});
```

Tout d'abord, avant d'utiliser un plugin, il faut attendre que cordova soit bien initialisé. Pour cela, ionic nous fourni le service *$ionicPlatform*.
Si on ne fait pas cette vérification et qu'on appelle le plugin avant que celui-ci soit initialisé,
l'objet à utilisé n'existera pas et nous aurons une erreur JavaScript : `TypeError: Cannot read property 'plugins' of undefined`

Si vous compilez et testez à nouveau l'application vous devriez voir... la même chose !!!
Et oui, on fait simplement un *alert()* JavaScript dans notre plugin pour l'instant... Mais cette fois ci, le *alert()* est déclenché par le plugin \o/.
L'application est maintenant fin prête, il ne reste plus qu'à compléter le plugin !

Petite remarque au passage, vous constatez qu'on peut très bien créer des plugins cordova sans aucun code natif.
On peut donc se servir des plugins pour packager des fonctionnalités purement JavaScript même si ce n'est pas l'usage habituel.

## La partie native du plugin

Ça y est, entrons dans le vif du sujet !

Tout d'abord, il faut configurer le plugin avec les paramètres spécifiques pour Android. Ajoutez dans le *plugin.xml* en-dessous du tag `<js-module>` :

```xml
<platform name="android">
  <config-file target="res/xml/config.xml" parent="/*">
    <feature name="AlertPlugin" >
      <param name="android-package" value="com.example.cordova.alert.AlertPlugin"/>
    </feature>
  </config-file>
 
  <source-file src="src/android/AlertPlugin.java" target-dir="src/com/example/cordova/alert"/>
</platform>
```

On configure ici la platorm Android (il faudra faire une configuration pour chaque plateforme que le plugin supporte).
Ici, c'est la configuration la plus simple : on déclare notre fichier source java (et oui, on fait du Java sur Android !) avec `<source-file>`.
Le dossier cible doit correspondre au package indiqué dans le fichier Java !
Ensuite, il faut déclarer le plugin dans un *config.xml* afin de pouvoir y accéder depuis le JavaScript.
Ça se fait grâce à la balise `<config-file>` qui ajoute un bout de xml dans le nœud (précisé par l'attribut *parent*) du fichier spécifié (attribut *target*).
L'attribut feature dans le *config.xml* permet d'enregistrer son plugin auprès de cordova en définissant son nom. On en aura besoin pour accéder aux classes natives.

On peut maintenant vraiment plonger dans Android et créer le fichier *src/android/AlertPlugin.java* :

```java
package com.example.cordova.alert;
 
import org.json.JSONArray;
import org.json.JSONException;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import android.R;
import android.content.Context;
import android.content.DialogInterface;
import android.app.AlertDialog;
 
public class AlertPlugin extends CordovaPlugin {
 
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if("alert".equals(action)){
      final String content = args.getString(0);
      showAlert(content);
      callbackContext.success();
      return true;
    } else {
      callbackContext.error("AlertPlugin."+action+" not found !");
      return false;
    }
  }
 
  private void showAlert(String content){
    // see http://developer.android.com/guide/topics/ui/dialogs.html
    AlertDialog.Builder alertDialog = new AlertDialog.Builder(this.cordova.getActivity(), AlertDialog.THEME_DEVICE_DEFAULT_LIGHT);
    alertDialog.setTitle("Alert");
    alertDialog.setMessage(content);
    alertDialog.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener(){
      public void onClick(DialogInterface dialog, int id){
        // User clicked OK button
      }
    });
    alertDialog.show();
  }
}
```

L'interface cordova est un peu spéciale, en effet, tout passe par la fonction *execute()*.
On reçoit donc l'action (à faire), les arguments sous forme JSON et les callbacks de réponse. Pour le reste, c'est de l'Android standard.

Il ne nous reste plus qu'à modifier légèrement notre objet JavaScript dans e fichier *plugin.js* pour appeler le code Java au lieu du *alert()* navigateur :

```js
Plugin.alert = function(content){
  var onSuccess = function(){};
  var onFail = function(){};
  cordova.exec(onSuccess, onFail, 'AlertPlugin', 'alert', [content]);
};
```

Ici, même combat, il faut formater les arguments pour qu'ils puissent être reçus par la fonction *execute()* de notre plugin.
A noter que le troisième paramètre doit correspondre au nom du plugin enregistré dans l'attribut *feature* du *config.xml* (cf la partie android du *plugin.xml*).

Pour tester tout ça dans notre application, il faut supprimer puis ajouter à nouveau le plugin de l'application
(ça mettra le nouveau code et forcera sa recompilation) et installer l'application sur son téléphone. En une ligne :

```console
$ ionic plugin remove com.example.cordova.alert && ionic plugin add ../cordova-alert-plugin/ && ionic run
```

![Android native alert](/assets/posts/2015/creer-un-plugin-cordova/android-alert.png){:.pull-left}
TADAAAAA !!!<br>
<br>
Et voici une *alert()* bien plus sympa !!!<br>

Et le truc super cool, c'est que si vous publiez votre plugin sur github (par exemple), n'importe qui pourra l'ajouter à son projet en faisant simplement :

```console
$ ionic plugin add https://github.com/yourname/your-cordova-plugin
```

## Un peu plus loin

### Workflow

Bien sûr, le développement d'un plugin est rarement immédiat et demande souvent pas mal de débuggage
(surtout pour les personnes non habitués au langage et à la plateforme).

Je n'ai pas encore trouvé d'outils et de workflow sympathique pour faire ces développements (le plugin n'étant pas un projet Android,
je vois mal comment bien l'intégrer dans un IDE).
Si vous avez des pratiques habituelles ou astuces, n'hésitez pas à les partager en commentaire, ça aidera tout le monde !!!

Personnellement je développe mon plugin en dehors de l'application et je le supprime/ajoute à chaque modification.
Je me base sur les erreurs de compilation pour fixer les bugs. Mais un vrai IDE ne serait pas du luxe <i class="emoji wink"></i>

### Logs

Pour débugger, j'utilise beaucoup le [logger Android](https://developer.android.com/reference/android/util/Log.html){:target="_blank"}. Voici comment faire :

- importez `android.util.Log` dans votre classe
- utilisez `Log.i("------>> MyPlugin", "coucou");`
- lorsque votre téléphone est branché en usb et exécute le plugin utilisez `$ adb logcat` ou `$ adb logcat | grep MyPlugin`
pour voir les logs de votre plugin <i class="emoji smile"></i>

### Autorisations

Comme on souhaite souvent utiliser des fonctionnalités qui requièrent des
[autorisations](https://developer.android.com/reference/android/Manifest.permission.html){:target="_blank"} dans un plugin,
il faut la déclarer dans son plugin. Pour cela, il suffit d'ajouter dans la section `<platform name="android">` du *plugin.xml* :

```xml
<config-file target="AndroidManifest.xml" parent="/manifest">
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
</config-file>
```

### Documentation

Je ne vous recommanderais jamais assez de commencer par lire la 
[documentation de cordova sur les plugins](https://cordova.apache.org/docs/fr/dev/guide/hybrid/plugins/index.html){:target="_blank"}.
Pensez à modifier la version ou la langue si besoin (en haut à droite).

Si vous rencontrez des problèmes, jeter un oeil aux sources de cordova est toujours très enrichissant. Notamment
[CordovaPlugin](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java){:target="_blank"},
[CallbackContext](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CallbackContext.java){:target="_blank"},
[CordovaActivity](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaActivity.java){:target="_blank"},
[CordovaWebView](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaWebView.java){:target="_blank"} et
[CordovaInterface](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaInterface.java){:target="_blank"}.

### Autres ressources

- [Développer un plugin iOS](https://connect.adfab.fr/mobile/developper-plugin-cordova-dans-les-regles-de-lart){:target="_blank"}
- [How to write a calendar plugin](http://devgirl.org/2013/09/17/how-to-write-a-phonegap-3-0-plugin-for-android/){:target="_blank"}

Voilà, avec ça vous devriez partir du bon pied <i class="emoji wink"></i>
