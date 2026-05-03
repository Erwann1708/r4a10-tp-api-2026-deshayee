# NutriScope - Analyseur d'Apports Nutritionnels

**NutriScope** est une application web permettant de rechercher facilement des produits alimentaires et d'analyser leurs apports nutritionnels (Calories, Protéines, Glucides, Lipides). 

Ce projet a été réalisé dans le cadre du **TP-API (R4.A.10 - Compléments Web JavaScript côté client)** de l'IUT INFO de Grenoble.

🔗 **[Découvrir l'application en ligne](https://erwann1708.github.io/r4a10-tp-api-2026-deshayee/)**

---

## 🎯 Fonctionnalités Principales

* **Recherche de produits :** Interrogation en temps réel de la base de données publique [Open Food Facts](https://world.openfoodfacts.org/).
* **Affichage clair des Macros :** Les données complexes de l'API sont nettoyées et présentées sous forme de cartes modernes et lisibles.
* **Gestion des Favoris :** * Ajout et suppression de recherches favorites en un clic.
    * Persistance des données côté client grâce au `LocalStorage`.
    * boîtes de dialogue de confirmation avant suppression.
* **Architecture MVC :** Code rigoureusement structuré en MVC.

## 🛠️ Technologies Utilisées

* **HTML5**
* **CSS3** 
* **JavaScript (ES6+)** 
* **API :** Open Food Facts

> **⚠️ Avertissement concernant l'API :** L'API publique d'Open Food Facts peut parfois subir des surcharges ou des micro-coupures entraînant des "Erreurs de connexion au serveur". L'application tente de s'y reconnecter automatiquement, mais si le problème persiste, veuillez patienter quelques instants avant de chercher à nouveau.

---

## 🚀 Installation en local

Si vous souhaitez faire tourner le projet sur votre machine :

1. Clonez ce dépôt :
   ```bash
   git clone [https://github.com/erwann1708/r4a10-tp-api-2026-deshayee.git](https://github.com/erwann1708/r4a10-tp-api-2026-deshayee.git)