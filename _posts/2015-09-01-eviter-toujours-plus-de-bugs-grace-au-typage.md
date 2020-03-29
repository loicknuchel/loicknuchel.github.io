---
layout:      post
title:       Éviter toujours plus de bugs grâce au typage
banner_1_1:  /assets/img/posts/2015-09-01/eviter-toujours-plus-de-bugs-grace-au-typage_1_1.jpg
banner_2_1:  /assets/img/posts/2015-09-01/eviter-toujours-plus-de-bugs-grace-au-typage_2_1.jpg
banner_21_9: /assets/img/posts/2015-09-01/eviter-toujours-plus-de-bugs-grace-au-typage_21_9.jpg
author:      loic
categories:  [coding]
tags:        [bug free, play framework, scala, typage, value classe]
---

> If debugging is the process of removing bugs, then programming must be the process of putting them in.
>> Edsger W. Dijkstra

Ceux qui me connaissent savent que je suis un grand fan des langages typés, de programmation fonctionnelle et de Scala. Pourquoi ?
Tout simplement parce qu'ils permettent de coder de manière concise tout en évitant un grand nombre de bugs que nous, 
développeurs distraits, avons l'habitude de laisser derrière nous 😉

![Static typing](/assets/img/posts/2015-09-01/static-typing-lesson.jpg)

Habituellement je fais références aux `Option`, `Future`, `Try`, `Either`... mais la semaine dernière j'ai eu quelques soucis dans mon code qui m'ont fait réfléchir 
et m'ont décidés à pousser encore un peu plus dans ce sens. Voici un exemple :

```scala
def details(eventId: String, exponentId: String) = SecuredAction.async { implicit req =>
  withEvent(exponentId) { event =>
    withExponent(eventId) { exponent =>
      AttendeeRepository.findByUuids(exponent.info.team).map { team =>
        Ok(backend.views.html.Events.Exponents.details(exponent, team, event))
      }
    }
  }
}
```

Évidemment, vous avez tout de suite vu le bug ! Non ? Pourtant, il est tellement évident que même un non-codeur devrait l'identifier immédiatement... C'est bon ? 
Vous l'avez ? Pas si facile en effet, et encore, c'est vraiment les conditions idéales : je vous dit qu'il y a un bug, il y a très peu de lignes, 
le code est très clair, l'erreur est évidente... Imaginez que ce soit sur du code bien plus complexe, en plein milieu de votre application, 
dans une partie du site rarement utilisée / difficilement accessible et que le bug soit bien moins évident (ex : `AttendeeRepository` => `UserRepository`)...
Évidemment c'est ce que j'ai eu il y a quelques jours et ça m'a motivé pour trouver un solution afin que ces erreurs soient détectées dès la compilation !

Si on prends un peu de recul, le problème est évident : on utilise le même type pour des données de nature différentes.
C'est quand même ballot d'utiliser le même type (`String`) pour : tous les IDs, emails, noms (utilisateur, société...), adresses, urls, commentaires...
Du coup, impossible de se reposer sur le compilateur ou tout autre outil pour s'assurer qu'on n'a pas fait de boulette. 
En même temps, comme ce sont des types primitifs, c'est logique de les utiliser un peu partout. 
Mais les effets peuvent être ravageurs et difficiles à identifier. Par exemple :

- Se tromper dans ses IDs (comme dans l'exemple) => j'utilise des UUIDs donc j'avais un NotFound alors que je n'aurais pas du (pas toujours évident à voir) mais si vous utilisez des IDs qui se suivent (auto-increment), vous récupérerez juste les mauvais objets (très difficile à identifier !)
- Inverser deux champs dans une fonction (ex : Nom / Prénom d'un utilisateur) => en fonction de où et quand l'utilisateur a été créé/modifié, il aura ce problème qui n'est pas évident à identifier et impossible à corriger après coup 🙁
- ...

![Dynamic typing](/assets/img/posts/2015-09-01/dynamic-typing.jpg)

Bref, je crois que le problème est assez clair et j'espère que vous êtes aussi convaincus que moi que corriger ça fera drastiquement diminuer 
le nombre de bugs / temps de debug dans votre application.

La seule question qui reste est : **comment le faire** ? Et surtout sans alourdir/complexifier votre code !

### Play Framework & Scala for the win !

Étant loin d'être un expert, je vous présente simplement la solution que j'ai mise en place sur le backend de [SalooN](https://github.com/saloonapp/saloon-backend){:target="_blank"}.
Il y a potentiellement mieux (je suis preneur si c'est le cas).

On veut donc typer nos propriétés pour réduire au maximum les bugs possibles et améliorer la compréhension de notre code 
(`f: FullName => Slug` est quand même plus clair que `f: String => String`). 
Pour l'instant concentrons nous uniquement sur les IDs (ce sont eux les plus utilisés après tout).

Heureusement pour nous, Scala a des [Value Classes](https://docs.scala-lang.org/overviews/core/value-classes.html){:target="_blank"} 
qui vont nous permettre de faire exactement ce que l'on souhaite. 
Ce sont des classes particulières qui ne sont pas allouées à l'exécution, ce qui est parfait pour typer nos `String`. 
Pour cela, elles ne doivent prendre qu'un seul argument et hériter de `AnyVal`. 
A noter que j'aurais aussi pu utiliser [Unboxed Tagged Types](https://coderwall.com/p/l-plmq/adding-semantic-to-base-types-parameters-in-scala){:target="_blank"} 
mais c'est une autre histoire...

Donc voici notre nouveau type :

```scala
case class EventId(id: String) extends AnyVal
```

Il suffit maintenant de remplacer `Event(uuid: String, ...)` par `Event(uuid: EventId, ...)`, de répercuter ce changement partout dans le code et voilà ! Simple non ?

Oui... Et non 🙁

**Play framework** possède un certain nombre de fonctionnalités avec des bindings vers les objets communs (`String`, `Int`, `Long`, `Date`...) 
mais nous venons justement de transformer un objet commun (`String`) en une classe custom que Play framework ne sait pas utiliser directement. 
Il va donc falloir définir nous même ces bindings pour que tout fonctionne au mieux (ce qui est assez rare habituellement, en tous cas, c'était une première pour moi !).
Et au lieu de se plaindre de devoir bosser un peu plus, prenons-le comme une opportunité d'en apprendre d'avantage sur notre framework préféré 😀

Tout d'abord les routes. En effet, les IDs étant généralement utilisés comme paramètre dans les URLs, on va enfin pouvoir mieux les typer :

```play2htmlrouting
GET  /backend/events/:eventId        backend.controllers.Events.details(eventId: String)
```

Ressemblera maintenant à :

```play2htmlrouting
GET  /backend/events/:eventId        backend.controllers.Events.details(eventId: EventId)
```

=> `not found: type EventId`

Oooups ! Notre type, `EventId`, n'est pas importé par défaut dans le fichier de routes... Pour ça, il faut simplement ajouter la dépendance dans notre `build.sbt` :

```sbt
play.PlayImport.PlayKeys.routesImport += "common.models.event.EventId"
```

On recharge la configuration Play et :

```error
No URL path binder found for type common.models.event.EventId.
Try to implement an implicit PathBindable for this type.
```

Re-Oooups ! Le problème ici, c'est que Play ne sait pas transformer la `String` de l'URL en `EventId` pour le transmettre ensuite à l'Action correspondante...
Il y a tous les bindings nécessaires pour les types habituels (`String`, `Long`, `Int` et même `Option` et `RegEx`) mais il ne peut pas gérer notre type custom.
On va donc devoir écrire notre binding propre avec un [PathBindable](https://www.playframework.com/documentation/2.3.4/api/scala/index.html#play.api.mvc.PathBindable){:target="_blank"}.
Ce sera d'ailleurs l'occasion de vérifier que le format de l'ID est correct (de la forme `e3485ee0-7591-42fa-8c2e-110b203b06ab`) :

```scala
object EventId {
  private def build(str: String): Option[EventId] = 
    Try(java.util.UUID.fromString(str)).toOption.map(uuid => EventId(uuid.toString))
  implicit val pathBinder = new PathBindable[EventId] {
    def bind(key: String, value: String): Either[String, EventId] = 
      build(value).toRight("Wrong format")
    def unbind(key: String, value: EventId): String = value.id
  }
}
```

Mettre le binding dans l'objet compagnon de l'`EventId` permet de l'importer en même temps que le type. Il est donc maintenant accessible dans le fichier de routes.

Et voilà... Maintenant vous avez des routes correctement typées avec la vérification du format des IDs !!! 
Et sans alourdir le code de l'application (`EventId` à la place de `String`). Mais il est probable que votre projet ne compile toujours pas 🙁

Si comme moi vous utilisez MongoDB ou que vous exposez une API et que vous sérialisez en JSON votre objet `Event` vous devriez voir un joli :

`No implicit format for common.models.event.EventId available.`

Et oui, il faut écrire des [Reads](https://www.playframework.com/documentation/2.3.4/api/scala/index.html#play.api.libs.json.Reads){:target="_blank"} et 
[Writes](https://www.playframework.com/documentation/2.3.4/api/scala/index.html#play.api.libs.json.Writes){:target="_blank"}... 
Et malheureusement l'habituel `implicit val format = Json.format[EventId]` ne vous aidera pas cette fois-ci 🙁

En effet, même si on utilise une Value Classe qui sera traitée uniquement comme une `String` à l'exécution, ça n'en reste pas moins une classe.
Du coup, la macro la sérialisera sous la forme `{id: "0000"}` au lieu de simplement `"0000"`. On va donc devoir passer par des Reads/Writes custom.
Ce sera d'ailleurs l'occasion d'y ajouter une validation du format comme pour les routes :

```scala
object EventId {
  private def build(str: String): Option[EventId] = 
    Try(java.util.UUID.fromString(str)).toOption.map(uuid => EventId(uuid.toString))
  implicit val pathBinder = ...
  implicit val jsonFormat = Format(new Reads[EventId] {
    def reads(json: JsValue): JsResult[EventId] = 
      json.validate[String].map(id => build(id)).filter(_.isDefined).map(_.get)
  }, new Writes[EventId] {
    def writes(value: EventId): JsValue = JsString(value.id)
  })
}
```

Les sérialisations devraient maintenant bien se passer et vérifier le format des IDs.

*Petite anecdote : dans l'objet Session (les talks en gros), je stocke la liste des IDs des speakers. 
La vérification du format m'a fait me rendre compte que sur un événement particulier les sessions sans speaker avaient une liste 
avec une `String` vide (`List("")`) au lieu d'une liste vide (`List()`). 
Aucun bug n'était visible dans l'application mais j'aurais pu avoir des statistiques fausses (si je compte le nombre de speakers en comptant les IDs) 
ou d'autres joyeusetés !!! Merci les types !!!*

![Always fail](/assets/img/posts/2015-09-01/always-fail.gif)

Prochaine étape : les formulaires. Si vous utilisez les formulaires Play vous devriez avoir quelque chose du genre :

```scala
val eventForm: Form[Event] = Form(mapping(
  "uuid" -> nonEmptyText,
  "name" -> nonEmptyText,
  ...
  "description" -> optional(text))(Event.apply)(Event.unapply))
```

Oui ? Dans ce cas vous devriez aussi avoir un joli :

```error
type mismatch;
 found   : (common.models.event.EventId, String, ..., String) => common.models.event.Event
 required: (String, String, ..., String) => ?
```

Encore une fois, le mapping `nonEmptyString` est fait pour les `String` et pas pour les `EventId`. Et devinez quoi, Play n'a pas de binding pour `EventId` build-in...
On va donc devoir faire notre [Formatter](https://www.playframework.com/documentation/2.3.4/api/scala/index.html#play.api.data.format.Formatter){:target="_blank"} spécifique :

```scala
object EventId {
  private def build(str: String): Option[EventId] = 
    Try(java.util.UUID.fromString(str)).toOption.map(uuid => EventId(uuid.toString))
  implicit val pathBinder = ...
  implicit val jsonFormat = ...
  implicit val formMapping = new Formatter[EventId] {
    def bind(key: String, data: Map[String, String]): Either[Seq[FormError], EventId] = 
      data.get(key).flatMap(build).toRight(Seq(FormError(key, "error.wrongFormat", Nil)))
    def unbind(key: String, value: EventId): Map[String, String] = Map(key -> value.id)
  }
}
```

Et l'utiliser dans tous nos formulaires :

```scala
val eventForm: Form[Event] = Form(mapping(
  "uuid" -> of[EventId],
  "name" -> nonEmptyText,
  ...
  "description" -> optional(text))(Event.apply)(Event.unapply))
```

Notre fonction `build()` vérifie encore que l'ID a un format correct \o/

C'est pas beau tout ça ? On vient d'écrire en quelques lignes les adaptateurs nécessaires pour que Play se trouve aussi à l'aise avec des `EventId`
qu'avec une simple `String` ! Plus aucun soucis pour utiliser des types custom de partout, améliorer la cohérence et la compréhension de notre code 
et surtout diminuer drastiquement la probabilité de bugs dûs à des erreurs d'inattention ou de copier/coller.

Autre petite anecdote : dans le processus, j'ai trouvé 2 autres endroits où je m'étais emmêlé les pinceaux avec les IDs. 
Donc soit je suis vraiment pas doué (ce qui est bien possible !). Soit vous feriez bien de checker vos app 😉

### Is this real life ?

![Theory land](/assets/img/posts/2015-09-01/theory-land.jpg){:.pull-right}
Comme souvent, les articles de blog montrent tous les avantages mais sans nécessairement évoquer d'éventuels subtilités de mise en oeuvre ou passages un peu moins friendly.
Comme je viens de migrer tout le backend de SalooN, voici quelques problèmes supplémentaires que j'ai dû adresser.

Lorsque vous concaténez votre `EventId` avec une autre `String`, la fonction `toString()` sera automatiquement appelée.
Or, si vous ne la redéfinissez pas (`override def toString: String = this.id`),
la sortie sera différente par rapport à votre code d'avant : `EventId(0000)` au lieu de `0000`.

Puisqu'on on parle d'IDs, il faut les générer. Avant j'avais un objet `Repository` avec une méthode `Repository.generateUuid(): String` qui fonctionnait pour tout. 
Maintenant vous pouvez générer votre ID directement depuis son objet : `EventId.generate(): EventId`. C'est quand même mieux !

Parfois, c'était quand même bien pratique de pouvoir "mélanger" plusieurs IDs ensemble. 
Par exemple, sur SalooN les utilisateurs peuvent mettre en favoris des sessions, des exposants, d'autres participants...
J'ai donc une `def favorite(itemType: String, itemId: String)` qui me permet d'enregistrer des favoris pour n'importe quel type d'objet. 
Maintenant que chaque ID a un type incompatible avec les autres (et c'est bien l'objectif de tout ça) comment implémenter une telle fonction ?
Bien sûr, on pourrait ressortir l'ID de sa classe et le passer en tant que `String`. Mais on a quand même pas fait tout ça pour ça !!! 
J'ai donc choisi de créer un ID générique `GenericId` de la même manière et d'implémenter des conversions implicites dans le sens **spécifique => générique** :

```scala	
object GenericId {
  ...
  implicit def fromEventId(eventId: EventId): GenericId = GenericId(eventId.id)
  implicit def fromAttendeeId(attendeeId: AttendeeId): GenericId = GenericId(attendeeId.id)
  implicit def fromExponentId(exponentId: ExponentId): GenericId = GenericId(exponentId.id)
  implicit def fromSessionId(sessionId: SessionId): GenericId = GenericId(sessionId.id)
}
```

**Attention à ne surtout pas implémenter d'autres conversions implicites. Il faut que les types incompatibles le restent !!!**

**Toutes les autres conversions doivent être explicites et faites avec beaucoup de précautions.**

J'ai donc maintenant un `def favorite(itemType: String, itemId: GenericId)` qui indique clairement que cette fonction prend différents types d'ID.
On pourrait pousser le vice en créant un `ItemId` qui serait compatible (conversions implicites) qu'avec les ID acceptables.
À voir à l'usage... Mais je n'y suis pas encore 😉

### Take Away

Un des objectifs est de répéter cette opération au moins pour tous vos IDs, voire pour un certain nombre de champs assez génériques 
(Email, FirstName, LastName, FullName, Avatar...) afin de garantir une vraie cohérence dans le code. 
Mais si il faut tout redéfinir à chaque fois, c'est un peu pénible et surtout risqué en terme de maintenance (DRY, Don't Repeat Yourself !)

Voici donc une classe générique pour avoir un minimum de boilerplate :

```scala
trait tString extends Any {
  def unwrap: String
  override def toString: String = this.unwrap
}
trait tStringHelper[T <: tString] {
  def build(str: String): Option[T]
  protected val buildErrKey = "error.wrongFormat"
  protected val buildErrMsg = "Wrong format"
  implicit def pathBinder = new PathBindable[T] {
    override def bind(key: String, value: String): Either[String, T] = build(value).toRight(buildErrMsg)
    override def unbind(key: String, value: T): String = value.unwrap
  }
  implicit def jsonFormat = Format(new Reads[T] {
    override def reads(json: JsValue): JsResult[T] = json.validate[String].map(id => build(id)).filter(_.isDefined).map(_.get)
  }, new Writes[T] {
    override def writes(value: T): JsValue = JsString(value.unwrap)
  })
  implicit def formMapping = new Formatter[T] {
    override def bind(key: String, data: Map[String, String]): Either[Seq[FormError], T] = data.get(key).flatMap(build).toRight(Seq(FormError(key, buildErrKey, Nil)))
    override def unbind(key: String, value: T): Map[String, String] = Map(key -> value.unwrap)
  }
}
```

Avec ça, pour créer un nouveau type il faut simplement quelques lignes :

```scala
case class Email(value: String) extends AnyVal with tString {
  def unwrap: String = this.value
}
object Email extends tStringHelper[Email] {
  def build(str: String): Option[Email] = Some(Email(str))
}
```

Pour les IDs, ils sont un peu plus spécifiques du coup j'utilise un trait UUID qui définit leur comportement additionnel ainsi qu'un ID générique. Ce qui donne :

```scala
trait UUID extends Any with tString {
  def toGenericId: GenericId = GenericId(this.unwrap)
}
object UUID {
  def generate(): String = java.util.UUID.randomUUID().toString()
  def toUUID(str: String): Option[String] = 
    Try(java.util.UUID.fromString(str)).toOption.map(_.toString)
}
```

```scala
case class GenericId(id: String) extends AnyVal with tString with UUID {
  def unwrap: String = this.id
 
  def toEventId: EventId = EventId(this.id)
  def toAttendeeId: AttendeeId = AttendeeId(this.id)
  def toExponentId: ExponentId = ExponentId(this.id)
  def toSessionId: SessionId = SessionId(this.id)
}
object GenericId extends tStringHelper[GenericId] {
  def generate(): GenericId = GenericId(UUID.generate())
  def build(str: String): Option[GenericId] = UUID.toUUID(str).map(id => GenericId(id))
 
  implicit def fromUUID(uuid: UUID): GenericId = GenericId(uuid.unwrap)
  implicit def fromEventId(id: EventId): GenericId = GenericId(id.unwrap)
  implicit def fromAttendeeId(id: AttendeeId): GenericId = GenericId(id.unwrap)
  implicit def fromExponentId(id: ExponentId): GenericId = GenericId(id.unwrap)
  implicit def fromSessionId(id: SessionId): GenericId = GenericId(id.unwrap)
}
```

```scala
case class EventId(val id: String) extends AnyVal with tString with UUID {
  def unwrap: String = this.id
}
object EventId extends tStringHelper[EventId] {
  def generate(): EventId = EventId(UUID.generate())
  def build(str: String): Option[EventId] = UUID.toUUID(str).map(id => EventId(id))
}
```

Voilà voilà, vous avez tout maintenant !!! 😀

Comme je le disais en préambule, ce n'est pas forcément la technique ultime mais simplement ce que j'ai mis en place dans mon application. 
Si vous voyez des moyens de faire mieux, je suis preneur 🙂

Comme piste d'amélioration, la fonction `build()` pourrait renvoyer un `Either` au lieu d'une `Option` et on pourrait ajouter des messages d'erreur custom pour 
les différents mappers... À voir à l'usage...

### Bilan

Côté bilan, il faudra voir un peu plus sur le long terme. Mais pour avoir refactoré l'ensemble de mon application, 
je trouve que l'ensemble du code est bien plus clair (le type portant déjà une information sur l'objet, 
on peut en ajouter d'autres dans le nom sans avoir des noms à rallonge) et je me sens bien plus serein avec une codebase mieux typée 
(déjà 8 bugs corrigés uniquement grâce à ça !).

Côté maintenabilité, avec seulement 3 classes génériques (tString, UUID, GenericId), un nouveau type se définit en quelques lignes et intègre une validation.

Côté utilisation je ne vois aucun inconvénient sachant que les transformations "logiques" peuvent être définies comme implicites, 
que celles "risquées" sont simples mais doivent rester explicites et qu'il est possible de revenir à une simple String avec le `.unwrap` 
si besoin (compatibilité autres libs/parties du code).

J'espère que cet article vous aura été bénéfique et que vous y avez appris quelque chose. 
En tous cas, moi, je suis très content d'avoir eu l'occasion d'avancer un peu plus sur mes connaissances de Play framework (qui est très puissant !) et 
de pouvoir toujours plus typer mes applications 😀

![Baby coder](/assets/img/posts/2015-09-01/baby-coder.png)
