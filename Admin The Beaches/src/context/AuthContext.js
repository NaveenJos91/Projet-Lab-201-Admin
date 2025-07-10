import { createContext, useContext, useEffect, useState } from "react";
// On importe firebaseAuthentication qui correspond à l'authentification Firebase
import { firebaseAuthentication } from "../firebase/firebaseconfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Création du contexte React pour gérer l'authentification
const AuthenticationContext = createContext();

// Hook personnalisé pour accéder facilement au contexte dans d'autres composants
export const useAuthentication = () => useContext(AuthenticationContext);

// Fournisseur de contexte qui englobe l'application et gère l'état d'authentification
export const AuthenticationProvider = ({ children }) => {
  // Stocke l'utilisateur connecté (null si non connecté)
  const [currentUser, setCurrentUser] = useState(null);
  // Gestion de l'état de chargement pendant la vérification de la connexion
  const [isLoading, setIsLoading] = useState(true);

  // Au montage, on écoute l'état d'authentification Firebase
  useEffect(() => {
    const unsubscribeListener = onAuthStateChanged(firebaseAuthentication, (user) => {
      setCurrentUser(user);  // Mise à jour de l'utilisateur
      setIsLoading(false);   // Fin du chargement
    });

    // Nettoyage : se désabonner lors du démontage du composant
    return () => unsubscribeListener();
  }, []);

  // Fonction pour connecter l'utilisateur avec email et mot de passe
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuthentication, email, password);
  };

  // Fonction pour déconnecter l'utilisateur
  const signOutUser = () => signOut(firebaseAuthentication);

  // On fournit dans le contexte l'utilisateur, les fonctions login/logout et l'état loading
  return (
    <AuthenticationContext.Provider
      value={{
        currentUser,
        signIn,
        signOutUser,
        isLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
