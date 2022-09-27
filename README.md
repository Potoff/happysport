# HappySport

<img src="https://github.com/Potoff/happysport/blob/main/public/images/logo-readme.png"> ECF 2022 STUDI - Promo Archimede - Developpeur Web Fullstack

## 🧪 Test de l'application

### Pour tester l'application en tant qu'administrateur : 

<a href="https://happysport.paul-dem.com">Lien du site en ligne</a>
    
   - Login : admin@happysport.com
- Mdp : admin

ℹ️ Vous pourrez vous connecter en tant que "Franchisé" ou "Salle" une fois les entités créées dans l'application à partir du compte administrateur. Les login seront envoyés par mail.

## 🔌 Technologies utilisées

  * Node JS et NPM
  * Express
  * Handlebars
  * Sequelize
  * Postgresql
  * Mailjet
  * Booststrap


⛔ L'installation de Node JS, NPM et postgresql sont indispensables pour l'utilisation de cette application en local. Pensez à les installer avant de passer à la suite ! Pensez également à vous créer un compte mailjet pour profiter pleinement de l'application avec toutes les fonctionnalités.

## 💻 Utilisation de l'application en local

1. A l'aide du terminal, placer vous dans l'espace de travail de votre choix et copiez la commande suivante : 
 ```
 git clone https://github.com/Potoff/happysport.git
 ```
2.  Rendez-vous dans le dossier en tapant : ```cd happysport```
3.  Installez les dépendances avec : ```npm install```
4.  Creez un fichier **.env** à la racine du dossier et y intégrer les variables d'environnement suivantes correspondants avec les votres : 
```
PORT=3000
DB_HOST=127.0.0.1
DB_USERNAME='userNamePostGres'
DB_PASSWORD='postgresPassword'
NODE_ENV='development'
MJ_APIKEY_PUBLIC='publickey mailjet'
MJ_APIKEY_PRIVATE='privatekey mailjet'
```
5. Si besoin, pensez à changer le nom de la base de donnée dans le fichier suivant : *config/config.js*
6. Lancer l'application avec : 
```
npm run dev
```
7. Ouvrez votre navigateur et rendez-vous sur _*localhost:3000*_ pour tester l'application
8. Enjoy 😎

## 📃 Mode d'emploi

### 🧑‍💻 Administrateur 

En tant qu'administrateur, vous allez pouvoir gérer : 
* Les franchises
* Les salles
* Les modules

En vous connectant, vous verrez d'office la liste de toutes les franchises sous la forme de cartes. 
Sur chacune d'entre elles, se trouvent 3 boutons d'action qui vous invitent à modifier, supprimer ou afficher la franchise concernée. Une barre de recherche vous permet d'affiner cette liste.
Le menu en haut vous invitera à vous diriger vers le menu des modules pour gérer les permissions (créer, modifier ou supprimer). 
Le menu salle vous permettra de gérer les salles et leurs permissions et d'affiner votre recherche, de la même manière que pour les franchises.
Pour donner des permissions aux franchises ou/et salles, il faut accèder à la page de modification de celle souhaitée en cliquant sur le crayon correspondant .
A chaque création ou modification, un email sera envoyé au mail de contact des personnes concernées.
Chaque franchise peut avoir plusieurs salles mais une salle appartient à une seule franchise : ainsi, à la suppression d'une franchise, les salles liées seront également supprimées.
De même, un module supprimé pour une franchise sera également supprimé pour la salle.

### 🧑‍🔧 Franchise

En tant que franchisé, vous aurez accès à une interface en lecture pour consulter les droits accordées à vos salles ainsi qu'à votre profil. 
Les identifiants vous seront communiqués par mail lorsque l'administrateur aura créé votre compte. Vous pouvez répondre à ce mail pour toute demande.

### 🧑‍🏭 Salle

En tant que salle, vous aurez accès à une interface en lecture seule pour consulter votre profil uniquement (et donc vos permissions).
Les identifiants vous seront communiqués par mail lorsque l'administrateur aura créé votre compte. Vous pouvez répondre à ce mail pour toute demande.
