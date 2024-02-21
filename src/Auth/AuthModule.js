import React, { createContext, useState } from "react";

export const AuthContext = createContext("");

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const logged_data = authUser ? true : false;

  const [isLogged, setIslogged] = useState(logged_data);

  const meta_data = {
    authUser,
    setAuthUser,
    isLogged,
    setIslogged,
  };
  console.log(authUser);

  return (
    <AuthContext.Provider value={meta_data}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
