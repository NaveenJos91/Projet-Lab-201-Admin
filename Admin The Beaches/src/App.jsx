import { useAuthentication } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./screens/Dashboard";
import AuthForm from "./components/AuthForm";

export default function App() {
  // Récupère l'utilisateur connecté et l'état de chargement depuis le contexte d'authentification
  const { currentUser, isLoading } = useAuthentication();

  // Affiche un message de chargement pendant la vérification d'authentification
  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <Navbar />
      <main className="p-6">
        {/* Si l'utilisateur est connecté, affiche le Dashboard, sinon le formulaire de connexion */}
        {currentUser ? <Dashboard /> : <AuthForm />}
      </main>
    </>
  );
}
