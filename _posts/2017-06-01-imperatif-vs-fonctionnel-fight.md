---
layout:      post
title:       "Impératif vs Fonctionnel : Fight !"
banner_1_1:  /assets/img/posts/2017-06-01/imperatif-vs-fonctionnel-fight_1_1.jpg # for lists & twitter summary card
banner_2_1:  /assets/img/posts/2017-06-01/imperatif-vs-fonctionnel-fight_2_1.jpg # for twitter summary_large_image card
banner_21_9: /assets/img/posts/2017-06-01/imperatif-vs-fonctionnel-fight_21_9.jpg # for article banner
author:      loic
categories:  [coding]
tags:        [functional programming, JavaScript, Scala]
---

Salut ! Ca fait un moment que je n'ai plus écrit d'articles ici mais je compte bien m'y remettre avec pas mal de choses sur la programmation fonctionnelle et Scala 😉

Il y a quelques jours j'ai participé à [NCrafts](https://ncrafts.io){:target="_blank"} et en particulier au workshop 
**[Playing with projections](https://github.com/michelgrootjans/playing_with_projections){:target="_blank"}** de [Michel Grootjans](https://twitter.com/michelgrootjans){:target="_blank"}
et [Thomas Coopman](https://twitter.com/tcoopman){:target="_blank"}; je l'ai trouvé génial et je vous le recommande sans réserve !!!  
Son but est d'analyser une liste d'événements d'une application afin d'en extraire différentes informations (projections dans le jargon).
Pour cela, on se base sur les événements d'une application où des joueurs peuvent s'enregistrer,
créer des quiz puis y répondre ([schéma global des événements](https://github.com/michelgrootjans/playing_with_projections/wiki){:target="_blank"}).  
Mais, dans cet article, je vais détourner son but et m'en servir pour comparer le style impératif et fonctionnel en essayant d'avoir 
le code le plus clair et intuitif à chaque fois (au passage, si vous voyez des améliorations je suis preneur ^^).  
Et le tout en JavaScript 🙁 puisque c'est le langage que nous avions choisi lors du workshop...

Bon, commençons très simple, la première tâche est de déterminer le nombre total d'inscriptions. Pour cela, il suffit de compter les événements `PlayerHasRegistered`,
le code est donc plutôt trivial.

Avec le style impératif il faut donc juste un `for` et un `if` :

```javascript
const registeredPlayers = events => {
    let count = 0;
    for(let i=0; i<events.length; i++) {
        if(events[i].type === 'PlayerHasRegistered') {
            count++;
        }
    }
    return count;
};
```

Du côté fonctionnel, encore plus simple, un simple `filter` fait l'affaire :

```javascript
const registeredPlayers = events => {
    return events.filter(e => e.type === 'PlayerHasRegistered').length;
};
```

Quand on compare les deux codes, a différence la plus visible est bien sûr le nombre de lignes : 1 vs 7 !
C'est déjà un gros point mais, le plus important est que le code fonctionnel reflète bien plus l'intention initiale (compter les événements `PlayerHasRegistered`).  
On peut considérer ça comme un détail mais du code court et expressif facilite grandement la compréhension du code 🙂  
Bien sûr, il faut connaître la fonction `filter` mais elle est très simple et son nom est plutôt explicite...
Pour ceux qui ne la connaitraient pas, elle créée simplement un nouveau tableau à partir de l'ancien en conservant uniquement les éléments
pour lesquels la fonction passée en paramètre renvoi `true`. Si elle n'existait pas en JavaScript, on pourrait la coder très simplement :

```javascript
Array.prototype.filter = function(func /* prend un élément en renvoi un booléen */) {
    const res = [];
    for(let i=0; i<this.length; i++) {
        if(func(this[i])) {
            res.push(this[i]);
        }
    }
    return res;
};
```

On voit ici qu'elle est très similaire au code impératif écrit précédemment... En fait, la fonction `filter` (comme celles qu'on verra ensuite) 
permet de définir un comportement habituel (ici, filtrer un tableau) qui pourra être réutilisé à volonté. Plus besoin de le coder à chaque fois \o/

Par ailleurs, le code fonctionnel reflète bien les deux étapes de calcul : filtrer les événements puis les compter, alors que le code impératif fait tout en même temps.
Ce qui semble plus "logique" au regard du résultat attendu mais tends à complexifier le code (même si ici ça reste tout à fait acceptable ^^).  
Sur un exemple aussi simple que ça, on voit déjà que le code fonctionnel encourage à séparer un algorithme en sous-parties (éventuellement réutilisables)
alors que le code impératif encourage à créer du code spécifique qu'il faudra réécrire à chaque fois (notamment pour des comportement très communs comme le `filter`).  
Enfin, on peut noter que la fonction `filter` prends une autre fonction en paramètre, c'est ce qu'on appelle une **fonction d'ordre supérieur** (buzzword powaaa).

Passons maintenant à l'étape suivante, nous voulons faire la même chose mais pour chaque mois et renvoyer une tableau avec le mois et le nombre d'inscriptions.
On ne peut donc plus se contenter d'un simple compteur :

```javascript
const registeredPlayersPerMonth = events => {
    const monthCount = {};
    for(let i=0; i<events.length; i++) {
        const event = events[i];
        if(event.type === 'PlayerHasRegistered') {
            const month = getYearMonth(event);
            if(monthCount[month]) {
                monthCount[month]++;
            } else {
                monthCount[month] = 1;
            }
        }
    }
    const result = [];
    for(let month in monthCount) {
        if(typeof monthCount[month] === 'number') {
            result.push({month: month, registered_players: monthCount[month]});
        }
    }
    return result;
};
```

Ici, le code est déjà plus complexe, on doit gérer autant de compteurs qu'il y a de mois et ensuite formater le résultat comme attendu.
Lire et comprendre le code est déjà beaucoup moins évident et on imagine facilement quelques endroits où pourraient se glisser des bugs...

Du côté fonctionnel en revanche le code se complexifie très peu :

```javascript
const registeredPlayersPerMonth = events => {
    return events
        .filter(e => e.type === 'PlayerHasRegistered')
        .groupBy(getYearMonth)
        .map((monthEvents, month) => ({month: month, registered_players: monthEvents.length}));
};
```

Même si on ne comprends pas exactement ce que font les méthodes, grâce à leur nom on imagine bien l'intention voulue 🙂  
Encore une fois, la comparaison est sans appel, autant sur la taille (4 lignes vs 19) que sur la lisibilité.
On commence aussi à voir que le style impératif est susceptible d'accueillir bien plus de bugs...

Bon, je dois quand même avouer qu'il manque encore en JavaScript certaines fonctions de base que j'ai dû rajouter :

```javascript
Array.prototype.groupBy = function(func /* T => string */) {
    const res = {};
    this.map(e => {
        const key = f(e);
        if(Array.isArray(res[key])) { res[key].push(e); }
        else { res[key] = [e]; }
    });
    return res;
};
Object.prototype.map = function(func /* (T, string) => U */) {
    return Object.keys(this).map(key => f(this[key], key));
};
```

La fonction `groupBy` groupe les éléments d'un tableau en fonction d'une clé (chaîne de caractère) et renvoit une `Map` (objet JavaScript) 
qui a pour valeur la liste des éléments ayant la même clé.  
La fonction `map` existe sur les tableaux (elle permet de créer un nouveau tableau en modifiant chaque élément) mais pas sur les `Map` (objets JavaScript). 
Je l'ai donc ajoutée pour permettre d'obtenir un tableau à partir des valeurs de la `Map` (et éventuellement la clé, en deuxième paramètre).

Nous venons de résoudre les deux premiers challenges du workshop et on a bien vu que le code impératif se complexifie bien plus vite que le code fonctionnel.
Voyons ce que ça peut donner avec le challenge suivant... On doit lister les 10 quiz les plus populaires avec leur id, nom et nombre de fois qu'ils ont été joués.  
Regardons d'abord le code fonctionnel cette fois-ci :

```javascript
const popularQuizs = events => {
    const createdQuizs = events.filter(e => e.type === 'QuizWasCreated').groupBy(e => e.payload.quiz_id);
    const startedGames = events.filter(e => e.type === 'GameWasStarted').groupBy(e => e.payload.game_id);
    return events
        .filter(e => e.type === 'GameWasOpened' && startedGames[e.payload.game_id])
        .groupBy(e => e.payload.quiz_id)
        .map((games, quiz_id) => ({
            quiz_id: quiz_id,
            times_played: games.length,
            quiz_title: createdQuizs[quiz_id][0].payload.quiz_title
        }))
        .sort((a, b) => -(a.times_played - b.times_played) || strComp(a.quiz_title, b.quiz_title))
        .take(10);
};
```

Encore une fois, on voit bien que le style fonctionnel permet d'identifier clairement les différentes étapes de l'algorithme : 
on prend les jeux qui ont été ouverts et démarrés et on les groupe par quiz. 
Ensuite il ne reste plus qu'à formater les données en ajoutant le titre, les trier puis garder uniquement les 10 premiers.

Plutôt direct, non ?

Je vous laisse comparer avec la version impérative :

```javascript
const popularQuizs = events => {
    const gameToQuiz = {};
    const quizToName = {};
    const quizCount = {};
    for(let i=0; i<events.length; i++) {
        const event = events[i];
        if(event.type === 'QuizWasCreated') {
            quizToName[event.payload.quiz_id] = event.payload.quiz_title;
        } else if(event.type === 'GameWasOpened') {
            gameToQuiz[event.payload.game_id] = event.payload.quiz_id;
        } else if(event.type === 'GameWasStarted') {
            const quiz_id = gameToQuiz[event.payload.game_id];
            if(quizCount[quiz_id]) {
                quizCount[quiz_id]++;
            } else {
                quizCount[quiz_id] = 1;
            }
        }
    }
 
    const results = [];
    for(let quiz_id in quizCount) {
        if (typeof quizCount[quiz_id] === 'number') {
            results.push({
                quiz_id: quiz_id,
                times_played: quizCount[quiz_id],
                quiz_title: quizToName[quiz_id]
            });
            results.sort((a, b) => -(a.times_played - b.times_played) || strComp(a.quiz_title, b.quiz_title));
            if(results.length > 10) {
                results.pop();
            }
        }
    }
    return results;
};
```

On commence maintenant à avoir l'habitude, le code fonctionnel est une fois de plus beaucoup plus court 
(forcément puisque pas mal de code est intégré dans les fonctions `map`, `filter`, `groupBy`...). On peut aussi remarque que le code fonctionnel est plutôt déclaratif, 
on décrit les intentions (filtrer, transformer, agréger...) sans définir comment le faire 
(le comment est géré par les implémentations des fonctions `map`, `filter`, `groupsBy`...), ce qui permet éventuellement de les modifier sans toucher au code écrit.

Par exemple, voici l'implémentation fonctionnelle du deuxième challenge en Scala :

```scala
def registeredPlayersPerMonth(events: List[Event]): List[RegisteredPlayers] =
    events
      .collect { case e: PlayerHasRegistered => e }
      .groupBy(getYearMonth)
      .map { case (month, monthEvents) => RegisteredPlayers(month, monthEvents.length) }.toList
```

Si on souhaite paralléliser les traitements, il suffit d'ajouter `.par` :

```scala
def registeredPlayersPerMonth(events: List[Event]): List[RegisteredPlayers] =
    events.par
      .collect { case e: PlayerHasRegistered => e }
      .groupBy(getYearMonth)
      .map { case (month, monthEvents) => RegisteredPlayers(month, monthEvents.length) }.toList
```

Ou pour rendre l'exécution lazy, on remplace simplement les `List` par des `Stream` :

```scala
def registeredPlayersPerMonth(events: Stream[Event]): Stream[RegisteredPlayers] =
    events
      .collect { case e: PlayerHasRegistered => e }
      .groupBy(getYearMonth)
      .map { case (month, monthEvents) => RegisteredPlayers(month, monthEvents.length) }.toStream
```

Bref, le code change très peu (y compris entre JavaScript et Scala) alors qu'on a des exécutions très différentes.

De plus, on voit bien que beaucoup de bugs / fautes d'inattention peuvent se glisser dans le code impératif alors que le code fonctionnel, 
reste bien plus concis, clair et bien moins sujet à erreurs; et ce, d'autant plus si on bénéficie d'un bon système de types 😉  
Essayez d'introduire un bug dans le code Scala qui ne soit pas identifié par le compilateur...

On a principalement vu ici les fonctions de chaînage sur les collections et c'est clairement celles-ci qui m'ont fait accrocher à la programmation fonctionnelle 
mais ce n'est qu'un petit bout pour démarrer... Je pense que ces quelques exemples ont bien illustré mon point mais j'aimerais beaucoup avoir votre avis 
sur ce que vous en avez pensé...

![Scala vs Java](/assets/img/posts/2017-06-01/scala-vs-java.png)

Pour ceux qui le souhaitent, voici l'implémentation complète des challenges basiques du workshop en 
[fonctionnel](https://github.com/loicknuchel/playing_with_projections/blob/add-js-solutions/js/solutions/lkn-projections-fun.js){:target="_blank"} et en 
[impératif](https://github.com/loicknuchel/playing_with_projections/blob/add-js-solutions/js/solutions/lkn-projections-imp.js){:target="_blank"}.

Enfin, pour terminer voici un petit exercice, 
comment coderiez-vous la fonction take (qui prends les n premiers éléments d'un tableau ou tout le tableau s'il est plus petit) ?
