import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Views/Navbar";
import Approutes from "./Approutes";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Provider } from "use-http";
import "./App.css";
import React, { useEffect } from "react";
import { AuthProvider } from "./Auth/AuthModule";
import { useAuth } from "./Auth/AuthModule";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Provider
          url={process.env.REACT_APP_API_URL}
          options={{
            headers: {
              Authorization: localStorage.getItem("token"),
              Accept: "application/json",
            },
          }}
        >
          <BrowserRouter>
            <Navbar />
            <Approutes />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
