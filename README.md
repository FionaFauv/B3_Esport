<div align="center">

<!-- En-tête avec gradient -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,16,18&height=200&section=header&text=Projet%20Javascript%20B3%202025-2026&fontSize=40&fontAlignY=35&animation=twinkling&fontColor=fff" />



  
### **Sujet du projet : Plateforme de paris E-Sportifs**
[Lien du sujet](https://github.com/CinquinAndy/js-frameworks/blob/master/LA-FIN-Projet/Projet-Sujet.md)

<br>
<p align="center">
<img src="https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF">
<img src ="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=fff">
<img src="https://img.shields.io/badge/pocketbase-%23b8dbe4.svg?style=for-the-badge&logo=Pocketbase&logoColor=black">
</p>
</div>

> [!IMPORTANT]
>  *Premier projet d'application web sur le langage JS/TS, l'application a encore quelques erreurs et sera amélioré après note finale. :)*
>  *Premier rendu le 17 novembre 2025*

<br>

--- 

## Description du projet

Le projet est de réaliser une application web pour un client fictif : Une plateforme de paris E-Sportifs.

### Objectifs donnés 

<div align="center">

| Objectif | Description |
|------------|----------------|
| **Page Landing** | Page d'accueil, présentation du projet et l'idée. Accès à la page connexion. |
| **Authentification Admin/Visiteur** | Pouvoir s'authentifier avec un email et un mot de passe. (Page dite optionnel pour la V1 du projet.) |
| **Coté Admin - Page de création d'équipes** | Pouvoir créer, modifier, supprimer une équipe. |
| **Coté Admin - Page de création de Matchs** | Pouvoir créer, modifier, supprimer un match. |
| **Coté Visiteur - Page de paris ouvert sur les matchs ouvert** | Pouvoir visualiser les matchs créer par les admins. et pouvoir parier sur le.s match.s |
| **Coté Visiteur - Page de de résultat des matchs** | Pouvoir visualiser les matchs créer par les admins. Avec le score final. |
| **Coté Visiteur - Page des gains** | Pouvoir visualiser les gains perdus / gagner après le.s match.s terminé.s. |

</div>

> [!NOTE]
> N'ayant pas la possibilité de tout réaliser dans les temps imparti, je me suis concentrée sur un petit rendu fonctionnelle.

--- 

### Accès login Admin/Visiteur de l'application

- Admin - lol_expert@example.com |12345678
- Visiteur - fiofio@gmail.com |12345678

--- 

### Tâches Réalisées

<div align="center">

<table>
<thead>
<tr>
<th width="5%">#</th>
<th width="25%">Tâche</th>
<th width="30%">Description</th>
<th width="30%">Problème(s) rencontré</th>
</tr>
</thead>
<tbody>

<tr>
<td align="center"><b>1</b></td>
<td><b>Page d'authentification</b></td>
<td>Première étape de mon projet : pouvoir me connecter en tant qu'admin sur ma page /admin.</td>
<td>
<b>PocketBase : </b> Problème à me connecter sur la BDD depuis mon .env, le temps d'adaption entre PocketBase et l'utilisation de Next.js m'a fait perdre du temps.<br>
<b>API Rules : </b> Problème dû au manque de connaissance du bon fonctionnement de Pocketbase.<br>
</td>
</tr>

<td align="center"><b>3</b></td>
<td><b>Partie Admin</b></td>
<td>Créer une page où l'admin arrivera lors de sa connexion. Un tableau de bord</td>
<td>
<b>Back-End :</b> J'avais l'idée de faire un tableau de bord dynamique (équipes total : ..., matchs crées : ...) mais trop de soucis, alors la moitié est écrit en dur.<br>
</td>
</tr>

<tr>
<td align="center"><b>2</b></td>
<td><b>Création d'équipes</b></td>
<td>Créer une page pouvant à l'utilisateur (admin) de créer, modifier, supprimer.</td>
<td>
<b>Back-end :</b> Problème lié à PocketBase ne réussissant pas à créer correctement une équipe. après la création de /compenents j'ai pu créer et modifier aisément.<br>
<b>Front-end :</b> Mon pop-up création d'équipes ne s'affichait pas correctement (voir pas du tout), j'ai dû revoir mon code et le faire lire par une personne extérieur. (J'avais mal écrit :p)<br>
</td>
</tr>

<tr>
<td align="center"><b>3</b></td>
<td><b>Création des Matchs</b></td>
<td>Créer une page pouvant à l'utilisateur (admin) de créer, modifier, supprimer.</td>
<td>
<b>Back-End :</b> Problème partie modification, impossible de le modifier. J'ai dû supprimer cette partie n'ayant plus de temps.<br>
<b>Front-End</b> J'ai eu mal à faire un COMBO pour laisser la possibilité à l'utilisateur de choisir le pays. Je l'ai fait en dur (mon idée est de le faire en dynamique ... J'ai abandonnée l'idée et remis à plus tard)
</td>
</tr>

<tr>
<td align="center"><b>4</b></td>
<td><b>Partie Visiteur</b></td>
<td>Créer une page où le visiteur arrivera lors de sa connexion. </td>
<td>
<b>Rendu :</b> Il arrive directement sur les matchs crées. j'aurai voulu faire quelque chose de plus propre.<br>  
<b>Back-End :</b> Problème sur la visualisation. Soucis de droit avec les API. J'ai eu du mal à tout rendre (même problème coté admin)<br>
<b>Front-End</b> il y a un bouton "Créer un paris" qui ne marche pas. Car je n'ai pas pu effectuer cet ajout sur la BDD et le back par manque de temps ... Alors le visiteur ne pas faire la moitié qui a été demandé.
</td>
</tr>

</tbody>
</table>
</div>

<br>

> [!WARNING]
> La sécurité de l'application (injection SQL ...) n'a pas été fait. De ce fait mon application n'est pas protégé du tout...

<br>

--- 

## Stack Technologique

<div align="center">

<table>
<tr>
<td align="center" width="20%">
<h3>Langage</h3>
<img src="https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF">
</td>
<td align="center" width="15%">
<h3>Framework</h3>
<img src ="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
</td>
<td align="center" width="25%">
<h3>Editeur de code</h3>
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=fff">
</td>
<td align="center" width="25%">
<h3>Base de données</h3>
<img src="https://img.shields.io/badge/pocketbase-%23b8dbe4.svg?style=for-the-badge&logo=Pocketbase&logoColor=black">
</td>
<td align="center" width="20%">
<h3>API Client</h3>
<img src="https://img.shields.io/badge/Bruno-F4AA41?logo=Bruno&logoColor=black" />
</td>
</tr>
</table>

</div>

--- 


### Compétences pour le projet

<div align="center">

<table>
<tr>
<td align="center" width="20%">
<h3>Javascript/Typescript</h3>
<progress max="100" value="70">10%</progress>
</td>
<td align="center" width="15%">
<h3>Next.js</h3>
<progress max="100" value="70">0%</progress>
</td>
<td align="center" width="25%">
<h3>PocketBase</h3>
<progress max="100" value="70">0%</progress>
</td>
<td align="center" width="20%">
<h3>Bruno</h3>
<progress max="100" value="70">0%</progress>
</td>
</tr>
</table>

</div>

> [!NOTE]
> On commence tous quelque part ! :D

*Pourquoi avoir choisi ses logiciels ?*
> *L'idée est tout de même d'apprendre tout ce je pouvais avec ce projet. je ne voulais pas le terminer à 100% en connaissant déjà la moitié, je voulais partir à zéro et réussir à me débrouiller. :)*

---

## Ressources

<div align="center">

<table>
<tr>
<td width="33%" valign="top">

### Documentation officielle

- [Docs PocketBase](https://pocketbase.io/docs/)
- [Docs Next.js](https://nextjs.org/docs)
- [Docs TypeScript](https://www.typescriptlang.org/docs/)

</td>
<td width="33%" valign="top">

### Cours supplémentaires

- [Cours Framework JS - Andy Cinquin](https://andy-cinquin.fr/course)
- [Codédex](https://www.codedex.io/react)

</tr>
</table>

</div>

---

<!-- Footer avec vague -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,15,18&height=100&section=footer" />

<div align="center">
<sub>© 2025-2026</sub>
</div>
