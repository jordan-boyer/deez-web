# Deezweb
Application créée en 5 jours dans le cadre de la formation Développeur front-end à l'école multimédia

Cette application contient 3 Pages:
- Une page principale qui permet d'écouter une musique en favoris en aléatoire.
- Une page de recherche qui utilise l'API de deezer pour récupérer des musiques en fonction de ce qui est entré dans le formulaire.
- Une page de favoris qui permet d'afficher tout les favoris de l'utilisateur.

En plus de ces fonctionnalités de base, mon application contient d'autres fonctionnalités: 
- Les recherches sont enregistrées pendant 5 minutes dans "un système de cache" ce qui permet de charger des requêtes que l'utilisateur
  a déjà effectuer même s'il perd sa connexion internet.
- Si l'API de deezer prend trop de temps à répondre (timeout), l'application va essayer de se reconnecter un minimun de 5 fois avant    d'abandonner la requête.
- Lors d'une requête à l'api deezer, celle-ci ne nous retourne que 25 résultats, pour contrer se problème l'application détecte quand l'utilisateur arrive en bout de page et fait une requête sur les prochains résultats afin de les afficher à la suite (scroll infini).
- Lorsque l'utilisateur clique sur le bouton play, la musique se met à jouer en bas à droite de l'écran ce qui permet à l'utilisateur
  de continuer à naviguer sur l'application sans arrêter la musique.

# Installation

- git clone https://github.com/jordan-boyer/deez-web.git
- npm install
- npm run dev
