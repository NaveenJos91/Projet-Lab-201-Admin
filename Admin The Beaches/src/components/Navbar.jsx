// On importe le hook personnalisé pour accéder à l'authentification
import { useAuthentication } from "../context/AuthContext";

export default function NavigationBar() {
  // On récupère les infos utilisateur et la fonction pour se déconnecter depuis le contexte
  const { currentUser, signOutUser } = useAuthentication();

  return (
    <nav className="bg-white border-b p-4 flex justify-between items-center">
      {/* Titre visible dans la barre de navigation */}
      <h1 className="text-xl font-bold">The Beaches Tour Date</h1>

      {/* Si un utilisateur est connecté, on affiche le bouton déconnexion */}
      {currentUser && (
        <button
          onClick={signOutUser}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          aria-label="Bouton de déconnexion"
        >
          Déconnexion
        </button>
      )}
    </nav>
  );
}
