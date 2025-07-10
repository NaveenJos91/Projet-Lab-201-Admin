// Ce fichier configure et initialise Firebase pour notre application

// Import des fonctions nécessaires depuis le SDK Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Objet de configuration fourni par Firebase, propre à notre projet
const firebaseConfiguration = {
  apiKey: "AIzaSyDckl249wTssDuqcgSRaBCIIJneRiCe618",
  authDomain: "the-beaches-94f0e.firebaseapp.com",
  projectId: "the-beaches-94f0e",
  storageBucket: "the-beaches-94f0e.appspot.com",  // Correct
  messagingSenderId: "526215140064",
  appId: "1:526215140064:web:71861c6b4af358b898b685",
  measurementId: "G-YYBRVYJCPY"
};

// Initialisation de l'application Firebase avec cette configuration
const firebaseAppInstance = initializeApp(firebaseConfiguration);

// Création d'une instance Firestore pour la base de données
const firestoreDatabase = getFirestore(firebaseAppInstance);

// Création d'une instance Auth pour gérer l'authentification
const firebaseAuthentication = getAuth(firebaseAppInstance);

// Export des instances pour pouvoir les utiliser dans toute l'application
export { firestoreDatabase, firebaseAuthentication };
