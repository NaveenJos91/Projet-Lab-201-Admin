# The Beaches Tour - Admin Dashboard

## Description

Interface d'administration en React pour gérer les dates de concerts de la tournée "The Beaches".  
Utilise Firebase pour l'authentification et Firestore pour la gestion des données.

## Fonctionnalités

- Authentification (email/mot de passe)
- Ajout, modification, suppression des dates de concerts
- Liste des dates affichée dynamiquement
- Confirmation avant suppression
- Responsive design

## Technologies

- React (Create React App)
- Firebase (Auth, Firestore)
- Tailwind CSS

## Installation

1. Cloner le dépôt  
2. Installer les dépendances : `npm install`  
3. Configurer Firebase dans `src/firebase/firebaseconfig.js`  
4. Lancer en local : `npm start`

## Déploiement

- Construire : `npm run build`  
- Déployer le dossier `build/` sur un hébergement web

## Structure

src/
├── components/
├── context/
├── firebase/
├── screens/
├── App.jsx
└── index.js

Auteur : JOSEPH Naveen
