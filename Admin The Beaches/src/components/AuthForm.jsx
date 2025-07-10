import { useState } from "react";
import { useAuthentication } from "../context/AuthContext"; // Je suppose que tu as renommé ici aussi

export default function LoginForm() {
  // On récupère la fonction login du contexte d'authentification
  const { signIn } = useAuthentication();

  // États locaux pour gérer les champs du formulaire, erreur et chargement
  const [emailAddress, setEmailAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Gestion de la soumission du formulaire
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de page
    setLoginError(null);     // On nettoie l’erreur précédente
    setIsLoading(true);      // Active le loading (désactive le bouton)

    try {
      await signIn(emailAddress, userPassword); // Appel à Firebase
      // Ici tu peux gérer une redirection ou afficher un message
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setLoginError("Email ou mot de passe invalide");
      setIsLoading(false); // On réactive le bouton en cas d’erreur
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-md w-full bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Connexion</h2>

        {/* Affiche un message d’erreur en rouge si problème */}
        {loginError && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
            {loginError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="votre.email@example.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Entrez votre mot de passe"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
