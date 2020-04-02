---
layout:      post
title:       Publier son application Cordova sur Google Play
banner_1_1:  /assets/posts/2015/03/26/publier-son-application-cordova-sur-google-play_1_1.jpg
banner_2_1:  /assets/posts/2015/03/26/publier-son-application-cordova-sur-google-play_2_1.jpg
banner_21_9: /assets/posts/2015/03/26/publier-son-application-cordova-sur-google-play_21_9.jpg
author:      loic
categories:  [coding]
tags:        [cordova, android, mobile]
---

Ça y est, tu as fini le dév et ton application révolutionnaire et prête à conquérir le monde ! Mais avant de devenir millionnaire et de te la couler douce,
il te reste une "petite" chose à faire : la publier sur les stores !

Dans cet article je ne m'intéresserais uniquement à la partie Android et donc au Play Store.

## Préparer la fiche Google Play

Tout d'abord, il te faut un compte Google Developer. Ce compte coûte $25 et est lié à un compte gmail.
Si tu as déjà un compte gmail tu peux l'utiliser mais comme il est impossible de transférer une application Android d'un compte développeur à un autre,
mieux vaut créer un compte gmail et un compte Google Developer spécifiques à l'application.
Ça permet de pouvoir partager et transférer les comptes avec d'autres personnes (associés, développeurs, acheteurs...).
Une fois connecté avec le compte gmail, rendez-vous sur : [play.google.com/apps/publish](https://play.google.com/apps/publish){:target="_blank"}
et suivez les étapes de création. Le paiement peut prendre jusqu'à 48h pour être validé, donc pense à t'y prendre un peu à l'avance.

![Play store screen](/assets/posts/2015/03/26/play-store-screen.png){:.pull-right}
Clique ensuite sur "Publier une application Android sur Google Play" et remplis la fiche du store. Les éléments importants sont la description et
la description courte ainsi que les screenshots de l'application. Tu dois aussi fournir le logo (512x512px), au moins une image promotionnelle (1024x500px) et
bien évidemment l'apk de l'application signé. L'image promotionnelle (1024x500px) sera visible sur le store mobile en haut de la fiche de l'application.<br>
<br>
Pour avoir des screenshots plus "classe", tu peux utiliser le
[Android Device Art](https://developer.android.com/distribute/marketing-tools/device-art-generator){:target="_blank"} qui permet d'inclure ses screenshots dans
un device adapté <i class="emoji smile"></i>.

## Bien vérifier son application

Avant de construire et publier son apk, il faut bien vérifier les derniers petits détails car certains ne pourront plus être modifiées par la suite.
Par exemple, dans le fichier *config.xml* et vérifier :

- l'id de l'application. C'est le package visible de l'application qui est généralement votre nom de domaine inversé.
Ne faites pas comme beaucoup de [laisser le package généré par défaut](https://play.google.com/store/search?q=com.ionicframework){:target="_blank"}...
- la version de l'application. L'idéal est de respecter le <major>.<minor>.<patch>. En général une version majeure est un (très) gros changement dans l'application
(changement de fonctionnalité principale par exemple), une version mineure est une amélioration de l'application (nouvelles fonctionnalités, redesign...) et
un patch est simplement un correctif (correction d'un bug ou amélioration peu visible). Ce numéro de version devra être augmenté lors de chaque mise à jour.
- le nom de l'application.

C'est aussi le dernier moment pour ajouter de la remonté d'erreur (merci la fragmentation Android !), des statistiques d'utilisation, passer sur les serveurs de prod,
virer les logs et autres éléments de débug, demander à tes utilisateurs de noter l'application (après qu'ils l'aient un peu utilisé)...

## Générer un apk signé

Tout d'abord, et ce sera à faire uniquement la première fois, il faut générer une clé de chiffrement pour signer l'apk. Ça se fait très simplement avec l'utilitaire keytool :

```console
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

Cette command permet de générer une clé (my-release-key.keystore) valide 10000 jours. L'outi demandera un mot de passe pour protéger la clé ainsi que quelques informations supplémentaires :

- nom et prénom
- nom de l'unité organisationnelle
- nom de l'entreprise
- ville de résidence
- état
- code pays sur deux lettres

Une fois le processus terminé, il faut bien archiver la clé (et son mot de passe) car elle sera nécessaire pour signer tous les futurs apk de mise à jour de l'application.

Il faut maintenant construire son apk en mode release. Depuis le dossier du projet, exécute :

```console
$ cordova build --release
```

L'apk généré est disponible à son emplacement habituel : `platforms/android/ant-build/CordovaApp-release-unsigned.apk`

Récupère l'apk et met le dans le même dossier que la clé de chiffrement. Tu peux alors le signer en exécutant :

```console
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore CordovaApp-release-unsigned.apk alias_name
```

Il faudra bien sûr le mot de passe de la clé pour que la commande s'exécute correctement. Enfin, il faut "aligner" l'apk, c'est à dire passer
par une phase d'optimisation :

```console
$ zipalign -v 4 CordovaApp-release-unsigned.apk CordovaApp.apk
```

Et voilà, l'apk (CordovaApp.apk) prêt à être publié sur le Store Android ! <i class="emoji smile"></i>

Pour aller un peu plus vite, voici le script que j'utilise pour faire toutes les étapes précédentes :

```bash
# This script should be launched from cordova project folder
# It assumes that you have a file named 'my-release-key.keystore' to sign your apk
# You will have to enter your keystore password at the end of build to sign your apk
 
rm CordovaApp.apk
cordova build --release
cp platforms/android/ant-build/CordovaApp-release-unsigned.apk .
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore CordovaApp-release-unsigned.apk alias_name
zipalign -v 4 CordovaApp-release-unsigned.apk CordovaApp.apk
rm CordovaApp-release-unsigned.apk
echo ""
echo "  +-------------------------------------------------------------------------+"
echo "  |                                                                         |"
echo "  | Votre apk, CordovaApp.apk, est prêt à être publié sur l'Android Store ! |"
echo "  |                                                                         |"
echo "  +-------------------------------------------------------------------------+"
echo ""
```

Pour plus de détails, consultez le [tutoriel Ionic](https://ionicframework.com/docs/publishing/app-store){:target="_blank"} ou
la [documentation Android officielle](https://developer.android.com/studio/publish/app-signing){:target="_blank"}.

J'espère que cet article t'auras permis de publier ton application sans soucis !
N'hésites pas à poster en commentaire l'application que tu as publié <i class="emoji smile"></i>

Si tu as d'autres points d'attentions particuliers au moment de la publication ou une manière différente de publier, n'hésites pas à les partager !

Have fun <i class="emoji wink"></i>
