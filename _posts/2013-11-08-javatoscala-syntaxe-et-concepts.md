---
layout:      post
title:       "JavaToScala : syntaxe et concepts"
banner_1_1:  /assets/posts/2013/11/08/javatoscala-syntaxe-et-concepts_1_1.jpg
banner_2_1:  /assets/posts/2013/11/08/javatoscala-syntaxe-et-concepts_2_1.jpg
banner_21_9: /assets/posts/2013/11/08/javatoscala-syntaxe-et-concepts_21_9.jpg
author:      loic
categories:  [coding]
tags:        [bbl, scala, java, recommender system]
---

## Se mettre à Scala

Actuellement développeur Java / Web, j'apprécie particulièrement [Play framework](https://www.playframework.com/){:target="_blank"}
et je commence à vraiment voir de plus en plus de choses sur [Scala](https://www.scala-lang.org/){:target="_blank"}.
C'est pourquoi j'ai décidé de regarder d'un peu plus près ce nouveau langage. Scala est un langage fonctionnel qui s'exécute sur la JVM.
Quand on vient du monde Java (comme moi), on remarque tout de suite la concision du langage mais aussi qu'il est à peu près incompréhensible
(ça me rappelle ma tentative avortée d'apprendre Haskell...). Maintenant que j'ai un peu plus de recul sur ce langage,
que je viens de terminer [Functional Programming Principles in Scala](https://www.coursera.org/learn/progfun1){:target="_blank"}
et que je débute [Principles of Reactive Programming](https://www.coursera.org/course/reactive){:target="_blank"},
je vais aborder une série d'articles sur Scala et ses avantages. Car, il est vrai, une fois habitué aux nouveaux concepts, c'est un langage étonnamment puissant.

![Principles of Reactive Programming in Scala](/assets/posts/2013/11/08/scala-reactive1.png)

## Ce qui change de Java

Avant de partir sur les aspects fondamentaux qui font la puissance de ce langage, je vous propose une petite introduction à la syntaxe et aux concepts de base Scala.

## Classes et interfaces

Java comme Scala sont des langages objet. Les deux langages reposent donc sur des classes. Même si leur syntaxe varie un peu, les concepts sont assez similaires :

```java
public class Person {
  public String name;
  public Integer age;
 
  public Person(String name, Integer age) {
    this.name = name;
    this.age = age;
  }
 
  public String say() {
    return "My name is " + name + ", age " + age;
  }
}
```

```scala
class Person(name: String, age: Int) {
  def say = "My name is " + name + ", age " + age
}
```

Comme vous pouvez le noter, le code Scala est bien plus concis mais tout aussi clair ! La déclaration de la classe, des attributs et du constructeur se fait en une ligne.
Pour la méthode `say`, le type de retour est inféré. On remarque aussi que les `;` et les `{}` sont optionnels.
Autre différence aussi, les classes Scala peuvent être définies partout dans le code, contrairement à Java où chaque classe doit être dans un fichier qui porte le même nom.

## Trait

Pour les interfaces (Java), l'équivalent Scala est un [trait](https://blog.developpez.com/djo-mos/p6209/java/scala/title_103){:target="_blank"}.
Mais nous allons voir qu'il est finalement bien plus qu'une interface.
Tout d'abord, comme une interface, il définit des méthodes qui devront être implémentées dans les classes qui en héritent et, comme en Java,
une classe peut hériter de plusieurs trait. Voici les implémentations Java et Scala qui se ressemblent.

```java
// File HasName.java
public interface HasName {
  String hasName();
}
 
// File HasAge.java
public interface HasAge {
  Integer getAge();
}
 
// File Person.java
public class Person implements HasName, HasAge {
  public String name;
  public Integer age;
 
  public Person(String name, Integer age) {
    this.name = name;
    this.age = age;
  }
 
  public String say() {
    return "My name is " + name + ", age " + age;
  }
 
  public Integer getAge() {
    return age;
  }
 
  public String hasName() {
    return name;
  }
}
 
// File Main.java
public class Main {
  public static void main(String[] args) {
    Person p = new Person("Loïc", 25);
    System.out.println(p.say());
  }
}
```

```scala
trait hasName {
  def getName: String
  def hello = "Hello " + getName
}
trait hasAge {
  def getAge: Integer
}
 
class Person(name: String, age: Int) extends hasName with hasAge {
  def say = "My name is " + name + ", age " + age
  def getName = name
  def getAge = age
}
 
val p = new Person("Loïc", 25)
println(p.say)   // My name is Loïc, age 25
println(p.hello) // Hello Loïc
```

Tout d'abord, il faut noter que les deux codes ne sont pas équivalents. Le trait Scala `hasName` implémente la méthode `hello`,
ce qui est impossible à faire avec les interfaces Java. Un trait est donc à mi-chemin entre l'interface et la classe abstraite Java
et profite des avantages des deux (implémentation de méthodes et multi-héritage).
Une autre chose, assez étrange, est que lorsqu'une classe étend plusieurs trait, on utilise le mot clé `extends` pour le premier et le mot clé `with` pour les autres.
C'est une étrangeté de Scala que je n'explique pas encore (si quelqu'un à une réponse...).

## Object

Par ailleurs, Scala offre d'autres structures objet qui peuvent être très utiles. Je parle notamment des `object` et des `case class`.
Les objets sont des classes scala directement instanciées comme des singletons :

```java
// object Scala => singleton Java ou enum Java
// mais reste assez différent malgré tout
```

```scala
object Null {
  override def toString = "null object"
}
println(Null)         // null object
println(Null == Null) // true
```

Ils font alors référence à une seule instance et peuvent être définis comme des constantes qui offrent toutes les possibilités d'une vraie classe (héritage, composition...).
Si une classe et un objet existent avec le même nom, l'objet est alors appelé "companion object". Ils doivent être définis dans le même fichier source scala.
Cet objet permet de définir des attributs ou méthodes globales à cette classe. C'est approximativement la partie static des objets Java. Par exemple :

```scala
class Talk {
  def sayHi = "Hi everybody !"
}
object Talk {
  def sayHello = "Hello everybody !"
}
 
val talk = new Talk
println(talk.sayHi)    // Hi everybody !
println(Talk.sayHello) // Hello everybody !
```

## Case class

Parlons maintenant des case classes. Ce sont des classes qui permettent de faire correspondre une classe avec son contenu.
Typiquement, elles permettent de définir de manière pratique de nouveaux types. Comme c'est pas très clair, voici un exemple :

```java
// Pas d'équivalent Java
```

```scala
trait Expr
case class Number(n: Int) extends Expr
case class Sum(e1: Expr, e2: Expr) extends Expr
```

Ce sont des classes normales précédées du mot clé `case`.
Grâce à ce mot clé, le compilateur va créer un objet compagnon qui nous permet de créer ces classes sans le mot clé `new`. Il est donc possible d'écrire :

```scala
val e = Sum(Number(2), Number(3))
```

Ce type particulier de classes est aussi très intéressant lorsqu'il est combiné avec le
[pattern matching](https://blog.engineering.publicissapient.fr/2012/01/11/scala-jouer-avec-le-pattern-matching/){:target="_blank"}, qui est pour moi une des forces de Scala.
J'en parlerai un peu plus précisément dans un autre article mais en quelques mots, c'est une sorte de switch case étendu.
En Java, un switch case n'est possible que sur des éléments simples et avec des valeurs discrètes (Integer ou Enum)
alors que le pattern matching Scala fonctionne sur tout type d'expression. Et en particulier les case classes.
Ainsi, si nous voulons afficher une expression, il suffit d'écrire :

```scala
def show(e: Expr): String = e match {
  case Number(n) => n.toString
  case Sum(e1, e2) => show(e1) + " + " + show(e2)
}
println(show(e)) // 2 + 3
```

Ou de remplacer le toString du trait Expr  :

```scala
trait Expr {
  override def toString = this match {
    case Number(n) => n.toString
    case Sum(e1, e2) => e1 + " + " + e2
  }
}
```

## La déclaration de variables

A la différence de Java, pour créer une variable en Scala, on précise simplement le mot clé `var` sans préciser son type.
Celui-là sera automatiquement déduit de l'expression à droite du =. Il existe aussi le mot clé `val` pour définir des constantes.
Ce mot clé est, contrairement à Java (avec l'utilisation du final), beaucoup plus utilisé que le précédent.
En effet, Scala étant un langage fonctionnel, il est préférable de créer de nouveaux objets que de les modifier.
Et enfin, il existe le mot clé `def` pour définir des expressions.

Pour voir les subtilités entre ces différents mots clés,
je vous propose d'utiliser cette classe qui nous permettra d'afficher "Create MyClass[name]" à chaque fois qu'une instance est créé :

```java
public class MyClass {
  public String name;
 
  public MyClass(String name) {
    System.out.println("Create MyClass[" + name + "]");
    this.name = name;
  }
 
  public String toString() {
    return "MyClass[" + name + "]";
  }
}
```

```scala
class MyClass(name: String) {
  println("Create MyClass[" + name + "]")
  override def toString = "MyClass[" + name + "]"
}
```

Commençons par le mot clé `var` :

```java
MyClass v = new MyClass("var");         //> Create MyClass[var]
System.out.println(v);                  //> MyClass[var]
v = new MyClass("var2");                //> Create MyClass[var2]
System.out.println(v);                  //> MyClass[var2]
```

```scala
var v = new MyClass("var")              //> Create MyClass[var]
println(v)                              //> MyClass[var]
v = new MyClass("var2")                 //> Create MyClass[var2]
println(v)                              //> MyClass[var2]
```

Comme nous pouvons le voir, un objet est créé aux lignes 1 et 3 grâce à l'opérateur `new`. Et les lignes 2 et 4 affichent bien les contenu attendu.

Avec le mot clé `val` (ou final en Java), impossible de réaffecter un nouvel objet à la constante `c`, le compilateur le refuse !

```java
final MyClass c = new MyClass("val");   //> Create MyClass[val]
System.out.println(c);                  //> MyClass[val]
```

```scala
val c = new MyClass("val")              //> Create MyClass[val]
println(c)                              //> MyClass[val]
```

Nous pouvons donc créer l'objet une première fois mais pas le réaffecter comme c'est fait en ligne 3 avec le `var`.

Pour le mot clé `def`, les choses sont encore différentes. On définit une expression :

```java
// Pas d'équivalent Java
```

```scala
def d = new MyClass("def")
println(d)                              //> Create MyClass[def]
                                        //| MyClass[def]
println(d)                              //> Create MyClass[def]
                                        //| MyClass[def]
```

Comme pour le mot clé `val`, impossible de redéfinir l'expression. En revanche, on remarque qu'à la ligne 1 aucun objet est créé.
C'est simplement l'expression qui est définie, une sorte d'alias. Et dès que l'on souhaite l'utiliser (l'afficher par exemple),
l'expression est évaluée, ce qui entraîne la création d'un objet de type `MyClass`. Et cela, à chaque fois !!! `d` n'est pas un objet de type `MyClass`
mais une expression qui exécute `new MyClass("def")` lorsqu'elle est évaluée.

## Conclusion

J'espère que cet article vous permettra de lire un peu plus facilement le code Scala.
Comme c'est une première pour moi d'écrire de tels articles, n'hésitez pas à faire des remarques constructives dessus <i class="emoji wink"></i>
