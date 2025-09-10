# 📘 Rappels des fondamentaux en Java

Bienvenue dans cette première partie de la formation.  
Avant de plonger dans la création d’un SSO avec Spring Boot, il est indispensable de réviser ensemble les bases de Java.  
Ce rappel a pour but de s’assurer que tout le monde maîtrise la syntaxe, la logique objet et les outils nécessaires.

---

## Objectifs

À la fin de ce module, vous serez capable de :
- Expliquer ce qu’est Java et son origine
- Comprendre la syntaxe de base (variables, conditions, boucles)
- Manipuler des classes, objets, attributs et méthodes

---

## Introduction à Java

Java est un langage de programmation orienté objet, créé en **1995** par *James Gosling* chez Sun Microsystems (aujourd’hui propriété d’Oracle).  
Son slogan : **"Write once, run anywhere"** (Écris une fois, exécute partout).

En effet, pour exécuter du Java, le code est d'abord compilé en bytecode, puis ensuite il est exécuté par la JVM (Java Virtual Machine) 


### Pourquoi Java est important dans le web moderne ?
- Utilisé dans **Spring / Spring Boot** pour les applications d’entreprise
- Grande communauté, nombreux frameworks et bibliothèques
- Énorme stabilité (banques, grandes entreprises, systèmes critiques)

---

## 📝 Syntaxe de base en Java

### Structure minimale d’un programme Java

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
