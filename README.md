# deez-web
Application créer en 5 jour dans le cadre de la formation Développeur front-end à l'école multimédia

Cetta application contient 3 Pages:
- Une page principale qui permet d'écouter une musique en favoris en random 
- Une page de recherche qui utilise l'API de deezer pour récupérer des musiques en fonction de ce qui est entré dans le formulaire
- Une page de favories qui permet d'afficher tout les favories de l'utilisateur.

En plus de ces fonctionnalités de base, mon application contient d'autres fonctionnalités: 
- Les recherches sont enregistrés pendant 5 minutes dans "un système de cache" ce qui permet de charger des requêtes que l'utilisateur
  à déjà effectuer même s'il pert sa connection internet.
- Si l'API de deezer prend trop de temps à répondre (timeout), l'application essayer de se reconnecter un minimun de 5 fois avant d'abandonner
  la requête.
- Lors d'une requête à l'api deezer, celle-ci ne nous retourne que 25 résultats, pour contrer se problème l'application detecte quand l'utilisateur
  arrive en bout de page et fait une requête sur les prochains résultats afin de les afficher à la suite (scroll infini).
- Lorsque l'utilisateur clique sur le boutton play, la musique se met à jouer en bas à droite de l'écran se qui permet à l'utilisateur
  de continuer à naviguer sur l'application sans arrêter la musique.
