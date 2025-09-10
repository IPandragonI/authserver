# Introduction à Java

Java est un **langage de programmation orienté objet**, créé en **1995** par *James Gosling* chez **Sun Microsystems** (aujourd’hui propriété d’Oracle).  
Son slogan est **"Write once, run anywhere"** (Écris une fois, exécute partout).


Aujourd’hui, Java est surtout utilisé dans :

- Les **applications d’entreprise** (banques, assurances, e-commerce…)
- Le **développement web** (via Spring, Jakarta EE…)
- Les **applications mobiles Android**
- Certains **systèmes embarqués** et logiciels bureautiques

Contrairement à des langages compilés directement en langage machine (comme le C ou le C++), Java passe par une étape intermédiaire :

1. Le code source est **compilé en bytecode**
2. Ce bytecode est ensuite exécuté par la **JVM (Java Virtual Machine)**

Ainsi programme écrit une fois peut tourner sur **Windows, Linux, macOS, Android…** sans modification.

---


## Syntaxe de base en Java

### Structure minimale d’un programme Java

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

- `public class Main` -> Déclaration d’une classe (ici, la classe `Main`)
- `public static void main(String[] args)` -> Point d’entrée du programme Java
- `System.out.println()` -> Affiche du texte dans la console

### Détail de la méthode `main`

Explication de la ligne :
```java
public static void main(String[] args)
```

- **`public`** : c’est un **modificateur d’accès**.  
  Cela signifie que la méthode `main` est **accessible partout** (y compris par la JVM lorsqu’elle démarre le programme).

- **`static`** : cela indique que la méthode appartient à la **classe** et non à un objet spécifique.  
  Autrement dit, on peut exécuter `main` **sans créer d’instance** de la classe `Main`.

- **`void`** : c’est le **type de retour** de la méthode.  
  Ici, `void` signifie que la méthode ne **retourne rien**.

- **`String[] args`** : paramètre de la méthode, qui correspond à un **tableau de chaînes de caractères**.  
  Il permet de **passer des arguments** au programme depuis la ligne de commande.

---

### Variables et types

Java est un langage **fortement typé et statiquement typé**, cela signifie que chaque variable doit avoir un **type défini à la compilation**, et ce type ne peut pas changer ensuite.

Voici quelques exemples de déclaration de variables en Java :

```java
int age = 21;          // entier
double poids = 75.5;   // nombre à virgule flottante
boolean isActive = true; // booléen
String nom = "Jean";   // chaîne de caractères
```

Java fournit des **types primitifs** intégrés au langage, qui représentent les valeurs les plus simples.

Exemples :

- `int` -> nombre entier (ex : 42)
- `double` -> nombre décimal (ex : 3.14)
- `boolean` -> valeur logique (true / false)
- `char` -> un seul caractère (ex : `'A'`)


À côté des primitifs, Java propose aussi des **classes** qui servent de types.  
Exemple :

- `String` -> représente une chaîne de caractères (ex : `"Bonjour"`)


### Conditions

```java
int age = 18;

if (age >= 18) {
    System.out.println("Majeur");
} else {
    System.out.println("Mineur");
}
```

---

On peut tester plusieurs cas différents grâce à `else if` :

```java
int note = 15;

if (note >= 16) {
    System.out.println("Très bien");
} else if (note >= 12) {
    System.out.println("Assez bien");
} else if (note >= 10) {
    System.out.println("Passable");
} else {
    System.out.println("Échec");
}
```

---

Pour les cas simples, on peut utiliser l’opérateur ternaire `? :` :

```java
int age = 20;
String statut = (age >= 18) ? "Majeur" : "Mineur";
System.out.println(statut);
```

---

### Boucles

La boucle `for` est utilisée lorsqu’on sait **à l’avance** combien de fois on veut répéter une action.

```java
for (int i = 0; i < 5; i++) {
    System.out.println("i = " + i);
}
```

Décomposition :

- `int i = 0` -> initialisation (variable de départ)
- `i < 5` -> condition de poursuite
- `i++` -> incrémentation à chaque tour

Ici, le programme affiche `i` de 0 à 4.

---

La boucle `while` s’exécute **tant que** la condition est vraie.

```java
int j = 0;
while (j < 5) {
    System.out.println("j = " + j);
    j++;
}
```

Ici, la boucle continue tant que `j < 5`.

---

Le parcours de collection

```java
String[] fruits = {"Pomme", "Banane", "Orange"};

for (String fruit : fruits) {
    System.out.println(fruit);
}
```

Ici, la boucle parcourt chaque élément du tableau sans se soucier de l’index.