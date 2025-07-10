import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// On importe le fournisseur d'authentification pour envelopper l'application
import { AuthenticationProvider } from "./context/AuthContext";

// Import des styles globaux et spécifiques au responsive
import "./index.css";
import "./responsive.css";

// On monte l'application React dans l'élément avec l'id "root" dans le HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Le provider d'authentification englobe toute l'application pour fournir l'état utilisateur */}
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </React.StrictMode>
);
