---
layout:      post
title:       Utilisez ReactiveMongo avec Play framework 2.2
banner_1_1:  /assets/posts/2014/01/30/utilisez-reactivemongo-avec-play-framework-2-2_1_1.jpg
banner_2_1:  /assets/posts/2014/01/30/utilisez-reactivemongo-avec-play-framework-2-2_2_1.jpg
banner_21_9: /assets/posts/2014/01/30/utilisez-reactivemongo-avec-play-framework-2-2_21_9.jpg
author:      loic
categories:  [coding]
tags:        [play framework, mongodb, scala, tutorial]
---

Lors de [mon précédent article]({% post_url 2014-01-23-votre-application-scala-play-2-et-mongodb-en-six-etapes %}) sur [Scala](https://www.scala-lang.org){:target="_blank"},
[Play](https://www.playframework.com){:target="_blank"} et [MongoDB](https://www.mongodb.com){:target="_blank"} je vous montrais comment utiliser salat pour se connecter à MongoDB.
J'avais volontairement pas choisi [ReactiveMongo](http://reactivemongo.org){:target="_blank"} parce qu'il n'est pas encore compatible avec la version 2.2 de Play framework.
Or Loïc Descotte m'a très justement fait remarqué qu'il existe un [plugin Play](https://github.com/ReactiveMongo/Play-ReactiveMongo){:target="_blank"} pour les faire fonctionner ensemble :

{% include embed-tweet.html id="426675616138936320" user="loic_d" name="Loïc Descotte" content="avec ce plugin si https://github.com/ReactiveMongo/Play-ReactiveMongo" %}

Du coup, je me sens bien obligé de faire un article pour montrer comment utiliser l'excellent driver ReactiveMongo <i class="emoji wink"></i>

Mais on peut se demander, pourquoi utiliser ReactiveMongo plutôt que Salat ?

Son énorme avantage est de requêter MongoDB de manière asynchrone et non bloquante. Mais le mieux est encore de lire leur [page d'accueil](http://reactivemongo.org/){:target="_blank"} :

> With a classic synchronous database driver, each operation blocks the current thread until a response is received.
> This model is simple but has a major flaw - it can't scale that much.
>
> Imagine that you have a web application with 10 concurrent accesses to the database. That means you eventually end up with 10 frozen threads at the same time,
> doing nothing but waiting for a response. A common solution is to rise the number of running threads to handle more requests.
> Such a waste of resources is not really a problem if your application is not heavily loaded, but what happens if you have 100 or even 1000 more requests to handle,
> performing each several db queries? The multiplication grows really fast...
>
> The problem is getting more and more obvious while using the new generation of web frameworks.
> What's the point of using a nifty, powerful, fully asynchronous web framework if all your database accesses are blocking?
>
> ReactiveMongo is designed to avoid any kind of blocking request. Every operation returns immediately, freeing the running thread and resuming execution when it is over.
> Accessing the database is not a bottleneck anymore.

Bon, j'espère que ça vous a donné envie ! Maintenant, voyons comment implémenter les choses avec une application Play.

Comme vous l'aurez compris, cette article est une suite donc, si ce n'est pas fait, commencez par
"[Votre application Scala, Play 2 et MongoDB en six étapes]({% post_url 2014-01-23-votre-application-scala-play-2-et-mongodb-en-six-etapes %})".

## Première étape : modifier les dépendances de votre application

Modifiez les dépendances de votre application dans le fichier `projet/Build.scala` :

```scala
val main = play.Project(appName, appVersion).settings(
  libraryDependencies ++= Seq("org.reactivemongo" %% "play2-reactivemongo" % "0.10.2")
)
```

Dans le fichier `conf/play.plugins` remplacez le plugin Salat par le plugin ReactiveMongo :

```hocon
400:play.modules.reactivemongo.ReactiveMongoPlugin
```

De la même manière, il vous faut modifier le fichier de configuration `conf/application.conf` en supprimant les données liées à salat pour les remplacer par :

```hocon
mongodb.servers=["localhost:27017"]
mongodb.db="crud"
```

C'est tout pour la partie configuration.

## Deuxième étape : modifiez l'application pour la rendre réactive

Vous pouvez commencer par supprimer le fichier `app/models/MongoContext.scala`. Il sera remplacé par des Readers et Writters que nous allons créer avec la classe User.

Dans le fichier, `app/models/User.scala` vous pouvez supprimer l'objet companion ainsi que les imports se référant à salat
(com.novus.salat.*, com.mongodb.casbah.*, se.radley.plugin.*) et l'import MongoContext.
Ajoutons maintenant les Reader et Writter avec un nouvel objet companion de la classe User :

```scala
import reactivemongo.bson._
 
object User {
  implicit object UserBSONReader extends BSONDocumentReader[User] {
    def read(doc: BSONDocument): User = User(doc.getAs[String]("username").get)
  }
  implicit object UserBSONWriter extends BSONDocumentWriter[User] {
    def write(user: User): BSONDocument = BSONDocument("username" -> user.username)
  }
}
```

Et enfin, il nous faut modifier le contrôleur de votre application.
C'est ici qu'il va y avoir la plus grande partie du travail puisqu'il va falloir rendre les actions asynchrones avec ReactiveMongo :

```scala
package controllers
 
import scala.concurrent.Future
 
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.modules.reactivemongo.{ MongoController, ReactiveMongoPlugin }
 
import reactivemongo.api.collections.default.BSONCollection
import reactivemongo.bson._
 
import models.User
import models.User._
 
object CRUDApp extends Controller with MongoController {
  val collection = db[BSONCollection]("users")
  val userForm = Form("username" -> nonEmptyText)
 
  def users = Action.async {
    val found = collection.find(BSONDocument()).cursor[User]
    found.collect[List]().map(users => Ok(views.html.CRUD(users, userForm)))
  }
 
  def newUser = Action.async { implicit request =>
    userForm.bindFromRequest.fold(
      errors => Future.successful(BadRequest(views.html.CRUD(List(), errors))),
      username => {
        collection.insert(User(username)).map(_ => Redirect(routes.CRUDApp.users))
      })
  }
 
  def deleteUser(username: String) = Action.async {
    collection.remove(BSONDocument("username" -> username))
      .map(_ => Redirect(routes.CRUDApp.users))
  }
}
```

Ça y est, votre migration est faite !!! Vous pouvez maintenant lancer votre application et tester que tout fonctionne bien comme avant.

Vous pouvez rencontrer des problèmes car les plugins sont pris en compte au lancement de la console sbt (dans votre terminal).
Pour prendre en compte le changement de plugin, il suffit de sortir de la console (revenir au shell normal) puis revenir dans la console en tapant la commande `play`.
Normalement les erreurs devraient disparaître.

Si vous êtes un peu flemmard ou complètement perdu dans ce tutoriel, voici l'[archive du projet](/assets/posts/2014/01/30/playScalaMongoSample_with_ReactiveMongo.rar).

## Prochaine étape : GridFS

MongoDB peut stocker des fichiers avec son système GridFS. Si vous êtes intéressés par l'utiliser,
je vous recommande fortement le [projet d'exemple](https://github.com/sgodbillon/reactivemongo-demo-app){:target="_blank"} de Stéphane Godbillon, le créateur de ReactiveMongo.

Bonne continuation avec Play, Scala et MongoDB <i class="emoji wink"></i>
