import { useEffect, useState } from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";

import Keycloak from "keycloak-js";

// Configuracion Del Keycloak
const keycloakOptions = {
  url: "http://localhost:8080",
  realm: "REINO_ITSMRJKALI21",
  clientId: "react-search-app-client",
};

function App() {
  // Inicializo El Keycloak
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const initKeyclock = async () => {
      const keycloakInstance = new Keycloak(keycloakOptions);
      try {
        await keycloakInstance.init({ onLoad: "login-required" });
        setKeycloak(keycloakInstance);
        if (keycloakInstance.authenticated) {
          console.log(keycloakInstance);
        }
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    initKeyclock();
  }, []);

  // Logica Para El Boton De Logout
  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h2 className="text-center">React Search</h2>
          </a>
          {/* Si no se autentica no muestra el boton de logout */}
          {keycloak && keycloak.authenticated ? (
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </nav>
      {/* 
      Si No Hay Loggueo Entonces No Hay Nada, 
      Si Se Logguea Entonces Muestra La Pantalla De Busqueda */}
      <div className="container-fluid">
        {keycloak && keycloak.authenticated ? (
          <div className="container">
            <h2 className="text-primary mb-4">Bienvenido {`${keycloak.tokenParsed.name} `}</h2>
            <SearchComponent />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
