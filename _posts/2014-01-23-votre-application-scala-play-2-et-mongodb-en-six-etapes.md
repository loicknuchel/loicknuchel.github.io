---
layout:      post
locale:      fr_FR
icon:        ticket
title:       Votre application Scala, Play 2 et MongoDB en six étapes
banner_1_1:  /assets/posts/2014/01/23/votre-application-scala-play-2-et-mongodb-en-six-etapes_1_1.jpg
banner_2_1:  /assets/posts/2014/01/23/votre-application-scala-play-2-et-mongodb-en-six-etapes_2_1.jpg
banner_21_9: /assets/posts/2014/01/23/votre-application-scala-play-2-et-mongodb-en-six-etapes_21_9.jpg
author:      loic
categories:  [tech, code]
tags:        [play framework, mongodb, scala, tutorial]
---

Après avoir lu un certain nombre de tutoriaux sur [Scala](https://www.scala-lang.org){:target="_blank"}, [Play](https://www.playframework.com){:target="_blank"}
et [MongoDB](https://www.mongodb.com){:target="_blank"} ([ici](https://blog.knoldus.com/design-forms-in-play2-0-using-scala-and-mongodb){:target="_blank"},
[ici](https://neelkanthsachdeva.wordpress.com/2012/08/02/working-with-play-framework-using-scala-and-mongodb){:target="_blank"}, 
[ici](https://jaredrosoff.wordpress.com/2011/05/25/getting-started-with-play-framework-scala-and-casbah){:target="_blank"}...)
et regardé pas mal de [projets sur github](https://github.com/search?q=scala+play+mongo){:target="_blank"}, je me suis rendu compte qu'ils étaient tous vieux
et ne correspondaient plus aux versions actuelles. Voici donc, encore un autre tutoriel sur ces technologies mais avec des versions actualisées. Nous voici donc partis avec :

- Scala 2.10.2
- Play 2.2.1
- MongoDB 2.4.8
- Salat 1.4.0

Le but de cet article va être de construire une application simple. Si vous ne n'avez pas déjà tout installé, c'est le moment de le faire :
[install MongoDB](https://docs.mongodb.com/manual/installation){:target="_blank"}, [install Play](https://www.playframework.com/documentation/2.2.x/Installing){:target="_blank"},
[install Scala](https://www.scala-lang.org/download){:target="_blank"}.

## Première étape : Créer notre application Play

```console
play new playScalaMongoSample
```

![Create play app](/assets/posts/2014/01/23/create_play_app.png)

Pour démarrer notre application, il suffit alors d'aller dans le dossier de l'application et de lancer le serveur : `cd playScalaMongoSample/`
puis `play` pour accéder à la console sbt et enfin de lancer le serveur avec la commande `run`.

![Create play app](/assets/posts/2014/01/23/play_run.png)

Bravo ! Votre application fonctionne !!! Maintenant, rendez-vous sur votre application : [localhost:9000](http://localhost:9000/){:target="_blank"}.
Vous devriez voir la page d'accueil de Play :

![Create play app](/assets/posts/2014/01/23/play_hello_page.png)

## Deuxième étape : Ajouter la dépendance sur MongoDB

Créez un fichier `Build.scala` dans le dossier `project/` et ajoutez-y les dépendances de [salat](https://github.com/leon/play-salat){:target="_blank"} :

```scala
import sbt._
import Keys._
import play.Project._
 
object ApplicationBuild extends Build {
  val appName = "playScalaMongoSample"
  val appVersion = "1.0-SNAPSHOT"
 
  val main = play.Project(appName, appVersion).settings(
    libraryDependencies ++= Seq("se.radley" %% "play-plugins-salat" % "1.4.0"),
    routesImport += "se.radley.plugin.salat.Binders._",
    templatesImport += "org.bson.types.ObjectId")
}
```

Créez ensuite le fichier `play.plugins` dans le dossier `conf/` et déclarez le plugin salat :

```hocon
500:se.radley.plugin.salat.SalatPlugin
```

Dans le fichier `conf/application.conf`, ajoutez les lignes suivantes :

```hocon
dbplugin=disabled
evolutionplugin=disabled
ehcacheplugin=disabled
mongodb.default.db="crud"
```

Le paramètre `mongodb.default.db` détermine le nom de la base qui sera utilisée dans MongoDB.

## Troisième étape : Ajoutez les routes de l'application

Pour cela on va mettre un place un simple CRUD (Create Read Update Delete) basé sur MongoDB.

Pour cela commençons par créer les différentes routes qui seront utilisées. Ajoutez les lignes suivantes au fichier `conf/routes` :

```play2htmlrouting
# CRUD Users
GET    /users                       controllers.CRUDApp.users
POST   /users                       controllers.CRUDApp.newUser
POST   /users/:username/delete      controllers.CRUDApp.deleteUser(username: String)

```

## Quatrième étape : Créez vos modèles

Pour fonctionner et se connecter à la base de données, salat à besoin d'un contexte (`MongoContext.scala`) que nous allons créer dans le dossier `app/models` :

```scala
package models
 
import com.novus.salat._
import play.api.Play.current
import play.api.Play
 
package object MongoContext {
  implicit val context = {
    val context = new Context {
      val name = "global"
      override val typeHintStrategy = StringTypeHintStrategy(when = TypeHintFrequency.WhenNecessary, typeHint = "_t")
    }
    context.registerGlobalKeyOverride(remapThis = "id", toThisInstead = "_id")
    context.registerClassLoader(Play.classloader)
    context
  }
}
```

On peut maintenant créer notre classe User qui sera manipulée par notre CRUD.
Pour que salat puisse bien mapper notre classe, il faut impérativement que ce soit une case class. Voici notre User :

```scala
package models
 
import play.api.Play.current
import java.util.Date
import com.novus.salat._
import com.novus.salat.annotations._
import com.novus.salat.dao._
import com.mongodb.casbah.Imports._
import se.radley.plugin.salat._
import MongoContext._
 
case class User(username: String)
 
object User extends ModelCompanion[User, ObjectId] {
  val dao = new SalatDAO[User, ObjectId](collection = mongoCollection("users")) {}
 
  def all(): List[User] = dao.find(MongoDBObject.empty).toList
  def create(username: String) {
    dao.insert(User(username = username))
  }
 
  def delete(username: String) {
    dao.remove(MongoDBObject("username" -> username))
  }
  def findOneByUsername(username: String): Option[User] = dao.findOne(MongoDBObject("username" -> username))
}
```

## Cinquième étape : Codez le contrôleur

On peut maintenant commencer à coder le contrôleur CRUDApp qui va effectuer l'ensemble des actions prévues :

```scala
package controllers
 
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import models._
 
object CRUDApp extends Controller {
  val userForm = Form(
    "username" -> nonEmptyText)
 
  def users = Action {
    Ok(views.html.CRUD(User.all(), userForm))
  }
 
  def newUser = Action { implicit request =>
    userForm.bindFromRequest.fold(
      errors => BadRequest(views.html.CRUD(User.all(), errors)),
      username => {
        User.create(username)
        Redirect(routes.CRUDApp.users)
      })
  }
 
  def deleteUser(username: String) = Action {
    User.delete(username)
    Redirect(routes.CRUDApp.users)
  }
 
}
```

## Sixième étape : Ajoutez l'interface

Maintenant que la logique est terminée, il faut tout simplement ajouter l'interface graphique.
Pour cela, il nous faudra simplement créer `CRUD.scala.html` dans le dossier `app/views/` :

```play2template
@(users: List[User], userForm: Form[String])
 
@import helper._
@main("User CRUD - Play starter") {
    <div class="container">
 
      <h1>@users.size user(s)</h1>
      <ul>
      @users.map { user =>
          <li>
              @user.username
              @form(routes.CRUDApp.deleteUser(user.username)) {
                  <input type="submit" value="Delete">
              }
          </li>
      }
      </ul>
 
      <h2>Add a new User</h2>
      @form(routes.CRUDApp.newUser) {
          @inputText(userForm("username"))
          <input type="submit" value="Create">
      }
 
    </div> <!-- /container -->
}
```

Votre application est maintenant prête !!!

Pour la tester, commencez par démarrer MongoDB sur votre machine, puis, à partir du répertoire principal de l'application
lancez la commande `play` puis `run` et rendez-vous à l'adresse [localhost:9000/users](http://localhost:9000/users){:target="_blank"}.

Normalement vous devriez avoir un écran comme celui-ci :

![Play CRUD page](/assets/posts/2014/01/23/play_crud.png)

Vous pouvez alors créer et supprimer des utilisateurs \o/

Si vous avez oublié de démarrer votre base MongoDB, vous aurez une erreur comme celle-ci :

![Play error missing database](/assets/posts/2014/01/23/play_no_db.png)

Dans ce cas, il faut arrêter l'application, démarrer MongoDB et démarrer à nouveau votre application.

Voilà ! J'espère que cette petite mise en bouche vous aura fait partir du bon pied <i class="emoji smile"></i>

Pour les "flemmards", vous pouvez directement télécharger l'[archive du projet](/assets/posts/2014/01/23/playScalaMongoSample.rar).

Pour ceux qui veulent partir directement d'une application intégrant les composants de base,
j'ai créé un projet de démarrage librement accessible sur github : [github.com/loicknuchel/play-starter](https://github.com/loicknuchel/play-starter){:target="_blank"}

## What's next

Pour ceux qui veullent aller un peu plus loin,
je conseille le workshop buyme de Scala.io : [github.com/workshop-buyme/buyme/wiki](https://github.com/workshop-buyme/buyme/wiki){:target="_blank"}

















