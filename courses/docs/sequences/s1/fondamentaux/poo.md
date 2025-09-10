## La Programmation Orientée Objet (POO)

Java est **orienté objet**, ce qui signifie qu’on structure le code avec des **classes** et des **objets** pour représenter des concepts réels.

### Exemple de classes et objets

```java
public class Brand {
    private String name;
    private String country;

    // Constructor
    public Brand(String name, String country) {
        this.name = name;
        this.country = country;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    // toString method
    @Override
    public String toString() {
        return name + " (" + country + ")";
    }
}

public class Car {
    private Brand brand;
    private int year;

    // Constructor
    public Car(Brand brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    // Getters and setters
    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void displayInfo() {
        System.out.println("Car: " + brand.toString() + ", Year: " + year);
    }
}
```

### Utilisation des classes

```java
public class Main {
    public static void main(String[] args) {
        Brand Renault = new Brand("Renault", "FRANCE");
        Car clio = new Car(Renault, 2020);

        clio.displayInfo(); // Affiche : Car: Renault (FRANCE), Year: 2020
    }
}
```

---

## 📦 Packages

Un **package** permet d’organiser et ranger les classes dans un projet.
La différence avec un dossier classique est que le package fait partie du nom complet de la classe, ainsi on évite les conflits de noms.

```java
package com.fyc.sso;

public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

---

### Exercice pratique (30 min) : Gestion d’une bibliothèque

Dans cet exercice, vous allez créer un petit système pour gérer une **bibliothèque**, en utilisant les concepts de **POO** : classes, objets, attributs et méthodes.

---

#### Étapes

1. **Créer une classe `Author`**
    - Attributs :
        - `name` (String) -> nom de l’auteur
        - `country` (String) -> pays d’origine
    - Méthodes :
        - Constructeur
        - Getters et setters
        - `toString()` -> retourne `"name (country)"`

2. **Créer une classe `Book`**
    - Attributs :
        - `title` (String) -> titre du livre
        - `author` (Author) -> auteur du livre
        - `year` (int) -> année de publication
    - Méthodes :
        - Constructeur
        - Getters et setters
        - `displayInfo()` -> affiche `"Title: <title>, Author: <author>, Year: <year>"`

3. **Créer une classe `Library`**
    - Attributs :
        - `name` (String) -> nom de la bibliothèque
        - `books` (ArrayList<Book>) -> liste des livres
    - Méthodes :
        - `addBook(Book book)` -> ajoute un livre à la liste
        - `removeBook(Book book)` -> supprime un livre à la liste
        - `displayBooks()` -> affiche tous les livres
        - `findBooksByAuthor(String authorName)` -> affiche tous les livres d’un auteur donné
        - Bonus : `findBooksAfterYear(int year)` -> affiche les livres publiés après une certaine année

---

#### Classe Main attendu

```java
public class Main {
    public static void main(String[] args) {
        Author rowling = new Author("J.K. Rowling", "UK");
        Author orwell = new Author("George Orwell", "UK");

        Book hpOne = new Book("Harry Potter and the Philosopher's Stone", rowling, 1997);
        Book hpTwo = new Book("Harry Potter and the Chamber of Secrets", rowling, 1998);
        Book nineteenEightyFour = new Book("1984", orwell, 1949);

        Library myLibrary = new Library("My Super Library");

        myLibrary.addBook(hpOne);
        myLibrary.addBook(hpTwo);
        myLibrary.addBook(nineteenEightyFour);

        myLibrary.displayBooks();

        ArrayList<Book> booksFromJK = myLibrary.findBooksByAuthor("J.K. Rowling");
        booksFromJK.forEach(book -> System.out.println(book.displayInfos()));

        ArrayList<Book> booksAfterX = myLibrary.findBooksAfterYear(2000);
        booksAfterX.forEach(book -> System.out.println(book.displayInfos()));
    }
}
```

---

### Correction

<iframe width="640" height="360" src="https://www.youtube.com/embed/RXog7QOF0yM" frameborder="0" allowfullscreen></iframe>

---

Pour vous aider, voici la documentation officielle de Java sur la POO :

- [Classes et objets](https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html)
- [Packages](https://docs.oracle.com/javase/tutorial/java/package/index.html)



